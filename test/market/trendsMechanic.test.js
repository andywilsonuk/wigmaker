import { startTrendAllowed, initialTrendIteration, trendName, CorrectTrendChoice,
  IncreaseProgress, NextTrendSelection, TrendConvertToVogue, TrendFinish, TrendsEnabled, TrendsVisible,
  StartTrendActual, TrendUpdate, Select, choicesCalc, startTrendLabel } from "../../src/market/trendsMechanic"
import { flagStates } from "../../src/market/trendEnum"
import { overrideRandom } from "../../src/utils/random"
import { logState, strandsState, trendsState, vogueLimitState, combineFlags, seedState } from "../testUtils"

describe("Disallowed statuses", () => {
  const testCases = [
    flagStates.hidden,
    flagStates.disabled,
    flagStates.started,
    flagStates.selecting,
    flagStates.finished,
  ]
  testCases.forEach((flagState) => {
    it(`Not allowed when status ${flagState}`, () => {
      const state = {
        ...strandsState(1000),
        ...trendsState({ status: flagState }),
      }

      const actual = startTrendAllowed(state)

      expect(actual).toBe(false)
    })
  })
})
test("Disallowed when insufficient strands", () => {
  const state = {
    ...strandsState(10),
    ...trendsState({ status: flagStates.enabled }),
  }

  const actual = startTrendAllowed(state)

  expect(actual).toBe(false)
})
test("Allowed", () => {
  const state = {
    ...strandsState(1000),
    ...trendsState({ status: flagStates.enabled }),
  }

  const actual = startTrendAllowed(state)

  expect(actual).toBe(true)
})
test("Cost string", () => {
  const state = {
    ...trendsState({ iteration: initialTrendIteration }),
  }

  const actual = startTrendLabel(state)

  expect(actual).toBe("Start a trend (120 strands)")
})
describe("Name", () => {
  const testCases = [
    { iteration: initialTrendIteration, expected: "none" },
    { iteration: 0, expected: "Mock Tudor" },
    { iteration: 5, expected: "Old English" },
    { iteration: 20, expected: "Roman-esq part 3" },
  ]
  testCases.forEach(({ iteration, expected }) => {
    it(`Iteration ${iteration}, expected ${expected}`, () => {
      const state = {
        ...trendsState({ iteration }),
      }

      const actual = trendName(state)

      expect(actual).toBe(expected)
    })
  })
})
describe("Progress updates", () => {
  const testCases = [
    { progress: 0, rand: 0, expected: 0.01 },
    { progress: 0.1, rand: 0, expected: 0.11 },
    { progress: 0, rand: 0.9999, expected: 0.03 },
    { progress: 0.1, rand: 0, expected: 0.11 },
    { progress: 0.1, rand: 0.9999, expected: 0.19 },
  ]
  testCases.forEach(({ progress, rand, expected }) => {
    it(`Progress ${progress} with random multipler ${rand}, expected ${expected}`, () => {
      const state = {
        ...trendsState({ progress }),
      }
      overrideRandom(jest.fn().mockReturnValue(rand))

      const [, actual] = CorrectTrendChoice(state)

      expect(actual).toBe(expected)
    })
  })
})
test("Trends updates from hidden to disabled", () => {
  const state = { ...trendsState({ status: flagStates.hidden }) }

  const updatedState = TrendsVisible(state)

  expect(updatedState).toStrictEqual({
    ...state,
    ...trendsState({ status: flagStates.disabled, iteration: -1 }),
  })
})
test("Trends updates from disabled to enabled", () => {
  const state = { ...trendsState({ status: flagStates.disabled }) }

  const updatedState = TrendsEnabled(state)

  expect(updatedState).toStrictEqual({
    ...state,
    ...trendsState({ status: flagStates.enabled }),
  })
})
test("Trend started", () => {
  const state = {
    ...strandsState(1000),
    ...trendsState({ status: flagStates.enabled, selected: "A", progress: 100, iteration: 1 }),
  }
  overrideRandom(jest.fn().mockReturnValue(0))

  const [updatedState] = StartTrendActual(state)

  expect(updatedState).toStrictEqual({
    ...state,
    ...strandsState(824),
    ...trendsState({
      status: combineFlags(flagStates.enabled, flagStates.started, flagStates.selecting),
      selectedDue: 2500,
      progress: 0,
      iteration: 2,
    }),
  })
})
test("Convert to vogue", () => {
  const state = {
    ...vogueLimitState(50, 200),
    ...trendsState({ status: flagStates.finished, progress: 100 }),
    ...logState(),
  }

  const [updatedState] = TrendConvertToVogue(state)

  expect(updatedState).toStrictEqual({
    ...state,
    ...vogueLimitState(50, 320),
    ...trendsState({ status: flagStates.enabled, progress: 0 }),
    ...logState("4a"),
  })
})
test("Trend next selection", () => {
  const state = {
    ...trendsState({ status: combineFlags(flagStates.enabled, flagStates.started), selected: "A" }),
  }
  overrideRandom(jest.fn().mockReturnValue(0))

  const [updatedState] = NextTrendSelection(state)

  expect(updatedState).toStrictEqual({
    ...state,
    ...trendsState({
      status: combineFlags(flagStates.enabled, flagStates.started, flagStates.selecting),
      selectedDue: 2500,
    }),
  })
})
test("Trend finished", () => {
  const state = {
    ...trendsState({ status: combineFlags(flagStates.enabled, flagStates.started), selected: "A" }),
    ...logState(),
  }

  const [updatedState] = TrendFinish(state)

  expect(updatedState).toStrictEqual({
    ...state,
    ...trendsState({
      status: combineFlags(flagStates.enabled, flagStates.started, flagStates.finished),
      progress: 1,
    }),
    ...logState("4b"),
  })
})
test("Trend increase progress", () => {
  const state = {
    ...trendsState({ status: combineFlags(flagStates.enabled, flagStates.started), selected: "A", progress: 50 }),
  }

  const [updatedState] = IncreaseProgress(state, 88.4)

  expect(updatedState).toStrictEqual({
    ...state,
    ...trendsState({
      status: combineFlags(flagStates.enabled, flagStates.started, flagStates.selecting),
      selectedDue: 2500,
      progress: 88.4,
    }),
  })
})
test("Correct trend choice - increment progress", () => {
  const state = {
    ...trendsState({ progress: 0.5 }),
  }
  overrideRandom(jest.fn().mockReturnValue(0))

  const [action, progress] = CorrectTrendChoice(state)

  expect(action).toBe(IncreaseProgress)
  expect(progress).toBe(0.51)
})
test("Correct trend choice - increment progress", () => {
  const state = {
    ...trendsState({ progress: 99 }),
  }

  const actual = CorrectTrendChoice(state)

  expect(actual).toBe(TrendFinish)
})

const deltaTime = 100

describe("Trends not selecting", () => {
  const testCases = [flagStates.hidden, flagStates.disabled, flagStates.enabled, flagStates.started, flagStates.finished]
  testCases.forEach((flagState) => {
    it(`Not selecting when ${flagState}`, () => {
      const state = { ...trendsState({ status: flagState }) }

      const updatedState = TrendUpdate(state, deltaTime)

      expect(updatedState).toBe(state)
    })
  })
})
test("Selected due is decremented", () => {
  const state = { ...trendsState({ status: flagStates.selecting, selectedDue: 1000 }) }

  const updatedState = TrendUpdate(state, deltaTime)

  expect(updatedState).toStrictEqual({
    ...state,
    ...trendsState({ status: flagStates.selecting, selectedDue: 1000 - deltaTime }),
  })
})
test("Selected due is done", () => {
  const state = { ...trendsState({ status: flagStates.selecting, selectedDue: 1 }) }
  overrideRandom(jest.fn().mockReturnValue(0))

  const actualAction = TrendUpdate(state, deltaTime)

  expect(actualAction).toBe(Select)
})

describe("Available choices determinism", () => {
  const testCases = [{
    progress: 0,
    iteration: 0,
    expectedSame: true,
  }, {
    progress: 0.5,
    iteration: 0,
    expectedSame: false,
  }, {
    progress: 0,
    iteration: 1,
    expectedSame: false,
  }]
  testCases.forEach(({ progress, iteration, expectedSame }) => {
    it(`${progress} progress, ${iteration} iteration, result ${expectedSame}`, () => {
      const state = { ...seedState(), ...trendsState({ progress: 0, iteration: 0 }) }

      const choices1 = choicesCalc(state.trendProgress, state)
      const choices2 = choicesCalc(progress, { ...state, ...trendsState({ progress, iteration }) })

      if (expectedSame) {
        expect(choices1).toStrictEqual(choices2)
      } else {
        expect(choices1).not.toStrictEqual(choices2)
      }
    })
  })
})

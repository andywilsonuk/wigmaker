import incidentData, { Dispatch } from "../../src/incidents/emergencyWig"
import { wigStockState, noIncidentState, logState, cashState } from "../testUtils"

test("Emergency dispatch", () => {
  const state = {
    ...wigStockState([0, 10, 0, 0, 0]),
    ...cashState(10),
    ...logState(),
  }

  const [actual] = Dispatch(state)

  expect(actual).toStrictEqual({
    ...state,
    ...wigStockState([0, 9, 0, 0, 0]),
    ...logState("3B"),
    ...cashState(2510),
    ...noIncidentState(),
  })
})
describe("Allowed check", () => {
  [{
    state: { ...wigStockState([0, 0, 0, 1, 0]) },
    expected: true,
  }, {
    state: { ...wigStockState([0, 0, 0, 0, 0]) },
    expected: false,
  }].forEach(({ state, expected }) => {
    it(`${JSON.stringify(state)}, result ${JSON.stringify(expected)}`, () => {
      const actual = incidentData.allowed(state)

      expect(actual).toBe(expected)
    })
  })
})

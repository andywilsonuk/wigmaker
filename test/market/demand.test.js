/* eslint-env jest */
import Demand, { jitterDemand } from '../../src/market/demand'
import { achievedState, brandState, demandState, wigOrderState } from '../testUtils/state'
import { mockSequence } from '../testUtils'
import { overrideRandom } from '../../src/utils/random'
import { milestone } from '../../src/shared/milestones'

const baseState = {
  ...wigOrderState(),
  ...demandState(0, 0),
  ...brandState(1),
  ...achievedState(milestone.manufacture)
}
const deltaTime = 100

test('< 1 per second demand', () => {
  const demandPerSecond = 0.5
  overrideRandom(mockSequence(0))
  let state = baseState

  for (let count = 0; count < 19; count += 1) {
    state = Demand(state, deltaTime, demandPerSecond)
    expect(state).toStrictEqual({
      ...state,
      ...demandState(deltaTime * (count + 1), 0)
    })
  }

  state = Demand(state, deltaTime, demandPerSecond)
  expect(state).toStrictEqual({
    ...state,
    ...wigOrderState([1, 0, 0, 0, 0]),
    ...demandState(0, 0)
  })
})
test('2 per second demand', () => {
  const demandPerSecond = 2
  overrideRandom(mockSequence(0))

  const iteration1 = Demand(baseState, deltaTime, demandPerSecond)
  expect(iteration1).toStrictEqual({
    ...baseState,
    ...wigOrderState(),
    ...demandState(deltaTime, 0)
  })

  const iteration2 = Demand(iteration1, deltaTime * 4, demandPerSecond)
  expect(iteration2).toStrictEqual({
    ...baseState,
    ...wigOrderState([1, 0, 0, 0, 0]),
    ...demandState(0, 0)
  })

  const iteration3 = Demand(iteration2, deltaTime * 5, demandPerSecond)
  expect(iteration3).toStrictEqual({
    ...baseState,
    ...wigOrderState([2, 0, 0, 0, 0]),
    ...demandState(0, 0)
  })
})
test('No distibution on zero brand', () => {
  const demandPerSecond = 2
  const state = { ...baseState, ...brandState(0) }

  const actual = Demand(state, deltaTime, demandPerSecond)
  expect(actual).toStrictEqual(state)
})
test('Jitter determinism', () => {
  overrideRandom(mockSequence(...([0.9999, 0].concat(Array.from({ length: 98 }).fill(0)))))

  const rate1 = jitterDemand(100)
  expect(rate1).toBe(120)

  const rate2 = jitterDemand(100)
  expect(rate2).toBe(70)
})

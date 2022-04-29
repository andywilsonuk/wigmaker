/* eslint-env jest */
import incidentData, { PeacefulEnd } from '../../src/incidents/protesters'
import { research } from '../../src/shared/milestones'
import { wigStockState, noIncidentState, logState, cashState, achievedState } from '../testUtils'

test('Pay later gifted, no payback', () => {
  const state = {
    ...wigStockState([0, 10, 0, 0, 0]),
    ...cashState(10),
    ...logState()
  }

  const [actual] = PeacefulEnd(state, 10)

  expect(actual).toStrictEqual({
    ...state,
    ...wigStockState([0, 9, 0, 0, 0]),
    ...logState('3J'),
    ...noIncidentState()
  })
})
describe('Allowed check', () => {
  [{
    state: { ...wigStockState([0, 0, 0, 1000, 0]), ...achievedState(research.algaeIncubator) },
    expected: true
  }, {
    state: { ...wigStockState([0, 0, 0, 999, 0]), ...achievedState(research.algaeIncubator) },
    expected: false
  }, {
    state: { ...wigStockState([0, 0, 0, 1000, 0]), ...achievedState() },
    expected: false
  }].forEach(({ state, expected }) => {
    it(`${JSON.stringify(state)}, result ${JSON.stringify(expected)}`, () => {
      const actual = incidentData.allowed(state)

      expect(actual).toBe(expected)
    })
  })
})

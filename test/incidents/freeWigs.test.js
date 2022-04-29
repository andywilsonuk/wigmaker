/* eslint-env jest */
import incidentData, { BrandIncrease, NoBrandIncrease } from '../../src/incidents/freeWigs'
import { wigStockState, noIncidentState, logState, brandState } from '../testUtils'

test('Free wigs, no brand', () => {
  const state = {
    ...wigStockState([0, 10, 0, 0, 0]),
    ...logState(),
    ...brandState(10, 2)
  }

  const [actual] = NoBrandIncrease(state)

  expect(actual).toStrictEqual({
    ...state,
    ...wigStockState([0, 5, 0, 0, 0]),
    ...logState('3h'),
    ...noIncidentState()
  })
})
test('Free wigs, with brand', () => {
  const state = {
    ...wigStockState([0, 10, 0, 0, 0]),
    ...logState(),
    ...brandState(10, 2)
  }

  const [actual] = BrandIncrease(state)

  expect(actual).toStrictEqual({
    ...state,
    ...wigStockState([0, 5, 0, 0, 0]),
    ...logState('3i'),
    ...brandState(360, 2),
    ...noIncidentState()
  })
})
describe('Allowed check', () => {
  [{
    state: { ...wigStockState([0, 0, 0, 20, 0]) },
    expected: true
  }, {
    state: { ...wigStockState([0, 0, 0, 19, 0]) },
    expected: false
  }].forEach(({ state, expected }) => {
    it(`${JSON.stringify(state)}, result ${JSON.stringify(expected)}`, () => {
      const actual = incidentData.allowed(state)

      expect(actual).toBe(expected)
    })
  })
})

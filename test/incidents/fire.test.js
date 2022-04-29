/* eslint-env jest */
import incidentData, { FireDamage } from '../../src/incidents/fire'
import { wigStockState, noIncidentState, logState } from '../testUtils'

describe('Fire damage with save', () => {
  const testCases = [{
    wigs: 1,
    loss: 30,
    expected: 0
  }, {
    wigs: 10,
    loss: 40,
    expected: 6
  }]
  testCases.forEach(({ wigs, loss, expected }) => {
    it(`${wigs} wigs @ ${loss}% loss, result ${expected}`, () => {
      const state = {
        ...wigStockState([wigs, 0, 0, 0, 0]),
        ...logState()
      }

      const [actual] = FireDamage(state, loss)

      expect(actual).toStrictEqual({
        ...state,
        ...wigStockState([expected, 0, 0, 0, 0]),
        ...logState('3q'),
        ...noIncidentState()
      })
    })
  })
})
describe('Allowed check', () => {
  [{
    state: { ...wigStockState([0, 0, 0, 1000, 0]) },
    expected: true
  }, {
    state: { ...wigStockState([0, 0, 0, 999, 0]) },
    expected: false
  }].forEach(({ state, expected }) => {
    it(`${JSON.stringify(state)}, result ${JSON.stringify(expected)}`, () => {
      const actual = incidentData.allowed(state)

      expect(actual).toBe(expected)
    })
  })
})

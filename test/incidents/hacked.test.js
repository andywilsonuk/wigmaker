/* eslint-env jest */
import hackedData, { ReduceWigFabsBySpecific } from '../../src/incidents/hacked'
import { fabricatingState, fabricatorState, logState, noIncidentState, powerDemandState } from '../testUtils'

test('Fabricators reduced 10%', () => {
  const state = {
    ...fabricatorState(50),
    ...fabricatingState([{ allocated: 45 }]),
    ...powerDemandState(10000),
    ...logState()
  }

  const [actualState] = ReduceWigFabsBySpecific(state, 5)

  expect(actualState).toStrictEqual({
    ...fabricatorState(50 - 5),
    ...fabricatingState([{ allocated: 45 - 5 }]),
    ...powerDemandState(7205),
    ...logState('3E'),
    ...noIncidentState()
  })
})
describe('Allowed check', () => {
  [{
    state: { ...fabricatingState([{ allocated: 45 }]) },
    expected: true
  }, {
    state: { ...fabricatingState([{ allocated: 15 }]) },
    expected: false
  }].forEach(({ state, expected }) => {
    it(`${JSON.stringify(state)}, result ${JSON.stringify(expected)}`, () => {
      const actual = hackedData.allowed(state)

      expect(actual).toBe(expected)
    })
  })
})

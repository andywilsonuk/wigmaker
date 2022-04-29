/* eslint-env jest */
import incidentData, { PayFine, PayAssociation } from '../../src/incidents/jailedPolitician'
import { noIncidentState, logState, cashState, bribesState } from '../testUtils'

test('Pay upfront fine', () => {
  const state = {
    ...cashState(1000000),
    ...logState()
  }

  const [actual] = PayFine(state)

  expect(actual).toStrictEqual({
    ...cashState(1000000 - 250000),
    ...logState('3L'),
    ...noIncidentState()
  })
})
test('Pay association fine', () => {
  const state = {
    ...cashState(1000000),
    ...logState()
  }

  const [actual] = PayAssociation(state)

  expect(actual).toStrictEqual({
    ...cashState(1000000 - 750000),
    ...logState('3M'),
    ...noIncidentState()
  })
})
describe('Allowed check', () => {
  [{
    state: { ...cashState(750001), ...bribesState(7) },
    expected: true
  }, {
    state: { ...cashState(750000), ...bribesState(7) },
    expected: false
  }, {
    state: { ...cashState(750001), ...bribesState(6) },
    expected: false
  }].forEach(({ state, expected }) => {
    it(`${JSON.stringify(state)}, result ${JSON.stringify(expected)}`, () => {
      const actual = incidentData.allowed(state)

      expect(actual).toBe(expected)
    })
  })
})

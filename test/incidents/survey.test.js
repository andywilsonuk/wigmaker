/* eslint-env jest */
import { CashPaid } from '../../src/incidents/survey'
import { noIncidentState, logState, cashState } from '../testUtils'

test('Survey', () => {
  const state = {
    ...cashState(10),
    ...logState()
  }

  const [actual] = CashPaid(state)

  expect(actual).toStrictEqual({
    ...cashState(30),
    ...logState('3H'),
    ...noIncidentState()
  })
})

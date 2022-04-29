/* eslint-env jest */
import { Unstick } from '../../src/incidents/unstick'
import { wigOrderState, noIncidentState, logState, cashState, buyLevelState } from '../testUtils'

test('Unstick', () => {
  const state = {
    ...wigOrderState([0, 0, 0, 0, 0]),
    ...logState(),
    ...cashState(10),
    ...buyLevelState()
  }

  const [actual] = Unstick(state)

  expect(actual).toStrictEqual({
    ...state,
    ...wigOrderState([1, 0, 0, 0, 0]),
    ...logState('3o'),
    ...cashState(510),
    ...buyLevelState(),
    ...noIncidentState()
  })
})

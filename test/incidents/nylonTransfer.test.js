/* eslint-env jest */
import { NylonTransfer } from '../../src/incidents/nylonTransfer'
import { logState, noIncidentState, nylonState } from '../testUtils'

test('Nylon gift', () => {
  const state = {
    ...nylonState(10),
    ...logState()
  }

  const [actualState] = NylonTransfer(state)

  expect(actualState).toStrictEqual({
    ...state,
    ...nylonState(10 + 500000000),
    ...logState('3r'),
    ...noIncidentState()
  })
})

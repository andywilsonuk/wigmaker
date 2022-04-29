/* eslint-env jest */
import { NylonIncrease, SiliconIncrease } from '../../src/incidents/stockCheck'
import { noIncidentState, logState, nylonState, siliconState } from '../testUtils'

test('Nylon stock increase', () => {
  const state = {
    ...logState(),
    ...nylonState(5)
  }

  const [actual] = NylonIncrease(state, 10)

  expect(actual).toStrictEqual({
    ...logState('3I'),
    ...nylonState(5 + 10),
    ...noIncidentState()
  })
})
test('Silicon stock increase', () => {
  const state = {
    ...logState(),
    ...siliconState(5)
  }

  const [actual] = SiliconIncrease(state, 10)

  expect(actual).toStrictEqual({
    ...logState('3I'),
    ...siliconState(5 + 10),
    ...noIncidentState()
  })
})

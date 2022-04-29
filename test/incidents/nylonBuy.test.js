/* eslint-env jest */
import { JustLog } from '../../src/incidents/common'
import { NylonBuy, NylonBuyCheck } from '../../src/incidents/nylonBuy'
import { noIncidentState, logState, cashState, nylonState } from '../testUtils'

const data = { quantity: 80, price: 10 }

test('Buy nylon special for $10', () => {
  const state = {
    ...logState(),
    ...cashState(52),
    ...nylonState(5)
  }

  const [actual] = NylonBuy(state, data)

  expect(actual).toStrictEqual({
    ...state,
    ...logState('3c'),
    ...cashState(42),
    ...nylonState(85),
    ...noIncidentState()
  })
})
test('Buy nylon special, no cash', () => {
  const state = {
    ...logState(),
    ...cashState(2),
    ...nylonState(5)
  }

  const [action, message] = NylonBuyCheck(state, data)

  expect(action).toBe(JustLog)
  expect(message).toBeTruthy()
})
test('Buy nylon special, with cash', () => {
  const state = {
    ...logState(),
    ...cashState(20),
    ...nylonState(5)
  }

  const [action, props] = NylonBuyCheck(state, data)

  expect(action).toBe(NylonBuy)
  expect(props).toBe(data)
})

/* eslint-env jest */
import { SellAllToFirstCustomer } from '../../src/incidents/firstCustomer'
import { wigStockState, noIncidentState, logState, brandState, cashState } from '../testUtils'

test('First customer', () => {
  const state = {
    ...wigStockState([0, 10, 0, 0, 0]),
    ...logState(),
    ...cashState(5),
    ...brandState(10, 2)
  }

  const [actual] = SellAllToFirstCustomer(state)

  expect(actual).toStrictEqual({
    ...state,
    ...wigStockState([0, 0, 0, 0, 0]),
    ...logState('3a'),
    ...cashState(105),
    ...brandState(30, 2),
    ...noIncidentState()
  })
})

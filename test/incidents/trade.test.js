/* eslint-env jest */
import incidentData, { TradeHair, TradeNylon, TradeSilicon } from '../../src/incidents/trade'
import { wigStockState, noIncidentState, logState, brandState, siliconState, hairState, nylonState } from '../testUtils'

test('Trade hair', () => {
  const state = {
    ...wigStockState([0, 0, 0, 0, 10]),
    ...hairState(1),
    ...nylonState(2),
    ...siliconState(3),
    ...logState(),
    ...brandState(10, 2)
  }

  const [actual] = TradeHair(state, 5)

  expect(actual).toStrictEqual({
    ...state,
    ...wigStockState([0, 0, 0, 0, 0]),
    ...hairState(51),
    ...logState('3g'),
    ...brandState(30, 2),
    ...noIncidentState()
  })
})
test('Trade nylon', () => {
  const state = {
    ...wigStockState([0, 0, 0, 0, 10]),
    ...hairState(1),
    ...nylonState(2),
    ...siliconState(3),
    ...logState(),
    ...brandState(10, 2)
  }

  const [actual] = TradeNylon(state, 5)

  expect(actual).toStrictEqual({
    ...state,
    ...wigStockState([0, 0, 0, 0, 0]),
    ...nylonState(52),
    ...logState('3g'),
    ...brandState(30, 2),
    ...noIncidentState()
  })
})
test('Trade silicon', () => {
  const state = {
    ...wigStockState([0, 0, 0, 0, 10]),
    ...hairState(1),
    ...nylonState(2),
    ...siliconState(3),
    ...logState(),
    ...brandState(10, 2)
  }

  const [actual] = TradeSilicon(state, 5)

  expect(actual).toStrictEqual({
    ...state,
    ...wigStockState([0, 0, 0, 0, 0]),
    ...siliconState(53),
    ...logState('3g'),
    ...brandState(30, 2),
    ...noIncidentState()
  })
})
describe('Allowed check', () => {
  [{
    state: { ...wigStockState([0, 0, 0, 2, 0]) },
    expected: true
  }, {
    state: { ...wigStockState([0, 0, 0, 1, 0]) },
    expected: false
  }].forEach(({ state, expected }) => {
    it(`${JSON.stringify(state)}, result ${JSON.stringify(expected)}`, () => {
      const actual = incidentData.allowed(state)

      expect(actual).toBe(expected)
    })
  })
})

import incidentData, { GiftPaidBack, GiftNotPaidBack, TradePaidBack, TradeNotPaidBack } from "../../src/incidents/payLater"
import { wigStockState, noIncidentState, logState, cashState, nylonState } from "../testUtils"

test("Pay later gifted, no payback", () => {
  const state = {
    ...wigStockState([0, 10, 0, 0, 0]),
    ...cashState(10),
    ...logState(),
  }

  const [actual] = GiftNotPaidBack(state)

  expect(actual).toStrictEqual({
    ...state,
    ...wigStockState([0, 9, 0, 0, 0]),
    ...logState("3k"),
    ...noIncidentState(),
  })
})
test("Pay later gifted, payback", () => {
  const state = {
    ...wigStockState([0, 10, 0, 0, 0]),
    ...cashState(10),
    ...logState(),
  }

  const [actual] = GiftPaidBack(state)

  expect(actual).toStrictEqual({
    ...state,
    ...wigStockState([0, 9, 0, 0, 0]),
    ...logState("3j"),
    ...cashState(360),
    ...noIncidentState(),
  })
})
test("Pay later traded, no payback", () => {
  const state = {
    ...wigStockState([0, 10, 0, 0, 0]),
    ...cashState(10),
    ...nylonState(5),
    ...logState(),
  }

  const [actual] = TradeNotPaidBack(state)

  expect(actual).toStrictEqual({
    ...state,
    ...wigStockState([0, 9, 0, 0, 0]),
    ...logState("3l"),
    ...noIncidentState(),
  })
})
test("Pay later traded, payback", () => {
  const state = {
    ...wigStockState([0, 10, 0, 0, 0]),
    ...cashState(10),
    ...nylonState(5),
    ...logState(),
  }

  const [actual] = TradePaidBack(state)

  expect(actual).toStrictEqual({
    ...state,
    ...wigStockState([0, 9, 0, 0, 0]),
    ...logState("3m"),
    ...nylonState(85),
    ...noIncidentState(),
  })
})
describe("Allowed check", () => {
  [{
    state: { ...wigStockState([0, 0, 0, 20, 0]) },
    expected: true,
  }, {
    state: { ...wigStockState([0, 0, 0, 19, 0]) },
    expected: false,
  }].forEach(({ state, expected }) => {
    it(`${JSON.stringify(state)}, result ${JSON.stringify(expected)}`, () => {
      const actual = incidentData.allowed(state)

      expect(actual).toBe(expected)
    })
  })
})

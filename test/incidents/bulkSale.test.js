import incidentData, { BulkSell } from "../../src/incidents/bulkSale"
import { wigStockState, noIncidentState, logState, cashState, brandState } from "../testUtils"

test("Bulk sell all", () => {
  const state = {
    ...wigStockState([10, 1, 2, 3, 4]),
    ...cashState(5),
    ...brandState(10, 2),
    ...logState(),
  }

  const [actual] = BulkSell(state, 1)

  expect(actual).toStrictEqual({
    ...state,
    ...wigStockState([0, 0, 0, 0, 0]),
    ...cashState(5 + (45 * 20)),
    ...brandState(10 + (20 * 2), 2),
    ...logState("3z"),
    ...noIncidentState(),
  })
})
test("Bulk sell 50%", () => {
  const state = {
    ...wigStockState([10, 1, 2, 3, 4]),
    ...cashState(5),
    ...brandState(10, 2),
    ...logState(),
  }

  const [actual] = BulkSell(state, 0.5)

  expect(actual).toStrictEqual({
    ...state,
    ...wigStockState([10, 0, 0, 0, 0]),
    ...cashState(5 + (45 * 10)),
    ...brandState(10 + (10 * 2), 2),
    ...logState("3z"),
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

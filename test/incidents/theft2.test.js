import incidentData, { Theft2 } from "../../src/incidents/theft2"
import { wigStockState, noIncidentState, logState } from "../testUtils"

test("Theft2", () => {
  const state = {
    ...wigStockState([2, 0, 0, 0, 0]),
    ...logState(),
  }

  const [actual] = Theft2(state, 50)

  expect(actual).toStrictEqual({
    ...state,
    ...wigStockState([1, 0, 0, 0, 0]),
    ...logState("3O"),
    ...noIncidentState(),
  })
})
describe("Allowed check", () => {
  [{
    state: { ...wigStockState([0, 0, 0, 1000, 0]) },
    expected: true,
  }, {
    state: { ...wigStockState([0, 0, 0, 999, 0]) },
    expected: false,
  }].forEach(({ state, expected }) => {
    it(`${JSON.stringify(state)}, result ${JSON.stringify(expected)}`, () => {
      const actual = incidentData.allowed(state)

      expect(actual).toBe(expected)
    })
  })
})

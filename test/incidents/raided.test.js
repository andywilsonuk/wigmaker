import incidentData, { Raided } from "../../src/incidents/raided"
import { wigStockState, noIncidentState, logState } from "../testUtils"

test("Raided", () => {
  const state = {
    ...wigStockState([2, 0, 0, 0, 0]),
    ...logState(),
  }

  const [actual] = Raided(state, 50)

  expect(actual).toStrictEqual({
    ...state,
    ...wigStockState([1, 0, 0, 0, 0]),
    ...logState("3e"),
    ...noIncidentState(),
  })
})
describe("Allowed check", () => {
  [{
    state: { ...wigStockState([0, 0, 0, 100, 0]) },
    expected: true,
  }, {
    state: { ...wigStockState([0, 0, 0, 99, 0]) },
    expected: false,
  }].forEach(({ state, expected }) => {
    it(`${JSON.stringify(state)}, result ${JSON.stringify(expected)}`, () => {
      const actual = incidentData.allowed(state)

      expect(actual).toBe(expected)
    })
  })
})

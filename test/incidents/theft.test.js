import incidentData, { Theft } from "../../src/incidents/theft"
import { wigStockState, noIncidentState, logState } from "../testUtils"

test("Theft", () => {
  const state = {
    ...wigStockState([10, 0, 0, 0, 0]),
    ...logState(),
  }

  const [actual] = Theft(state, 30)

  expect(actual).toStrictEqual({
    ...state,
    ...wigStockState([7, 0, 0, 0, 0]),
    ...logState("3p"),
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

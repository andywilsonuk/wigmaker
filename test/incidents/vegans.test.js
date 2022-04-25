import incidentData, { SellWigsToVegan } from "../../src/incidents/vegans"
import { brandState, cashState, logState, noIncidentState, wigStockState } from "../testUtils"

test("Vegan sale", () => {
  const state = {
    ...cashState(10),
    ...brandState(1000, 1),
    ...wigStockState([0, 0, 0, 300, 0]),
    ...logState(),
  }

  const [actualState] = SellWigsToVegan(state)

  expect(actualState).toStrictEqual({
    ...cashState(10 + 200 * 550),
    ...brandState(1000 + 200, 1),
    ...wigStockState([0, 0, 0, 300 - 200, 0]),
    ...logState("3F"),
    ...noIncidentState(),
  })
})
describe("Allowed check", () => {
  [{
    state: { ...wigStockState([0, 0, 0, 200, 0]) },
    expected: true,
  }, {
    state: { ...wigStockState([0, 0, 0, 199, 0]) },
    expected: false,
  }].forEach(({ state, expected }) => {
    it(`${JSON.stringify(state)}, result ${JSON.stringify(expected)}`, () => {
      const actual = incidentData.allowed(state)

      expect(actual).toBe(expected)
    })
  })
})

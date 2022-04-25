import gridSabotageData, { ReduceGridSupply } from "../../src/incidents/gridSabotage"
import lowPowerCheck from "../../src/make/lowPowerCheck"
import { powerSupplyId } from "../../src/make/powerMechanic"
import { milestone } from "../../src/shared/milestones"
import { achievedState, logState, noIncidentState, powerSupplyState } from "../testUtils"

test("Initial removed", () => {
  const state = {
    ...achievedState(),
    ...powerSupplyState(powerSupplyId.initial, powerSupplyId.solar, powerSupplyId.grid),
    ...logState(),
  }

  const [actualState, check] = ReduceGridSupply(state)

  expect(actualState).toStrictEqual({
    ...achievedState(milestone.inititalGridDestroyed),
    ...powerSupplyState(powerSupplyId.solar, powerSupplyId.grid),
    ...logState("3D"),
    ...noIncidentState(),
  })
  expect(check).toStrictEqual(lowPowerCheck())
})
test("Single grid removed", () => {
  const state = {
    ...achievedState(),
    ...powerSupplyState(powerSupplyId.solar, powerSupplyId.grid, powerSupplyId.grid),
    ...logState(),
  }

  const [actualState, check] = ReduceGridSupply(state)

  expect(actualState).toStrictEqual({
    ...achievedState(milestone.inititalGridDestroyed),
    ...powerSupplyState(powerSupplyId.solar, powerSupplyId.grid),
    ...logState("3D"),
    ...noIncidentState(),
  })
  expect(check).toStrictEqual(lowPowerCheck())
})
describe("Allowed check", () => {
  [{
    state: { ...powerSupplyState(powerSupplyId.initial, powerSupplyId.solar, powerSupplyId.grid, powerSupplyId.grid) },
    expected: true,
  }, {
    state: { ...powerSupplyState(powerSupplyId.solar, powerSupplyId.grid, powerSupplyId.grid, powerSupplyId.grid) },
    expected: true,
  }, {
    state: { ...powerSupplyState(powerSupplyId.solar, powerSupplyId.grid, powerSupplyId.grid) },
    expected: true,
  }, {
    state: { ...powerSupplyState(powerSupplyId.grid, powerSupplyId.grid) },
    expected: false,
  }, {
    state: { ...powerSupplyState(powerSupplyId.solar, powerSupplyId.solar, powerSupplyId.solar) },
    expected: false,
  }].forEach(({ state, expected }) => {
    it(`${JSON.stringify(state)}, result ${JSON.stringify(expected)}`, () => {
      const actual = gridSabotageData.allowed(state)

      expect(actual).toBe(expected)
    })
  })
})

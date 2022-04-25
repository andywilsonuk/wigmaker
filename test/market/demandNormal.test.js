import { notion, research, milestone } from "../../src/shared/milestones"
import { achievedState, wigOrderState, brandState } from "../testUtils/state"
import { demandTransform } from "../../src/market/demandNormal"
import { overrideRandom } from "../../src/utils/random"
import { mockSequence } from "../testUtils"

const wigAllowedAchievements = [milestone.manufacture, notion.nylonWigs, notion.siliconeWigs, research.algaeIncubator]

test("Basic demand", () => {
  overrideRandom(mockSequence(0, 0, 0, 0))
  const state = {
    ...wigOrderState([1, 1, 1, 1, 1]),
    ...brandState(1),
    ...achievedState(...wigAllowedAchievements),
  }

  const actual = demandTransform(state, 1)
  expect(actual).toMatchObject({
    ...wigOrderState([1, 1, 1, 2, 1]),
  })
})

test("Large distribution up to demand limit (but not cap)", () => {
  overrideRandom(mockSequence(0.997, 0.996, 0.97, 0.95))

  const state = {
    ...wigOrderState([1, 1, 1, 1, 0]),
    ...brandState(999999),
    ...achievedState(...wigAllowedAchievements),
  }

  const actual = demandTransform(state, 10000)

  const { orders: [wigHairOrders, wigNylonOrders, wigSiliconeOrders, wigAlgaeOrders] } = actual
  expect(wigHairOrders + wigNylonOrders + wigSiliconeOrders + wigAlgaeOrders).toBe(10004)
  expect(actual).toMatchObject({
  })
})
test("Altered availability uses new weights", () => {
  overrideRandom(mockSequence(0.8))
  const state = {
    ...wigOrderState(),
    ...brandState(1),
    ...achievedState(milestone.manufacture),
  }

  const iteration1 = demandTransform(state, 3)
  expect(iteration1).toStrictEqual({
    ...wigOrderState([3, 0, 0, 0, 0]),
  })

  const nylonWigsState = { ...state, ...achievedState(milestone.manufacture, notion.nylonWigs) }

  const iteration2 = demandTransform(nylonWigsState, 3)
  expect(iteration2).toStrictEqual({
    ...wigOrderState([2, 1, 0, 0, 0]),
  })
})
test("Maxed out demand does nothing", () => {
  overrideRandom(mockSequence(0))
  const state = {
    ...wigOrderState([200, 200, 200, 200, 0]),
    ...brandState(1),
    ...achievedState(...wigAllowedAchievements),
  }

  const actual = demandTransform(state, 1)
  expect(actual).toStrictEqual(undefined)
})
test("Almost maxed out demand", () => {
  overrideRandom(mockSequence(0.9999, 0, 0, 0, 0))

  const state = {
    ...wigOrderState([10, 10, 10, 0, 0]),
    ...brandState(1),
    ...achievedState(...wigAllowedAchievements),
  }

  const iteration1 = demandTransform(state, 10)
  expect(iteration1).toStrictEqual({
    ...wigOrderState([15, 10, 10, 0, 0]),
  })
})

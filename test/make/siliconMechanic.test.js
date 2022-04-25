import { buySiliconTransform, maxBuySilicon } from "../../src/make/siliconMechanic"
import { autoSiliconState, buyLevelState, cashState, siliconState } from "../testUtils"

test("Silicon cost transform", () => {
  const state = {
    ...cashState(100),
    ...siliconState(6),
    ...buyLevelState(),
  }

  const actual = buySiliconTransform(state, 11)

  expect(actual).toStrictEqual({
    cash: 10,
    silicon: 21,
  })
})
test("Silicon max available to buy when autoSilicon on is greater than 0", () => {
  const state = {
    ...cashState(91),
    ...buyLevelState(),
    ...autoSiliconState(true),
  }

  const actual = maxBuySilicon(state)

  expect(actual).toBe(15)
})
test("Silicon max available to buy when autoSilicon on is 0", () => {
  const state = {
    ...cashState(91),
    ...buyLevelState(),
    ...autoSiliconState(false),
  }

  const actual = maxBuySilicon(state)

  expect(actual).toBe(0)
})

import pricingCalculator from "../../src/market/pricingCalculator"
import { brandState } from "../testUtils"

test("Brand influences price", () => {
  const state = {
    ...brandState(2500),
  }

  const baseCost = 14

  const actual = pricingCalculator(state)

  expect(actual).toStrictEqual({
    wigHair: baseCost,
    wigNylon: baseCost - 2,
    wigSilicone: 26,
    wigAlgae: 625,
    wigSmart: 1200,
    wiglet: 5,
    wigHairText: `$${baseCost}`,
    wigNylonText: `$${baseCost - 2}`,
    wigSiliconeText: "$26",
    wigAlgaeText: "$625",
    wigSmartText: "$1.2K",
    wigletText: `$${5}`,
  })
})
test("Low brand always uses base cost (divide 0 issue fix)", () => {
  const state = {
    ...brandState(10),
  }
  const baseCost = 12

  const actual = pricingCalculator(state)

  expect(actual).toMatchObject({
    wigHair: baseCost,
    wigNylon: baseCost - 2,
    wigSilicone: baseCost * 2,
    wigAlgae: 625,
    wigSmart: 1200,
    wiglet: 5,
  })
})
test("Limiters for pricing", () => {
  const state = {
    ...brandState(9999999),
  }

  const actual = pricingCalculator(state)

  expect(actual).toMatchObject({
    wigHair: 95,
    wigNylon: 70,
    wigSilicone: 249,
    wigAlgae: 625,
    wigSmart: 1200,
  })
})

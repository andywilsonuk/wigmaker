import { cashString } from "../utils/humanize"
import Memorization from "../utils/memorization"

const baseCost = 12
const hairCost = baseCost
const nylonCost = baseCost - 2
const siliconeCost = baseCost * 2
const wigletCost = 5
const hairLimit = 95
const nylonLimit = 70
const siliconeLimit = 249
const algaeLimit = 625
const smartLimit = 1200

const expand = (brandUplift) => {
  const wigHair = Math.min(hairLimit, hairCost + brandUplift)
  const wigNylon = Math.min(nylonLimit, nylonCost + brandUplift)
  const wigSilicone = Math.min(siliconeLimit, siliconeCost + brandUplift)

  return {
    wigHair,
    wigHairText: cashString(wigHair),
    wigNylon,
    wigNylonText: cashString(wigNylon),
    wigSilicone,
    wigSiliconeText: cashString(wigSilicone),
    wigAlgae: algaeLimit,
    wigAlgaeText: cashString(algaeLimit),
    wigSmart: smartLimit,
    wigSmartText: cashString(smartLimit),
    wiglet: wigletCost,
    wigletText: cashString(wigletCost),
  }
}

const upliftFn = (brand) => {
  if (brand < 100) { return 0 }
  if (brand > 500000) { return 250 }
  return Math.floor((brand * 0.005) / Math.log(brand * 0.1))
}
const memo = new Memorization(expand)

export default ({ brand }) => memo.get(upliftFn(brand))

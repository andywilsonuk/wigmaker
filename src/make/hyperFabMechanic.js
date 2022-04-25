import { allowedCheck } from "../utils/hyperAppHelpers"
import { microCostTransform } from "../utils/cost"
import { decimalString, labelWithCost, maxedUpgrades, percentString } from "../utils/humanize"
import { audioIds, enqueueAudio } from "../audio"
import Memorization from "../utils/memorization"

const fabricatorsPerHyper = 24

const requiredMicroFn = (level) => Math.floor((((level + 1) * 47.7) ** 1.8) - level * 150.9)
const requiredMicroMemo = new Memorization(requiredMicroFn)
const multipler = (level) => 25 + level * 0.45

const maxReached = (fabricatorCount, hyperFabCount) => hyperFabCount >= Math.floor(fabricatorCount / fabricatorsPerHyper)

export const buyHyperFabAllowed = ({ fabricators, fabricatorHyper, micro, microBio }) =>
  !maxReached(fabricators, fabricatorHyper) && micro + microBio >= requiredMicroMemo.get(fabricatorHyper)

const labelFn = (fabricatorHyper, fabricators) => {
  if (maxReached(fabricators, fabricatorHyper)) { return maxedUpgrades }
  const increase = `+${percentString(multipler(fabricatorHyper))} per ${fabricatorsPerHyper} fabs`
  const increaseCost = `${decimalString(requiredMicroMemo.get(fabricatorHyper))} micro`
  return labelWithCost(increase, increaseCost)
}
const labelMemo = new Memorization(labelFn)
export const buyHyperFabLabel = ({ fabricatorHyper, fabricators }) => labelMemo.getFor2(fabricatorHyper, fabricators)

const BuyHyperFabActual = (state) => [{
  ...state,
  ...microCostTransform(state.micro, state.microBio, requiredMicroMemo.get(state.fabricatorHyper)),
  fabricatorHyper: state.fabricatorHyper + 1,
  fabricatorMultiplier: state.fabricatorMultiplier + multipler(state.fabricatorHyper),
}, enqueueAudio(audioIds.button)]
export const BuyHyperFab = () => allowedCheck(buyHyperFabAllowed, BuyHyperFabActual)

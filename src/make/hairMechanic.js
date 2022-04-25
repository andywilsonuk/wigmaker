import { allowedCheck } from "../utils/hyperAppHelpers"
import { cashString, decimalString, labelWithCost } from "../utils/humanize"
import { audioIds, enqueueAudio } from "../audio"
import Memorization from "../utils/memorization"

const levels = [
  { cost: 5, quantity: 10 },
  { cost: 35, quantity: 100 },
  { cost: 75, quantity: 1100 },
  { cost: 105, quantity: 1400 },
  { cost: 220, quantity: 176000 },
]

export const buyHairAllowed = ({ cash, buyLevel }) => cash >= levels[buyLevel].cost
export const buyHairCost = ({ buyLevel }) => cashString(levels[buyLevel].cost)
export const buyHairText = ({ buyLevel }) => `+${decimalString(levels[buyLevel].quantity)}`

const labelFn = (buyLevel) => {
  const increase = `+${decimalString(levels[buyLevel].quantity)}`
  const increaseCost = cashString(levels[buyLevel].cost)
  return labelWithCost(increase, increaseCost)
}
const labelMemo = new Memorization(labelFn)
export const buyHairLabel = (state) => labelMemo.get(state.buyLevel)

const BuyActual = (state) => [{
  ...state,
  hair: state.hair + levels[state.buyLevel].quantity,
  cash: state.cash - levels[state.buyLevel].cost,
}, enqueueAudio(audioIds.button)]
export const BuyHair = () => allowedCheck(buyHairAllowed, BuyActual)

export const buyHairCostRaw = ({ buyLevel }) => levels[buyLevel].cost

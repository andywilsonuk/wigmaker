import { audioIds, enqueueAudio } from '../audio'
import { cashString, decimalString, labelWithCost } from '../utils/humanize'
import { allowedCheck } from '../utils/hyperAppHelpers'
import Memorization from '../utils/memorization'

const levels = [
  { cost: 2, quantity: 20 },
  { cost: 5, quantity: 80 },
  { cost: 8, quantity: 320 },
  { cost: 13, quantity: 2650 },
  { cost: 84, quantity: 50000 }
]

export const buyNylonAllowed = ({ cash, buyLevel }) => cash >= levels[buyLevel].cost

const labelFn = (buyLevel) => {
  const increase = `+${decimalString(levels[buyLevel].quantity)}`
  const increaseCost = cashString(levels[buyLevel].cost)
  return labelWithCost(increase, increaseCost)
}
const labelMemo = new Memorization(labelFn)
export const buyNylonLabel = (state) => labelMemo.get(state.buyLevel)

const BuyActual = (state) => [{
  ...state,
  nylon: state.nylon + levels[state.buyLevel].quantity,
  cash: state.cash - levels[state.buyLevel].cost
}, enqueueAudio(audioIds.button)]

export const BuyNylon = () => allowedCheck(buyNylonAllowed, BuyActual)

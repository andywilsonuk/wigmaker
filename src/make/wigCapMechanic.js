import { audioIds, enqueueAudio } from '../audio'
import { cashString, decimalString, labelWithCost } from '../utils/humanize'
import { allowedCheck } from '../utils/hyperAppHelpers'
import Memorization from '../utils/memorization'

const levels = [
  { cost: 1, quantity: 2 },
  { cost: 10, quantity: 10 },
  { cost: 25, quantity: 80 },
  { cost: 55, quantity: 1360 },
  { cost: 85, quantity: 7200 }
]

export const buyWigCapsAllowed = ({ cash, buyLevel }) => cash >= levels[buyLevel].cost

const labelFn = (buyLevel) => {
  const increase = `+${decimalString(levels[buyLevel].quantity)}`
  const increaseCost = cashString(levels[buyLevel].cost)
  return labelWithCost(increase, increaseCost)
}
const labelMemo = new Memorization(labelFn)
export const buyWigCapsLabel = (state) => labelMemo.get(state.buyLevel)

const BuyActual = (state) => [{
  ...state,
  wigCaps: state.wigCaps + levels[state.buyLevel].quantity,
  cash: state.cash - levels[state.buyLevel].cost
}, enqueueAudio(audioIds.button)]

export const BuyWigCaps = () => allowedCheck(buyWigCapsAllowed, BuyActual)

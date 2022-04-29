import { allowedCheck } from '../utils/hyperAppHelpers'
import toggleFlags from '../utils/toggleFlags'
import lowPowerCheck from './lowPowerCheck'
import { cashString, decimalString, labelWithCost } from '../utils/humanize'
import { audioIds, enqueueAudio } from '../audio'
import Memorization from '../utils/memorization'
import { powerNormalTransform } from './powerMechanic'

const levels = [
  { cost: 30, quantity: 5 },
  { cost: 100, quantity: 100 },
  { cost: 200, quantity: 360 },
  { cost: 700, quantity: 1660 },
  { cost: 950, quantity: 9700 }
]
export const buySiliconAllowed = ({ cash, buyLevel }) => cash >= levels[buyLevel].cost

const labelFn = (buyLevel) => {
  const increase = `+${decimalString(levels[buyLevel].quantity)}`
  const increaseCost = cashString(levels[buyLevel].cost)
  return labelWithCost(increase, increaseCost)
}
const labelMemo = new Memorization(labelFn)
export const buySiliconLabel = (state) => labelMemo.get(state.buyLevel)

export const buySiliconTransform = ({ buyLevel, silicon, cash }, units = 1) => {
  const level = levels[buyLevel]
  const requiredLots = Math.ceil(units / level.quantity)
  return {
    silicon: silicon + requiredLots * level.quantity,
    cash: cash - requiredLots * level.cost
  }
}
export const maxBuySilicon = ({ cash, buyLevel, autoSilicon }) =>
  (toggleFlags.isOn(autoSilicon) ? Math.floor(cash / levels[buyLevel].cost) * levels[buyLevel].quantity : 0)

const BuyActual = (state) => [{
  ...state,
  ...buySiliconTransform(state)
}, enqueueAudio(audioIds.button)]

export const BuySilicon = () => allowedCheck(buySiliconAllowed, BuyActual)

const powerDemand = 1200

export const ToggleAutoSilicon = (state) => [{
  ...state,
  autoSilicon: toggleFlags.toggle(state.autoSilicon),
  powerDemand: state.powerDemand + (toggleFlags.isOn(state.autoSilicon) ? -powerDemand : powerDemand),
  ...powerNormalTransform(state, toggleFlags.isOn(state.autoSilicon) ? powerDemand : 0)
}, lowPowerCheck(), enqueueAudio(audioIds.toggle)]

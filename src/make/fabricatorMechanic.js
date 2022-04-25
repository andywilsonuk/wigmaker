import { audioIds, enqueueAudio } from "../audio"
import { cashString, decimalString, labelWithCost, maxedUpgrades } from "../utils/humanize"
import { allowedCheck } from "../utils/hyperAppHelpers"
import { floorPrecision } from "../utils/math"
import Memorization from "../utils/memorization"
import lowPowerCheck from "./lowPowerCheck"

const basePowerDemand = 300
const maxFabricators = 10000

export const machineryPowerDemand = 150
export const initialFabricatorPower = basePowerDemand * 2

const actionSwitchFabsLevel1 = 50
export const actionSwitchFabsLevel2 = 400

const maxReached = (fabricatorCount) => fabricatorCount >= maxFabricators
const aggregate = (fn) => (initial, iterations) => {
  if (iterations === 1) { return fn(initial) }
  let cumulative = initial
  for (let i = 0; i < iterations; i += 1) {
    cumulative += fn(initial + iterations)
  }
  return cumulative
}

const cashCostFn = (count) => floorPrecision(19.2 * (count - 1) * (count < 300 ? 100 : count))
const cashCostMemo = new Memorization(aggregate(cashCostFn))

const powerCostFn = (fabricatorCount) => basePowerDemand + (5 * fabricatorCount)
const powerCostMemo = new Memorization(aggregate(powerCostFn))

export const powerCostLast = (fabricatorCount, quantity) => aggregate(powerCostFn)(fabricatorCount - quantity, quantity)

export const buyFabricatorAllowed = (state) =>
  !maxReached(state.fabricators) && !state.lowPower && state.cash >= cashCostMemo.getFor2(state.fabricators, state.fabricatorActionQuantity)

const labelFn = (fabricators, quantity) => {
  const increase = `+${quantity}`
  const increaseCost = `${cashString(cashCostMemo.getFor2(fabricators, quantity))}, ${decimalString(powerCostMemo.getFor2(fabricators, quantity))} power`
  return labelWithCost(increase, increaseCost)
}
const labelMemo = new Memorization(labelFn)
export const buyFabricatorLabel = (state) =>
  (maxReached(state.fabricators) ? maxedUpgrades : labelMemo.getFor2(state.fabricators, state.fabricatorActionQuantity))

const BuyFabricatorActual = (state) => [{
  ...state,
  fabricators: state.fabricators + state.fabricatorActionQuantity,
  fabricatorsUnallocated: state.fabricatorsUnallocated + state.fabricatorActionQuantity,
  cash: state.cash - cashCostMemo.getFor2(state.fabricators, state.fabricatorActionQuantity),
  powerDemand: state.powerDemand + powerCostMemo.getFor2(state.fabricators, state.fabricatorActionQuantity),
}, lowPowerCheck(), enqueueAudio(audioIds.button)]
export const BuyFabricator = () => allowedCheck(buyFabricatorAllowed, BuyFabricatorActual)

export const IncreaseFabricatorAllocation = (state, lineIndex) => (state.fabricatorsUnallocated === 0 ? state : [{
  ...state,
  fabricating: state.fabricating.map((x, i) => (i === lineIndex ? { ...x, allocated: x.allocated + Math.min(state.fabricatorActionQuantity, state.fabricatorsUnallocated) } : x)),
  fabricatorsUnallocated: state.fabricatorsUnallocated - Math.min(state.fabricatorActionQuantity, state.fabricatorsUnallocated),
}, enqueueAudio(audioIds.button)])

export const DecreaseFabricatorAllocation = (state, lineIndex) => (state.fabricating[lineIndex].allocated === 0 ? state : [{
  ...state,
  fabricating: state.fabricating.map((x, i) => (i === lineIndex ? { ...x, allocated: x.allocated - Math.min(state.fabricatorActionQuantity, x.allocated) } : x)),
  fabricatorsUnallocated: state.fabricatorsUnallocated + Math.min(state.fabricatorActionQuantity, state.fabricating[lineIndex].allocated),
}, enqueueAudio(audioIds.button)])

export const actionQuantitySwitchAllowed = (fabricators) => fabricators >= actionSwitchFabsLevel1

export const nextActionQuantity = (fabricators, currentQuantity) => {
  if (currentQuantity === 1) { return 10 }
  if (fabricators < actionSwitchFabsLevel2 || currentQuantity === 50) { return 1 }
  return 50
}

export const SetFabricationActionQuantity = (state, quantity) => [{ ...state, fabricatorActionQuantity: quantity }, enqueueAudio(audioIds.button)]

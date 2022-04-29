import { allowedCheck } from '../utils/hyperAppHelpers'
import { cashString, decimalString, labelWithCost, maxedUpgrades } from '../utils/humanize'
import { floorPrecision, sumArray } from '../utils/math'
import Memorization from '../utils/memorization'
import { achievedLookup, research } from '../shared/milestones'
import { initMessage, logTransform } from '../shared/logData'
import { audioIds, enqueueAudio } from '../audio'

export const powerSupplyId = {
  initial: 0,
  grid: 1,
  solar: 2,
  wind: 3,
  void: 4
}

const maxSupply = 100
const powerChainingMultiplier = 4

const names = ['Grid', 'Grid', 'Solar', 'Wind', 'Void']
const supplyValues = [1000, 5000, 4000, 4500, Infinity]
const baseSupplyCosts = [0, 3200, 2800, 2650, 0]
const augmentedSupplyCosts = [0, 223, 85, 160, 0]

export const powerSupplyName = (supplyId) => names[supplyId]

const costFn = (powerSupply, id) => {
  const supplyCount = powerSupply.filter((s) => s === id).length + 1
  const supplyWeighting = augmentedSupplyCosts[id] * supplyCount
  const totalSupplyWeighting = (powerSupply.length - 1) ** 3
  const totalCost = baseSupplyCosts[id] + (totalSupplyWeighting * supplyWeighting)
  return floorPrecision(totalCost)
}
const costs = Array.from({ length: 5 }, () => new Memorization(costFn))

export const buyPowerAllowed = ({ powerSupply, cash }, supplyId) => powerSupply.length < maxSupply && cash >= costs[supplyId].get(powerSupply, supplyId)

export const supplyMutliplier = ({ achieved }, supplyId) => {
  const isChainable = supplyId === powerSupplyId.solar || supplyId === powerSupplyId.wind
  if (isChainable && achievedLookup.has(achieved, research.powerChaining)) { return powerChainingMultiplier }
  return 1
}
const powerSupplyValue = (state, supplyId) => supplyValues[supplyId] * supplyMutliplier(state, supplyId)

const labelFn = (powerSupply, supplyId, state) => {
  if (powerSupply.length >= maxSupply) { return maxedUpgrades }
  const increase = `+${decimalString(powerSupplyValue(state, supplyId))} ${powerSupplyName(supplyId)}`
  const increaseCost = cashString(costs[supplyId].get(powerSupply, supplyId))
  return labelWithCost(increase, increaseCost)
}
const labels = Array.from({ length: 5 }, () => new Memorization(labelFn))
export const buyPowerLabel = (state, supplyId) => labels[supplyId].get(state.powerSupply, supplyId, state)

const calcSupply = (supply, state) => sumArray(supply.map((id) => powerSupplyValue(state, id)))
const memo = new Memorization(calcSupply)
const totalPowerSupply = (state) => memo.get(state.powerSupply, state)

const powerSupplyToString = (_, state) => decimalString(totalPowerSupply(state))
const powerSupplyMemo = new Memorization(powerSupplyToString)
export const powerSupplyString = (state) => powerSupplyMemo.get(state.powerSupply, state)

const powerDemandToString = (powerDemand) => decimalString(powerDemand)
const powerDemandMemo = new Memorization(powerDemandToString)
export const powerDemandString = ({ powerDemand }) => powerDemandMemo.get(powerDemand)

export const powerDemandExceedsSupply = (state) => totalPowerSupply(state) < state.powerDemand

const normalPowerMessage = initMessage('4e', 'Normal power levels resumed')

export const powerNormalTransform = (state, additional) => {
  if (additional === 0) { return undefined }
  if (!state.lowPower) { return undefined }
  const currentSupply = totalPowerSupply(state)
  if (currentSupply + additional < state.powerDemand) { return undefined }
  return {
    ...logTransform(state, normalPowerMessage),
    lowPower: false
  }
}

const BuyPowerActual = (state, supplyId) => [{
  ...state,
  powerSupply: [...state.powerSupply, supplyId],
  cash: state.cash - costs[supplyId].get(state.powerSupply, supplyId),
  ...powerNormalTransform(state, powerSupplyValue(state, supplyId))
}, enqueueAudio(audioIds.button)]

export const BuyPowerGrid = () => allowedCheck(buyPowerAllowed, BuyPowerActual, powerSupplyId.grid)
export const BuyPowerSolar = () => allowedCheck(buyPowerAllowed, BuyPowerActual, powerSupplyId.solar)
export const BuyPowerWind = () => allowedCheck(buyPowerAllowed, BuyPowerActual, powerSupplyId.wind)

export const PowerEfficiencyUpgrade = (state) => ({
  ...state,
  powerSupply: [...state.powerSupply] // force memo refresh
})

export const VoidPower = (state) => ({
  ...state,
  powerSupply: [powerSupplyId.void],
  lowPower: false
})

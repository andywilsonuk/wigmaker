import { audioIds, enqueueAudio } from '../audio'
import { eightBillion, fiveTrillion, oneHundredMillion } from '../shared/bigNumbers'
import { initMessage, logTransform } from '../shared/logData'
import { cashString, decimalString, labelWithCost, maxedUpgrades } from '../utils/humanize'
import { allowedCheck } from '../utils/hyperAppHelpers'
import { floorPrecision, percentOfTotalInt } from '../utils/math'
import Memorization from '../utils/memorization'
import toggleFlags from '../utils/toggleFlags'

const names = [
  'London',
  'Toyko',
  'Chicago',
  'Houston',
  'Boston',
  'San Diego',
  'Milan',
  'Copenhagen',
  'Karachi',
  'Sydney',
  'Nairobi',
  'Lima',
  'Rio'
]
const maxDataCenters = names.length
const microBioComputeMultiplier = 5
export const targetNodes = eightBillion
const nodesPerDataCenter = Math.ceil(targetNodes / (maxDataCenters + 1))
export const computePerDataCenter = 85000

export const coverage = ({ meshNodes }) => meshNodes / targetNodes
export const capacity = ({ dataCenters }) => (dataCenters > maxDataCenters ? Infinity : nodesPerDataCenter * dataCenters)
export const atCapacity = (state) => state.dataCenters > 0 && state.meshNodes >= capacity(state)

const costFn = (level) => (level === maxDataCenters ? fiveTrillion : floorPrecision(oneHundredMillion * (Math.exp(level) ** 0.81)))
const costMemo = new Memorization(costFn)

const maxReached = (count) => count > maxDataCenters

const maxCompute = (dataCenters) => dataCenters * computePerDataCenter * (dataCenters < 10 ? 1.2 : 2.1)

const maxComputeToString = (dataCenters) => decimalString(maxCompute(dataCenters))
const maxComputeMemo = new Memorization(maxComputeToString)
export const maxComputeString = ({ dataCenters }) => maxComputeMemo.get(dataCenters)
export const computeString = ({ compute }) => decimalString(compute)

const unitsAllowed = (state) => {
  let remainingCompute = maxCompute(state.dataCenters) - state.compute
  const microUnits = Math.min(state.micro, remainingCompute)
  remainingCompute -= microUnits
  const microBioUnits = Math.min(state.microBio, Math.floor(remainingCompute / microBioComputeMultiplier))
  const additionalCompute = microUnits + (microBioUnits * microBioComputeMultiplier)

  return { microUnits, microBioUnits, additionalCompute }
}
export const microsAvailableForInstall = (state) => {
  const { microUnits, microBioUnits } = unitsAllowed(state)
  return microUnits + microBioUnits
}
export const installAllowed = (state) => state.dataCenters > 0 && microsAvailableForInstall(state) > 0
export const isCommissioning = ({ dataCenterProgress }) => dataCenterProgress !== 0
export const commissionAllowed = ({ dataCenters, cash, dataCenterProgress }) =>
  dataCenterProgress === 0 && !maxReached(dataCenters) && cash >= costMemo.get(dataCenters)

const labelFn = (dataCenters) => {
  if (maxReached(dataCenters)) { return maxedUpgrades }
  const increase = dataCenters === names.length ? 'Decentralized infrastructure' : `Commission ${names[dataCenters]} center`
  const increaseCost = cashString(costMemo.get(dataCenters))
  return labelWithCost(increase, increaseCost)
}
const labelMemo = new Memorization(labelFn)
export const buyDataCenterLabel = ({ dataCenters }) => labelMemo.get(dataCenters)

const CommissionActual = (state) => [{
  ...state,
  cash: state.cash - costMemo.get(state.dataCenters),
  dataCenterProgress: 0.001
}, enqueueAudio(audioIds.button)]
export const Commission = () => allowedCheck(commissionAllowed, CommissionActual)

const InstallActual = (state, auto) => {
  const { microUnits, microBioUnits, additionalCompute } = unitsAllowed(state)
  return [{
    ...state,
    micro: state.micro - microUnits,
    microBio: state.microBio - microBioUnits,
    compute: state.compute + additionalCompute
  }, !auto && enqueueAudio(audioIds.button)]
}
export const Install = () => allowedCheck(installAllowed, InstallActual)

export const AutoInstall = (state) => (toggleFlags.isOn(state.autoInstall) ? [InstallActual, true] : state)

export const ToggleAutoInstall = (state) => [{
  ...state,
  autoInstall: toggleFlags.toggle(state.autoInstall)
}, enqueueAudio(audioIds.toggle)]

const defaultCommissionTime = 120
export const commissionTime = ({ dataCenters }) => (defaultCommissionTime - dataCenters * 3) * 1000

export const dataCenterTransferTransform = (state) => ({
  dataCenters: Math.min(state.dataCenters + 1, maxDataCenters),
  compute: state.compute + percentOfTotalInt(computePerDataCenter, 40)
})
const commissionedMessage = initMessage('4c', 'Data center complete')
const Commissioned = (state) => ({
  ...state,
  dataCenters: state.dataCenters + 1,
  dataCenterProgress: 0,
  ...logTransform(state, commissionedMessage)
})

export const Commissioning = (state, deltaTime) => {
  const dataCenterProgress = state.dataCenterProgress + deltaTime
  if (dataCenterProgress === deltaTime) { return state }
  if (dataCenterProgress >= commissionTime(state)) { return Commissioned }
  return { ...state, dataCenterProgress }
}

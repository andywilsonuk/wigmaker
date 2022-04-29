import { allowedCheck } from '../utils/hyperAppHelpers'
import toggleFlags from '../utils/toggleFlags'
import { cashString, decimalString, labelWithCost, maxedUpgrades } from '../utils/humanize'
import { achievedLookup, research } from '../shared/milestones'
import { floorPrecision } from '../utils/math'
import { oneHundredThousand } from '../shared/bigNumbers'
import { audioIds, enqueueAudio } from '../audio'
import Memorization from '../utils/memorization'

const maxLevel = 50

const nextExpansion = (poolSize) => Math.floor(poolSize * 0.8)
const costFn = (level) => floorPrecision(((level + 1) ** 3) * oneHundredThousand)
const costMemo = new Memorization(costFn)

export const algaePoolExpansionAllowed = ({ algaePoolLevel, cash }) => algaePoolLevel < maxLevel && cash >= costMemo.get(algaePoolLevel)

const labelFn = (algaePoolLevel, { algaePoolSize }) => {
  if (algaePoolLevel >= maxLevel) { return maxedUpgrades }
  const increase = `+${decimalString(nextExpansion(algaePoolSize))}`
  const increaseCost = cashString(costMemo.get(algaePoolLevel))
  return labelWithCost(increase, increaseCost)
}
const labelMemo = new Memorization(labelFn)
export const buyPoolExpansionLabel = (state) => labelMemo.get(state.algaePoolLevel, state)

const poolSizeToString = (algaePoolSize) => decimalString(algaePoolSize)
const poolSizeMemo = new Memorization(poolSizeToString)
export const poolSizeString = ({ algaePoolSize }) => poolSizeMemo.get(algaePoolSize)
export const poolUsedString = ({ algaePool }) => decimalString(Math.floor(algaePool))

export const growthText = ({ algaePoolSize, algaePool }) => {
  const percent = algaePool / algaePoolSize
  if (percent < 0.2) { return 'Emergent' }
  if (percent < 0.3) { return 'Developing' }
  if (percent < 0.5) { return 'Prospering' }
  if (percent < 0.7) { return 'Flourishing' }
  return 'Blooming'
}

export const AllowMakeAlgaeWigs = (state) => ({
  ...state,
  algaePoolLevel: 1,
  algaePoolSize: 40000,
  algaePool: 30000,
  algaeHarvest: 0.9
})

const ExpandPool = (state) => [{
  ...state,
  cash: state.cash - costMemo.get(state.algaePoolLevel),
  algaePoolLevel: state.algaePoolLevel + 1,
  algaePoolSize: state.algaePoolSize + nextExpansion(state.algaePoolSize)
}, enqueueAudio(audioIds.button)]
export const BuyPoolExpansion = () => allowedCheck(algaePoolExpansionAllowed, ExpandPool)
export const AlgaeHarvestRate = (state, newRate) => [{ ...state, algaeHarvest: newRate }, enqueueAudio(audioIds.button)]
export const ToggleAutoPutty = (state) => [{ ...state, autoPutty: toggleFlags.toggle(state.autoPutty) }, enqueueAudio(audioIds.toggle)]

const algaePerSecond = 0.06 / 1000

export const AlgaePoolUpdate = (state, deltaTime) => {
  if (!achievedLookup.has(state.achieved, research.algaeIncubator)) { return state }
  const { algaePoolSize, algaePool, algaeHarvest } = state
  const updatedPool = algaePool + (algaePerSecond * deltaTime * algaePool)

  if (algaePool < algaePoolSize) {
    return { ...state, algaePool: updatedPool }
  }

  const harvestAmount = algaePoolSize * (1 - algaeHarvest)
  const algaeToHarvest = Math.floor(algaePool - harvestAmount)
  return {
    ...state,
    algaePool: updatedPool - algaeToHarvest,
    algae: state.algae + algaeToHarvest
  }
}

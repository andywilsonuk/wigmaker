import { achievedLookup, campaign, research } from '../shared/milestones'
import { randomRange } from '../utils/random'
import * as demandEarly from './demandEarly'
import * as demandNormal from './demandNormal'
import * as demandSmart from './demandSmart'

const jitterLevelMin = 0.7
const jitterLevelMax = 1.2
const jitterListLength = 100

let jitterList
let jitterIndex = null

export const jitterDemand = (demand) => {
  if (jitterIndex === null) {
    jitterList = Array.from({ length: jitterListLength }, () => randomRange(jitterLevelMin, jitterLevelMax))
    jitterIndex = 0
  } else {
    jitterIndex = (jitterIndex + 1) % jitterListLength
  }
  return Math.round(demand * jitterList[jitterIndex])
}

const getEngine = (achieved) => {
  if (!achievedLookup.has(achieved, campaign.socialMedia)) { return demandEarly }
  if (achievedLookup.has(achieved, research.smartWigs)) { return demandSmart }
  return demandNormal
}

export default (state, deltaTime, fakeDemand) => {
  const { demandAccumulation, brand, wigs, achieved } = state
  if (brand === 0) { return state }

  const demandEngine = getEngine(achieved)
  const wigsPerSecond = fakeDemand ?? demandEngine.demandPerSecond(brand, wigs)
  const durationPerWig = 1 / (wigsPerSecond / 1000)
  const availableTime = demandAccumulation + deltaTime
  const newOrders = Math.floor(availableTime / durationPerWig)
  const newAccumulation = availableTime - durationPerWig * newOrders

  const jitteredOrders = fakeDemand === undefined ? jitterDemand(newOrders) : newOrders

  return {
    ...state,
    demandAccumulation: newAccumulation,
    ...demandEngine.demandTransform(state, jitteredOrders)
  }
}

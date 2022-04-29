import { wigMaker, wigCapMaker, wigletMaker, microComputeMaker, smartChipMaker } from './makers'
import { fabricatingIndex, fabricatingSubtype } from './fabricatingEnum'
import { wigMakeLogTransform } from './wigLogMessages'
import { achievedLookup, milestone, research } from '../shared/milestones'
import { boostOn } from '../make/boostMechanic'
import Memorization from '../utils/memorization'
import RateCounter from '../utils/rateCounter'

const emptyProgressResult = [undefined, undefined, undefined]
const makers = [wigMaker, wigCapMaker, wigletMaker, microComputeMaker, smartChipMaker]
const stats = Array.from({ length: 5 }, () => new RateCounter())
let lastWrite = 0

const getAvailableProgress = (state, deltaTime) => {
  const deltaTimeWithMultipliers = (deltaTime * state.fabricatorMultiplier)
  if (state.lowPower) { return deltaTimeWithMultipliers * 0.6 }
  if (boostOn(state)) { return deltaTimeWithMultipliers * 1.2 }
  return deltaTimeWithMultipliers
}

const subtypeFn = (wigMakerSubtype, achieved) => {
  const subtypes = Array.from({ length: 5 })
  subtypes[fabricatingIndex.wig] = wigMakerSubtype
  subtypes[fabricatingIndex.micro] = achievedLookup.has(achieved, research.microBio) ? fabricatingSubtype.microBio : fabricatingSubtype.micro
  return subtypes
}
const subtypeMemo = new Memorization(subtypeFn)
const getSubtypes = ({ wigMakerSubtype, achieved }) => subtypeMemo.getFor2(wigMakerSubtype, achieved)

export const progressLine = (state, line, newSubtype, maker, deltaTime) => {
  const { allocated, progress: carriedProgress, subtype: existingSubtype } = line
  if (allocated === 0) { return emptyProgressResult }

  const duration = maker.duration(state)
  let existingCompleted = false
  let madeNewSubtype = 0
  let startedNewSubtype = 0

  const hadCarriedProgress = carriedProgress > 0
  const availableProgress = deltaTime * allocated
  let makeTime = carriedProgress + availableProgress

  if (hadCarriedProgress && makeTime >= duration) {
    existingCompleted = true
    makeTime -= duration
  }

  const canChangeSubtype = existingCompleted || !hadCarriedProgress
  let starved = false

  if (canChangeSubtype) {
    const resourceQuantity = maker.resourceMax(state, newSubtype)
    const timeQuantity = Math.floor(makeTime / duration)
    madeNewSubtype = Math.min(timeQuantity, resourceQuantity)
    startedNewSubtype = madeNewSubtype
    makeTime -= duration * madeNewSubtype

    if (makeTime > 0) {
      if (resourceQuantity > timeQuantity) {
        startedNewSubtype += 1
        starved = resourceQuantity - 1 < timeQuantity
      } else {
        makeTime = 0
        starved = true
      }
    }
  }

  const updatedLine = { ...line, progress: makeTime, subtype: canChangeSubtype ? newSubtype : existingSubtype, starved }

  let makeRate = 0
  if (hadCarriedProgress && !existingCompleted) {
    makeRate += (makeTime - carriedProgress) / duration
  } else {
    makeRate += madeNewSubtype
    if (hadCarriedProgress) {
      makeRate += (duration - carriedProgress) / duration
    }
    if (makeTime > 0) {
      makeRate += makeTime / duration
    }
  }

  if (!existingCompleted && startedNewSubtype === 0) { return [updatedLine, state, makeRate] }

  let updatedState = state

  if (existingCompleted) {
    if (newSubtype === existingSubtype) {
      madeNewSubtype += 1
    } else {
      updatedState = {
        ...updatedState,
        ...maker.madeTransform(state, 1, existingSubtype)
      }
    }
  }

  updatedState = {
    ...updatedState,
    ...(startedNewSubtype === 0 ? undefined : maker.costTransform(updatedState, startedNewSubtype, newSubtype)),
    ...(madeNewSubtype === 0 ? undefined : maker.madeTransform(updatedState, madeNewSubtype, newSubtype))
  }

  return [updatedLine, updatedState, makeRate]
}

export default (state, deltaTime) => {
  if (!achievedLookup.has(state.achieved, milestone.autoMaker)) { return state }

  lastWrite += deltaTime
  const writeStats = lastWrite >= 1000
  if (writeStats) { lastWrite -= 1000 }

  const { fabricating } = state
  const deltaTimeWithModifiers = getAvailableProgress(state, deltaTime)

  let updatedState = state
  const fabricatingUpdated = [...fabricating]
  const subtypes = getSubtypes(state)
  const previousWigCount = state.wigs

  for (let index = 0; index < fabricating.length; index += 1) {
    let line = fabricating[index]
    const maker = makers[index]

    if (writeStats) {
      line = { ...line, rate: stats[index].emit(line.rate) }
    }

    const [updatedLine, updatedStateFromProgress, makeRate] = progressLine(updatedState, line, subtypes[index], maker, deltaTimeWithModifiers)
    fabricatingUpdated[index] = updatedLine ?? line
    if (updatedLine === undefined) { continue }
    updatedState = updatedStateFromProgress
    stats[index].increment(makeRate)
  }

  return {
    ...updatedState,
    ...wigMakeLogTransform(state, updatedState.wigs - previousWigCount),
    fabricating: fabricatingUpdated
  }
}

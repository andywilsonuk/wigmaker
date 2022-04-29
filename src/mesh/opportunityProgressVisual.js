import { Generator } from '../utils/random'
import { effectNoPayload } from '../utils/hyperAppHelpers'
import { ProgressAllocator } from './progressAllocator'
import { normalize } from '../utils/math'
import Memorization from '../utils/memorization'
import dataProvider from '../shared/dataProvider'
import { oneMillion } from '../shared/bigNumbers'

const progressAllocator = new ProgressAllocator()
let rand
let progressPercentLast = null
let targetIP

export const allocations = () => progressAllocator.allocated.blocks
export const visualizationKey = () => `${progressPercentLast}`

const Visualization = (state) => {
  const { opportunity: { id, progress } } = state
  if (progressPercentLast === null) {
    rand = new Generator(state.randSeed, id * oneMillion)
    targetIP = rand.randomRange(oneMillion, 9999999).toString(36)
    progressAllocator.init()
    progressPercentLast = 0
  }
  const { compute } = dataProvider.getById(id)
  const currentPercent = Math.floor((progress / compute) * 100)
  while (currentPercent > progressPercentLast) {
    progressPercentLast += 1
    progressAllocator.update(rand)
  }

  return state
}
const resetVisualization = () => {
  progressPercentLast = null
}

export const visualizationUpdate = () => [effectNoPayload, Visualization]
export const visualizationReset = () => [resetVisualization]

const calcProgressMessage = (progress, limit) => {
  const progressFromEnd = limit - progress
  if (progress < 10 * 1000) { return 'Establishing interface' }
  if (progress < 20 * 1000) { return `Connecting to SMART-${targetIP}` }

  if (progressFromEnd < 5 * 1000) { return 'Disconnected' }
  if (progressFromEnd < 10 * 1000) { return `Disconnecting from SMART-${targetIP}` }
  if (progressFromEnd < 15 * 1000) { return 'Confirmed' }
  if (progressFromEnd < 20 * 1000) { return 'Awaiting confirmation' }

  const variableProgress = normalize(progress, 20 * 1000, limit - (20 * 1000))

  if (variableProgress < 0.2) { return 'Generating instruction sequence' }
  if (variableProgress < 0.4) { return 'Transferring' }
  if (variableProgress < 0.6) { return 'Matching brainwaves' }
  if (variableProgress < 0.8) { return 'Encoding pattern' }
  if (variableProgress < 1) { return 'Delivering into subconscious' }

  throw new Error('progress message fail')
}

const memo = new Memorization(calcProgressMessage)
export const progressMessage = (progress, limit) => memo.get(progress, limit)

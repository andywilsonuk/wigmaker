import { decimalString, labelWithCost } from '../utils/humanize'
import { randomInt, randomRange, Generator } from '../utils/random'
import { initMessage, initNews, logTransform } from '../shared/logData'
import { vogueIncreaseMaxTransform } from './vogueMechanic'
import { allowedCheck } from '../utils/hyperAppHelpers'
import { enable, finished, converted, disabled, selecting, isFinished, selected, isSelecting } from './trendEnum'
import Memorization from '../utils/memorization'
import { audioIds, enqueueAudio } from '../audio'

const titles = [
  'Mock Tudor',
  'Egyptian-style',
  'Roman-esq',
  'Brazilian',
  'Paris-style',
  'Old English',
  'The Perm',
  'Court dress',
  'Traditional Japanese'
]
const choiceCount = 14

let rand

export const brandRequiredForTrends = 15000
export const initialTrendIteration = -1

export const choicesCalc = (trendProgress, { randSeed, trendIteration }) => {
  rand = new Generator(randSeed, Math.cos(trendProgress) + trendIteration)

  const choiceInts = []
  for (let i = 0; i < 3; i += 1) {
    let letterInt = rand.randomInt(0, choiceCount - 1)
    while (choiceInts.includes(letterInt)) {
      letterInt = (letterInt + 1) % choiceCount
    }
    choiceInts.push(letterInt)
  }
  return choiceInts
}
const choicesMemo = new Memorization(choicesCalc)
export const availableChoices = (state) => choicesMemo.get(state.trendProgress, state)

export const choiceCalc = (trendProgress, state) => {
  const choices = choicesMemo.get(trendProgress, state)
  return choices[rand.randomInt(0, choices.length - 1)]
}

const choiceMemo = new Memorization(choiceCalc)
export const selectedChoice = (state) => choiceMemo.get(state.trendProgress, state)

const costFn = (level) => Math.floor(Math.log((level + 1) ** 15) + (20 * (level + 1)) + 100)
const costMemo = new Memorization(costFn)

export const startTrendAllowed = ({ strands, trendStatus, trendIteration }) => trendStatus === enable() && strands >= costMemo.get(trendIteration + 1)

const labelFn = (trendIteration) => {
  const increase = 'Start a trend'
  const increaseCost = `${decimalString(costMemo.get(trendIteration + 1))} strands`
  return labelWithCost(increase, increaseCost)
}
const labelMemo = new Memorization(labelFn)
export const startTrendLabel = (state) => labelMemo.get(state.trendIteration)

export const trendName = ({ trendIteration }) => {
  if (trendIteration === initialTrendIteration) { return 'none' }
  const cycle = Math.floor(trendIteration / titles.length) + 1
  const title = titles[trendIteration % titles.length]
  return cycle === 1 ? title : `${title} part ${cycle}`
}

const startSelectingTransform = () => ({
  trendStatus: selecting(),
  trendDue: randomInt(2500, 3500)
})

export const TrendsVisible = (state) => ({
  ...state,
  trendStatus: disabled(),
  trendIteration: initialTrendIteration
})

export const TrendsEnabled = (state) => ({
  ...state,
  trendStatus: enable()
})

export const StartTrendActual = (state) => [{
  ...state,
  ...startSelectingTransform(),
  trendIteration: state.trendIteration + 1,
  trendProgress: 0,
  strands: state.strands - costMemo.get(state.trendIteration + 1)
}, enqueueAudio(audioIds.button)]
export const StartTrend = () => allowedCheck(startTrendAllowed, StartTrendActual)

const vogueLimitIncreasedLog = initMessage('4a', 'Vogue limit increased')
export const TrendConvertToVogue = (state) => (isFinished(state.trendStatus)
  ? [{
      ...state,
      ...vogueIncreaseMaxTransform(state, Math.floor(state.vogueMax * 0.6)),
      trendProgress: 0,
      trendStatus: converted(),
      ...logTransform(state, vogueLimitIncreasedLog)
    }, enqueueAudio(audioIds.button)]
  : state)

export const NextTrendSelection = (state) => [{
  ...state,
  ...startSelectingTransform()
}, enqueueAudio(audioIds.button)]

const newTrendLog = initNews('4b', 'A new trend has started')
export const TrendFinish = (state) => [{
  ...state,
  ...state.trends,
  trendStatus: finished(),
  trendProgress: 1,
  ...logTransform(state, newTrendLog)
}, enqueueAudio(audioIds.button)]

export const IncreaseProgress = (state, progress) => [{
  ...state,
  ...startSelectingTransform(),
  trendProgress: progress
}, enqueueAudio(audioIds.button)]

export const CorrectTrendChoice = (state) => {
  const progress = Math.floor((state.trendProgress + randomRange(0.01, Math.max(0.04, state.trendProgress))) * 100) / 100
  return progress >= 1 ? TrendFinish : [IncreaseProgress, progress]
}

export const Select = (state) => ({
  ...state,
  trendStatus: selected(),
  trendDue: 0
})

export const TrendUpdate = (state, deltaTime) => {
  const { trendStatus, trendDue } = state
  if (!isSelecting(trendStatus)) { return state }
  if (trendDue < deltaTime) { return Select }
  return {
    ...state,
    trendDue: trendDue - deltaTime
  }
}

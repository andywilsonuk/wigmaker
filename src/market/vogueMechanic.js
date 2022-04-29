import { audioIds, enqueueAudio } from '../audio'
import { oneMillion } from '../shared/bigNumbers'
import { achievedLookup, milestone } from '../shared/milestones'
import { decimalString } from '../utils/humanize'
import { allowedCheck } from '../utils/hyperAppHelpers'
import Memorization from '../utils/memorization'

export const InitVogue = (state) => ({
  ...state,
  vogue: 0,
  vogueLimit: 15,
  vogueMax: 120
})

export const useVogueAllowed = ({ vogue, vogueLimit }) => vogue >= vogueLimit

export const UseVogueActual = (state) => [{
  ...state,
  brand: state.brand + state.vogue,
  vogue: 0,
  vogueLimit: Math.min(state.vogueMax, state.vogueLimit * 2)
}, enqueueAudio(audioIds.button)]

export const UseVogue = () => allowedCheck(useVogueAllowed, UseVogueActual)

export const vogueIncreaseMaxTransform = (state, addition) => ({
  vogueMax: state.vogueMax + addition,
  vogueLimit: state.vogue === state.vogueLimit && state.vogueLimit === state.vogueMax ? state.vogueMax + addition : state.vogueLimit
})

const vogueLimitToString = (vogueLimit) => decimalString(vogueLimit)
const vogueLimitMemo = new Memorization(vogueLimitToString)
export const vogueLimitString = ({ vogueLimit }) => vogueLimitMemo.get(vogueLimit)
export const vogueString = ({ vogue }) => decimalString(Math.floor(vogue))

const ratePerSecond = 3 / 1000
const additionPer1000PerSecond = 1 / 1000
const addition1mPerSecond = 2 / 1000
const addition3mPerSecond = 5 / 1000

export const VogueUpdate = (state, deltaTime) => {
  const { vogueLimit, vogue, achieved } = state
  if (!achievedLookup.has(achieved, milestone.vogue)) { return state }
  if (vogue >= vogueLimit) { return state }

  let additional = Math.floor(vogue / 200) * additionPer1000PerSecond
  if (vogueLimit > oneMillion) { additional += addition1mPerSecond }
  if (vogueLimit > 3000000) { additional += addition3mPerSecond }
  const update = (ratePerSecond + additional) * deltaTime
  return {
    ...state,
    vogue: Math.min(vogue + update, vogueLimit)
  }
}

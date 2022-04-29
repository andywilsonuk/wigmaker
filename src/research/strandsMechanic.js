import { audioIds, enqueueAudio } from '../audio'
import { decimalString } from '../utils/humanize'
import Memorization from '../utils/memorization'

export const StrandsResume = (state) => [{
  ...state,
  strandsOn: true,
  researchId: null
}, enqueueAudio(audioIds.button)]

const strandsPerSecond = 1 / 1000

export const StrandsUpdate = (state, deltaTime) => (state.strandsOn
  ? {
      ...state,
      strands: state.strands + strandsPerSecond * deltaTime
    }
  : state)

const strandsToString = (strands) => decimalString(strands)
const strandsMemo = new Memorization(strandsToString)
export const strandString = ({ strands }) => strandsMemo.get(Math.floor(strands))

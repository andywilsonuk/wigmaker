import { audioIds, enqueueAudio } from "../audio"
import { allowedCheck } from "../utils/hyperAppHelpers"

export const boostDuration = 8000

export const boostAllowed = (state) => state.boostRemaining === 0 && !state.lowPower
export const boostOn = (state) => state.boostRemaining > 0

const Boosted = (state) => [{ ...state, boostRemaining: boostDuration }, enqueueAudio(audioIds.button)]
export const Boost = () => allowedCheck(boostAllowed, Boosted)

export const boostEndTransform = ({ boostRemaining: 0 })

export const BoostEnd = (state) => ({ ...state, ...boostEndTransform })

export const BoostUpdate = (state, deltaTime) => {
  let { boostRemaining } = state
  if (boostRemaining === 0) { return state }

  boostRemaining -= deltaTime

  return boostRemaining <= 0 ? BoostEnd : { ...state, boostRemaining }
}

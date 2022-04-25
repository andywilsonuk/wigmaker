import RateCounter from "../utils/rateCounter"
import toggleFlags from "../utils/toggleFlags"

const rateCounter = new RateCounter()
let lastWrite = 0

export const algaeToPuttyTransform = ({ algae }, units = 1) => {
  rateCounter.increment(units)
  return { algae: algae - units }
}

export const PuttyRateCounter = (state, deltaTime) => {
  lastWrite += deltaTime
  if (lastWrite < 1000) { return state }
  lastWrite -= 1000
  const previousStats = state.puttyEnhanced
  const rate = rateCounter.emit(previousStats)
  return { ...state, puttyEnhanced: rate }
}

export const maxPutty = ({ algae, autoPutty }) => (toggleFlags.isOn(autoPutty) ? algae : 0)

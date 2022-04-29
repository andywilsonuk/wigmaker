import { buySiliconTransform, maxBuySilicon } from '../make/siliconMechanic'
import toggleFlags from '../utils/toggleFlags'

const siliconCost = 3
const caps = 1

export const allowed = ({ silicon, wigCaps }) => silicon >= siliconCost && wigCaps >= caps
export const costTransform = (state, quantity) => {
  const siliconRequired = siliconCost * quantity
  let { silicon, cash } = state
  if (toggleFlags.isOn(state.autoSilicon)) {
    const costOutcome = buySiliconTransform(state, siliconRequired - state.silicon)
    silicon = costOutcome.silicon
    cash = costOutcome.cash
  }
  return {
    silicon: silicon - siliconRequired,
    wigCaps: state.wigCaps - caps * quantity,
    cash
  }
}
export const cost = () => `${siliconCost} silicon, cap`
export const resourceMax = (state) =>
  Math.floor(Math.min(
    (state.silicon + maxBuySilicon(state)) / siliconCost,
    state.wigCaps / caps
  ))

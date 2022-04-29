import { buySiliconTransform, maxBuySilicon } from '../make/siliconMechanic'
import toggleFlags from '../utils/toggleFlags'

const siliconCost = 50

export const allowed = ({ silicon }) => silicon >= siliconCost
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
    cash
  }
}
export const cost = () => `${siliconCost} silicon`
export const resourceMax = (state) => Math.floor((state.silicon + maxBuySilicon(state)) / siliconCost)

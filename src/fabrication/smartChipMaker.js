import toggleFlags from '../utils/toggleFlags'
import { buySiliconTransform, maxBuySilicon } from '../make/siliconMechanic'
import { algaeToPuttyTransform, maxPutty } from '../make/synapticPuttyMechanic'

const siliconCost = 2
const puttyCost = 1
const makeTime = 0.5 * 1000

export const allowed = ({ silicon, algae }) => silicon >= siliconCost && algae >= puttyCost
export const costTransform = (state, quantity) => {
  const siliconRequired = siliconCost * quantity
  const puttyRequired = puttyCost * quantity
  let { silicon, cash } = state
  if (toggleFlags.isOn(state.autoSilicon)) {
    const costOutcome = buySiliconTransform(state, siliconRequired - silicon)
    silicon = costOutcome.silicon
    cash = costOutcome.cash
  }
  if (!toggleFlags.isOn(state.autoPutty)) { throw new Error('Auto putty is off, cannot apply cost') }
  const { algae } = algaeToPuttyTransform(state, puttyRequired)
  return {
    silicon: silicon - siliconRequired,
    cash,
    algae
  }
}

export const cost = () => `${puttyCost} putty, ${siliconCost} silicon`
export const duration = () => makeTime
export const madeTransform = (state, quantity) => ({ smartChips: state.smartChips + quantity })
export const resourceMax = (state) =>
  Math.floor(Math.min(
    (state.silicon + maxBuySilicon(state)) / siliconCost,
    maxPutty(state) / puttyCost
  ))

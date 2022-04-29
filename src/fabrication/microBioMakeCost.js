import { buySiliconTransform, maxBuySilicon } from '../make/siliconMechanic'
import { algaeToPuttyTransform, maxPutty } from '../make/synapticPuttyMechanic'
import toggleFlags from '../utils/toggleFlags'

const siliconCost = 5
const hairCost = 6
const puttyCost = 3

export const allowed = ({ silicon, hair, algae }) => silicon >= siliconCost && hair >= hairCost && algae >= puttyCost
export const costTransform = (state, quantity) => {
  const siliconRequired = siliconCost * quantity
  const puttyRequired = puttyCost * quantity
  const hairRequired = hairCost * quantity
  let { silicon, cash } = state
  if (toggleFlags.isOn(state.autoSilicon)) {
    const costOutcome = buySiliconTransform(state, siliconRequired - state.silicon)
    silicon = costOutcome.silicon
    cash = costOutcome.cash
  }
  if (!toggleFlags.isOn(state.autoPutty)) { throw new Error('Auto putty is off, cannot apply cost') }
  const { algae } = algaeToPuttyTransform(state, puttyRequired)
  return {
    silicon: silicon - siliconRequired,
    cash,
    algae,
    hair: state.hair - hairRequired
  }
}
export const cost = () => `${puttyCost} putty, ${siliconCost} silicon, ${hairCost} hair`
export const resourceMax = (state) =>
  Math.floor(Math.min(
    state.hair / hairCost,
    (state.silicon + maxBuySilicon(state)) / siliconCost,
    maxPutty(state) / puttyCost
  ))

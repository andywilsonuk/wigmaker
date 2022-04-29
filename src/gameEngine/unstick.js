import { allowed } from '../fabrication/hairWigMakeCost'
import { unstickId } from '../incidents/incidentIds'
import { StartIncident } from '../incidents/incidentManager'
import { buyHairAllowed } from '../make/hairMechanic'
import { repeatTimer } from '../utils/eventListeners'

let stuckSince = null

const CheckStuck = (state) => {
  if (state.wigs > 0 || state.incidentId !== null || allowed(state) || buyHairAllowed(state)) {
    stuckSince = null
    return state
  }
  if (stuckSince === null) {
    stuckSince = global.performance.now()
    return state
  }
  if (global.performance.now() - 10000 < stuckSince) {
    return state
  }

  return [StartIncident, unstickId]
}

export default () => repeatTimer(CheckStuck, 1000)

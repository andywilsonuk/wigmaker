import { allowed } from '../fabrication/hairWigMakeCost'
import { unstickId, vegansId } from '../incidents/incidentIds'
import { StartIncident } from '../incidents/incidentManager'
import { buyHairAllowed } from '../make/hairMechanic'
import { buySiliconAllowed } from '../make/siliconMechanic'
import { repeatTimer } from '../utils/eventListeners'

const delayBeforeAction = 10 * 1000
const algaeOrderId = 3
const smartOrderId = 4

let stuckSince = null

const CheckStuck = (state) => {
  const test1 = state.incidentId === null && state.wigs === 0 && !allowed(state) && !buyHairAllowed(state)
  const test2 = state.incidentId === null && state.wigsSmart === 0 && state.orders[smartOrderId] > 0 &&
    state.silicon < 5 && state.orders[algaeOrderId] === 0 && !buySiliconAllowed(state)

  if (!test1 && !test2) {
    stuckSince = null
    return state
  }
  if (stuckSince === null) {
    stuckSince = global.performance.now()
    return state
  }
  if (global.performance.now() - delayBeforeAction < stuckSince) {
    return state
  }

  return [StartIncident, test1 ? unstickId : vegansId]
}

export default () => repeatTimer(CheckStuck, 1000)

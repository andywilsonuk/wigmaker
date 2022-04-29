import { gridSabotageId } from './incidentIds'
import { initMessage, logTransform } from '../shared/logData'
import { incidentTransform } from './common'
import { powerSupplyId } from '../make/powerMechanic'
import lowPowerCheck from '../make/lowPowerCheck'
import { achievedLookup, milestone } from '../shared/milestones'
import { audioIds, enqueueAudio } from '../audio'
import { save } from '../state/statePersister'

const logMessage = initMessage('3D', 'Reduced power supply')

const removeOneFromSupply = (powerSupply) => {
  let hasRemoved = false
  return powerSupply.filter((s) => {
    if ((s === powerSupplyId.initial || s === powerSupplyId.grid) && !hasRemoved) {
      hasRemoved = true
      return false
    }
    return true
  })
}

export const ReduceGridSupply = (state) => [{
  ...state,
  achieved: achievedLookup.include(state.achieved, milestone.inititalGridDestroyed),
  powerSupply: removeOneFromSupply(state.powerSupply),
  ...incidentTransform(state),
  ...logTransform(state, logMessage)
}, lowPowerCheck(), enqueueAudio(audioIds.button), save()]

export default {
  id: gridSabotageId,
  title: 'Sabotage',
  description: ['Supply line to power grid severed.'],
  actions: [
    [ReduceGridSupply, 'Continue']
  ],
  allowed: (state) => state.powerSupply.length > 2 && state.powerSupply.filter((s) => s === powerSupplyId.initial || s === powerSupplyId.grid).length > 0
}

import { initMessage, logTransform } from '../shared/logData'
import { Chance } from '../utils/random'
import { incidentOutcome, incidentTransform } from './common'
import { makeFailId } from './incidentIds'

// deprecated

const restartNoRepairLog = initMessage('3w', 'The restart works, better keep fingers crossed')
const restartThenRepairLog = initMessage('3y', 'The restart fails, costs double to repair')
const repairLog = initMessage('3x', 'Safety first; repairs complete')

const repairCost = 2000

export const RestartNoRepair = (state) => incidentOutcome({
  ...state,
  ...incidentTransform(state),
  ...logTransform(state, restartNoRepairLog)
})

export const RestartThenRepair = (state) => incidentOutcome({
  ...state,
  cash: state.cash - repairCost,
  ...incidentTransform(state),
  ...logTransform(state, restartThenRepairLog)
})

export const Repair = (state) => incidentOutcome({
  ...state,
  cash: state.cash - repairCost * 0.5,
  ...incidentTransform(state),
  ...logTransform(state, repairLog)
})

export default {
  id: makeFailId,
  title: 'Cough, cough, splutter',
  description: ['Machinery stalls due to lack of maintenance.'],
  actions: [[Chance(50, RestartNoRepair, RestartThenRepair), 'Restart machinery'], [Repair, 'Halt to make repairs']],
  allowed: (state) => state.cash > repairCost
}

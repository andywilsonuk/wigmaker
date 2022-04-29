import { stockCheckId } from './incidentIds'
import { initMessage, logTransform } from '../shared/logData'
import { incidentOutcome, incidentTransform } from './common'
import { Chance, ChanceInt } from '../utils/random'

const stockLevelLog = initMessage('3I', 'Stock levels updated')

export const NylonIncrease = (state, increase) => incidentOutcome({
  ...state,
  nylon: state.nylon + increase,
  ...incidentTransform(state),
  ...logTransform(state, stockLevelLog)
})

export const SiliconIncrease = (state, increase) => incidentOutcome({
  ...state,
  silicon: state.silicon + increase,
  ...incidentTransform(state),
  ...logTransform(state, stockLevelLog)
})

export default {
  id: stockCheckId,
  title: 'Stock check',
  description: ['Recent stock check reports additional units.'],
  actions: [
    [Chance(50,
      ChanceInt(NylonIncrease, 200, 800),
      ChanceInt(SiliconIncrease, 200, 800)), 'Update stock values']
  ]
}

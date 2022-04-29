import { nylonTransferId } from './incidentIds'
import { initMessage, logTransform } from '../shared/logData'
import { incidentOutcome, incidentTransform } from './common'
import { fiveHundredMillion } from '../shared/bigNumbers'

const dealLog = initMessage('3r', 'Nylon transferred to stores')

const addedNylon = fiveHundredMillion

export const NylonTransfer = (state) => incidentOutcome({
  ...state,
  nylon: state.nylon + addedNylon,
  ...incidentTransform(state),
  ...logTransform(state, dealLog)
})

export default {
  id: nylonTransferId,
  title: 'Politician comes good',
  description: ['“Mistake” by supply results in large nylon delivery'],
  actions: [
    [NylonTransfer, 'Assume it was a gift'],
    [NylonTransfer, 'Thank the supplier']
  ]
}

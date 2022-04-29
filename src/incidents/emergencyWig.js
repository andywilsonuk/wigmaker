import { emergencyWigId } from './incidentIds'
import { initMessage, logTransform } from '../shared/logData'
import wigStockReductionTransform from '../utils/wigStockReductionTransform'
import { incidentOutcome, incidentTransform, JustLog, WhenWigs } from './common'
import { cashString } from '../utils/humanize'

const cashPayback = 2500

const gratitudeLog = initMessage('3B', `As a token of their gratitude they pay ${cashString(cashPayback)}`)
const ignoreLog = initMessage('3C', 'The request is ignored, perhaps that was an unwise move')

export const Dispatch = (state) => incidentOutcome({
  ...state,
  ...wigStockReductionTransform(state, 1),
  cash: state.cash + cashPayback,
  ...incidentTransform(state),
  ...logTransform(state, gratitudeLog)
})

export default {
  id: emergencyWigId,
  title: 'Emergency dispatch',
  description: ['Celebrity needs wig for opening night.', 'They are willing to pay a premium for it.'],
  actions: [
    [WhenWigs(Dispatch), 'Dispatch wig'],
    [[JustLog, ignoreLog], 'Ignore the request']],
  allowed: ({ wigs }) => wigs >= 1
}

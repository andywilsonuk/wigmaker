import { protestersId } from './incidentIds'
import { initNews, logTransform } from '../shared/logData'
import { Chance, ChanceRange } from '../utils/random'
import wigStockReductionTransform from '../utils/wigStockReductionTransform'
import { incidentOutcome, incidentTransform, JustLog, WhenWigs } from './common'
import { percentOfTotalInt } from '../utils/math'
import { achievedLookup, research } from '../shared/milestones'

const peacefulLog = initNews('3J', 'Peaceful protest at wig maker ends')
const nastyLog = initNews('3K', 'Protest turns nasty at wig maker as heavy handed police make arrests')
const nastyOutcome = [JustLog, nastyLog]

export const PeacefulEnd = (state, percentReduction) => incidentOutcome({
  ...state,
  ...wigStockReductionTransform(state, percentOfTotalInt(state.wigs, percentReduction)),
  ...incidentTransform(state),
  ...logTransform(state, peacefulLog)
})

export default {
  id: protestersId,
  title: 'Protesters',
  description: ['A large group of protesters has arrived with placards raised high.', 'Placards refer to toxic algae blooms.'],
  actions: [
    [Chance(75, WhenWigs(ChanceRange(PeacefulEnd, 1, 20), nastyOutcome), nastyOutcome), 'Offer free wigs'],
    [nastyOutcome, 'Dispel the dissidents']
  ],
  allowed: ({ achieved, wigs }) => achievedLookup.has(achieved, research.algaeIncubator) && wigs >= 1000
}

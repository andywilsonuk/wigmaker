import { raidId } from './incidentIds'
import { initNews, logTransform } from '../shared/logData'
import { ChanceRange } from '../utils/random'
import wigStockReductionTransform from '../utils/wigStockReductionTransform'
import { incidentOutcome, incidentTransform, JustLog, WhenWigs } from './common'
import { percentOfTotalInt } from '../utils/math'

const raidedLog = initNews('3e', 'Raid reported at wig maker, no one was available for comment')

export const Raided = (state, lossPercent) => incidentOutcome({
  ...state,
  ...wigStockReductionTransform(state, percentOfTotalInt(state.wigs, lossPercent)),
  ...incidentTransform(state),
  ...logTransform(state, raidedLog)
})

export default {
  id: raidId,
  title: 'It’s a raid!',
  description: ['People with guns arrive demanding wig stock.'],
  actions: [
    [WhenWigs(ChanceRange(Raided, 5, 50), [JustLog, raidedLog]), 'Allow the raid'],
    [WhenWigs(ChanceRange(Raided, 5, 50), [JustLog, raidedLog]), 'Run for it!']
  ],
  allowed: ({ wigs }) => wigs >= 100
}

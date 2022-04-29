import { bulkSaleId } from './incidentIds'
import { initMessage, logTransform } from '../shared/logData'
import wigStockReductionTransform from '../utils/wigStockReductionTransform'
import { incidentOutcome, incidentTransform, JustLog, WhenWigs } from './common'
import { cashString } from '../utils/humanize'
import { brandUpdateForSalesTransform } from '../market/fulfillment'

const pricePerWig = 45
const leaveHappyLog = initMessage('3z', 'Customer leaves happy, promises to tell friends')
const sellNoneLog = initMessage('3A', 'Customer leaves disappointed')

export const BulkSell = (state, percent) => incidentOutcome({
  ...state,
  ...wigStockReductionTransform(state, Math.floor(state.wigs * percent)),
  ...brandUpdateForSalesTransform(state, Math.floor(state.wigs * percent)),
  cash: state.cash + (Math.floor(state.wigs * percent) * pricePerWig),
  ...incidentTransform(state),
  ...logTransform(state, leaveHappyLog)
})

export default {
  id: bulkSaleId,
  title: 'Bulk sale',
  description: [`Offer received to bulk buy wigs for ${cashString(pricePerWig)} each.`],
  actions: [
    [WhenWigs([BulkSell, 1]), 'Sell all'],
    [WhenWigs([BulkSell, 0.5]), 'Sell 50%'],
    [[JustLog, sellNoneLog], 'Sell none']
  ],
  allowed: ({ wigs }) => wigs >= 20
}

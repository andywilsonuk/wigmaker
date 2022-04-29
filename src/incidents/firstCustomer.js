import { firstCustomerId } from './incidentIds'
import { initMessage, logTransform } from '../shared/logData'
import wigStockReductionTransform from '../utils/wigStockReductionTransform'
import { incidentOutcome, incidentTransform, WhenWigs } from './common'
import { cashString } from '../utils/humanize'
import { brandUpdateForSalesTransform } from '../market/fulfillment'

const pricePerWig = 10
const leaveHappyLog = initMessage('3a', 'Customer leaves happy, promises to tell friends')

export const SellAllToFirstCustomer = (state) => incidentOutcome({
  ...state,
  ...wigStockReductionTransform(state, state.wigs),
  cash: state.cash + (state.wigs * pricePerWig),
  ...brandUpdateForSalesTransform(state, state.wigs),
  ...incidentTransform(state),
  ...logTransform(state, leaveHappyLog)
})

export default {
  id: firstCustomerId,
  title: 'Sold!',
  description: [`Customer arrives, wishes to buy wig stock for ${cashString(pricePerWig)} a wig.`],
  actions: [
    [WhenWigs(SellAllToFirstCustomer), 'Sell all']
  ]
}

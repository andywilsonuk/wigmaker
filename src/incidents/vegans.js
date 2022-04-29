import { vegansId } from './incidentIds'
import { initMessage, initNews, logTransform } from '../shared/logData'
import { incidentOutcome, incidentTransform, JustLog } from './common'
import { cashString } from '../utils/humanize'
import { brandUpdateForSalesTransform } from '../market/fulfillment'

const quantity = 200
const cashPayback = 550

const gratitudeLog = initMessage('3F', `Conference is a roaring success. ${cashString(cashPayback * quantity)} credited`)
const ignoreLog = initNews('3G', 'Vegans denied wigs')

export const SellWigsToVegan = (state) => incidentOutcome({
  ...state,
  wigs: state.wigs - quantity,
  wigsAlgae: state.wigsAlgae - quantity,
  ...brandUpdateForSalesTransform(state, quantity),
  cash: state.cash + cashPayback * quantity,
  ...incidentTransform(state),
  ...logTransform(state, gratitudeLog)
})

export default {
  id: vegansId,
  title: 'Conference of vegans',
  description: ['Natural wigs needed for vegan conference.', `${quantity} algae-based wigs are needed and offer ${cashString(cashPayback)} each.`],
  actions: [
    [SellWigsToVegan, 'Sell wigs'],
    [[JustLog, ignoreLog], 'Ignore the request']],
  allowed: ({ wigsAlgae }) => wigsAlgae >= quantity
}

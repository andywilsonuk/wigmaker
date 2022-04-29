import { unstickId } from './incidentIds'
import { initMessage, logTransform } from '../shared/logData'
import { incidentOutcome, incidentTransform } from './common'
import wigOrderEnum from '../market/wigOrderEnum'
import { buyHairCostRaw } from '../make/hairMechanic'

const unstickLog = initMessage('3o', 'The gift is small but sufficient')
export const Unstick = (state) => incidentOutcome({
  ...state,
  cash: state.cash + Math.max(500, buyHairCostRaw(state) * 2),
  orders: state.orders.map((o, index) => (index === wigOrderEnum.hair ? o + 1 : o)),
  ...incidentTransform(state),
  ...logTransform(state, unstickLog)
})

export default {
  id: unstickId,
  title: 'Gift from a friend',
  description: ['Just a little bit of money to help out a friend.'],
  actions: [[Unstick, 'Accept']]
}

import { freeWigsId } from './incidentIds'
import { initMessage, logTransform } from '../shared/logData'
import wigStockReductionTransform from '../utils/wigStockReductionTransform'
import { incidentOutcome, incidentTransform, JustLog, WhenWigs } from './common'
import { Chance } from '../utils/random'

const noBrandLog = initMessage('3h', 'Crowd leaves with thanks')
const brandLog = initMessage('3i', 'Brand improved owing to generosity')
const showDoor = initMessage('3s', 'Show them the door')

export const BrandIncrease = (state) => incidentOutcome({
  ...state,
  ...wigStockReductionTransform(state, Math.min(state.wigs, 5)),
  brand: state.brand + 350,
  ...incidentTransform(state),
  ...logTransform(state, brandLog)
})

export const NoBrandIncrease = (state) => incidentOutcome({
  ...state,
  ...wigStockReductionTransform(state, Math.min(state.wigs, 5)),
  ...incidentTransform(state),
  ...logTransform(state, noBrandLog)
})

export default {
  id: freeWigsId,
  title: 'Free loaders',
  description: ['No way to pay but a desire for wigs.'],
  actions: [
    [WhenWigs(Chance(80, BrandIncrease, NoBrandIncrease)), 'Offer complementary wigs'],
    [[JustLog, showDoor], 'Show them the door']
  ],
  allowed: ({ wigs }) => wigs >= 20
}

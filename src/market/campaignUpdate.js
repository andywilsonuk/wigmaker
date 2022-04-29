import dataProvider from '../shared/dataProvider'
import { initMessage, logTransform } from '../shared/logData'

const completedLog = initMessage('4f', 'Campaign ends')
const Completed = (state) => {
  const campaign = dataProvider.getById(state.campaignRunning.id)
  return {
    ...state,
    campaignRunning: {
      ...state.campaignRunning,
      brandIncrease: campaign.brand * (state.campaignRunning.uplifted ?? 1),
      complete: true,
      progress: campaign.duration * (state.campaignRunning.uplifted ?? 1)
    },
    ...logTransform(state, completedLog)
  }
}

const iterate = (state, progress, brandIncrease) => ({
  ...state,
  campaignRunning: { ...state.campaignRunning, progress, brandIncrease }
})

export default (state, deltaTime) => {
  const { campaignRunning } = state
  if (campaignRunning == null) { return state }
  if (campaignRunning.complete) { return state }

  let { progress } = campaignRunning
  const { duration, brand } = dataProvider.getById(campaignRunning.id)
  const durationPlusUplift = duration * (campaignRunning.uplifted ?? 1)

  progress += deltaTime

  if (progress >= durationPlusUplift) {
    return Completed(state)
  }

  const brandIncrease = (brand / duration) * progress
  return iterate(state, progress, brandIncrease)
}

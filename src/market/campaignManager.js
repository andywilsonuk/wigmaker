import toggleFlags from '../utils/toggleFlags'
import { CampaignRealizeBrand, CampaignStart, UpliftCampaign } from './campaignMechanic'

export default (state) => {
  if (!toggleFlags.isOn(state.autoCampaign)) { return state }

  const { campaignRunning } = state

  if (campaignRunning === null) {
    for (let index = 0; index < state.campaigns.length; index += 1) {
      const { id } = state.campaigns[index]
      const resultantState = CampaignStart(state, id, true)
      if (resultantState !== state) { return resultantState }
    }
    return state
  }
  if (campaignRunning.uplifted == null) { return [UpliftCampaign, true] }

  return [CampaignRealizeBrand, true]
}

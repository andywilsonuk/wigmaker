import { microCostTransform } from "../utils/cost"
import { allowedCheck } from "../utils/hyperAppHelpers"
import outcomeHandler from "../shared/outcomeHandler"
import toggleFlags from "../utils/toggleFlags"
import { audioIds, enqueueAudio } from "../audio"
import dataProvider from "../shared/dataProvider"
import Memorization from "../utils/memorization"
import { labelWithCost } from "../utils/humanize"

export const campaignAllowed = (state, campaign) => state.campaignRunning === null && state.cash >= campaign.allowCash

export const CampaignStart = (state, id, auto) => {
  if (state.campaignRunning !== null) { return state }

  const { allowCash } = dataProvider.getById(id)
  if (state.cash < allowCash) { return state }

  return [{
    ...state,
    campaignRunning: { id, progress: 0, brandIncrease: 0, complete: false },
    cash: state.cash - allowCash,
  }, !auto && enqueueAudio(audioIds.button)]
}

export const CampaignRealizeBrand = (state, auto) => (state.campaignRunning === null || !state.campaignRunning.complete
  ? state
  : [{
    ...state,
    campaignRunning: null,
    brand: state.brand + Math.floor(state.campaignRunning.brandIncrease),
    campaigns: state.campaigns.filter((c) => c.id !== state.campaignRunning.id),
    campaignUpliftIteration: state.campaignUpliftIteration + (state.campaignRunning.uplifted === undefined ? 0 : 1),
  }, outcomeHandler(dataProvider.getById(state.campaignRunning.id)), !auto && enqueueAudio(audioIds.button)])

const microCost = (level) => Math.floor(30 * Math.exp(level / 3))
const microCostMemo = new Memorization(microCost)

export const upliftBuyLabel = ({ campaignUpliftIteration }) => labelWithCost("Uplift modelling", `${microCostMemo.get(campaignUpliftIteration)} micro`)

const upliftValue = ({ campaignRunning: { progress, uplifted } }, campaign) => {
  if (uplifted !== undefined) { return uplifted }
  const current = (progress / campaign.duration) * 100
  const uplift = Math.min(50, Math.floor(62 * ((1 / Math.abs(25 - current + 1)) ** 0.3)))
  return 1 + (uplift / 100)
}

const UpliftCampaignActual = (state, auto) => [{
  ...state,
  ...microCostTransform(state.micro, state.microBio, microCostMemo.get(state.campaignUpliftIteration)),
  campaignRunning: {
    ...state.campaignRunning,
    uplifted: auto ? 1.5 : upliftValue(state, dataProvider.getById(state.campaignRunning.id)),
  },
}, !auto && enqueueAudio(audioIds.button)]

export const upliftAllowed = ({ campaignRunning, campaignUpliftIteration, micro, microBio }) =>
  campaignRunning !== null
  && !campaignRunning.complete
  && campaignRunning.uplifted === undefined
  && micro + microBio >= microCostMemo.get(campaignUpliftIteration)

export const UpliftCampaign = (_, auto) => allowedCheck(upliftAllowed, UpliftCampaignActual, auto)

export const ToggleAutoCampaign = (state) => [{
  ...state,
  autoCampaign: toggleFlags.toggle(state.autoCampaign),
}, enqueueAudio(audioIds.toggle)]

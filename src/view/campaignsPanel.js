import { h } from '../hyperapp'
import { CampaignStart, CampaignRealizeBrand, UpliftCampaign, campaignAllowed, upliftAllowed, ToggleAutoCampaign, upliftBuyLabel } from '../market/campaignMechanic'
import { actionButton, container, flexRow, list, listItem, panel, plainSpan, plainSpanWithCost, styledSpan, toggle } from '../viewComponents'
import dataProvider from '../shared/dataProvider'
import { compact2dpString, percentString } from '../utils/humanize'
import { achievedLookup, research } from '../shared/milestones'
import toggleFlags from '../utils/toggleFlags'

const progressIncrements = [...Array(15).keys()].map((i) => i * 0.1)

const campaignProgressIncrement = (increment, current) =>
  h('div', {
    key: increment,
    'aria-hidden': 'true',
    class: {
      campaignProgressBarIncrement: true,
      campaignProgressBarFilled: current > increment,
      campaignProgressBarFilledCurrent: current > increment && current < increment + 0.1
    }
  })

const campaignProgressIncrements = (current) => progressIncrements.map((i) => campaignProgressIncrement(i, current))
const campaignProgress = (current) =>
  container({
    class: 'campaignProgressBar',
    role: 'progressbar',
    'aria-valuenow': percentString(current),
    'aria-valuemin': percentString('0'),
    'aria-valuemax': percentString(current > 1 ? 1.5 : 1)
  },
  campaignProgressIncrements(current))

const campaignRunningItem = (state, { title, duration }, { progress, brandIncrease, complete, uplifted }) => [
  container({ class: 'campaignsBet' }, []),
  plainSpan(title),
  container({ class: 'campaignsProgress' }, campaignProgress(progress / duration)),
  flexRow([
    plainSpan(`Brand opportunity: ${compact2dpString(brandIncrease)}`),
    container({ class: 'campaignsRealize' }, actionButton('Realize', CampaignRealizeBrand, complete))
  ]),
  achievedLookup.has(state.achieved, research.microCompute) &&
    (uplifted
      ? container({ class: 'marginTopHalf' }, [
        plainSpan('Uplift projection:'),
        styledSpan('campaignUpliftPercent', percentString(uplifted - 1))
      ])
      : container(actionButton(upliftBuyLabel(state), UpliftCampaign, upliftAllowed(state))))
]

const campaignAvailableItem = ({ id, title, cost }, allowed) => [
  container({ class: 'campaignsBet' }, actionButton('Start', [CampaignStart, id], allowed)),
  plainSpanWithCost(title, cost)
]

const campaignItem = (state, { id }, campaign, isRunning, campaignRunningProgress) =>
  listItem(
    id,
    isRunning ? campaignRunningItem(state, campaign, campaignRunningProgress) : campaignAvailableItem(campaign, campaignAllowed(state, campaign))
  )

export default (state) => panel('Campaigns', [
  state.campaigns.length === 0
    ? container(plainSpan('None available'))
    : list({ class: 'campaignsList' },
      state.campaigns.map((campaignState) => campaignItem(
        state,
        campaignState,
        dataProvider.getById(campaignState.id),
        state.campaignRunning?.id === campaignState.id,
        state.campaignRunning ?? {}
      ))),
  toggleFlags.isAvailable(state.autoCampaign) && container({ class: 'marginTop' }, toggle('Campaign Manager', state.autoCampaign, ToggleAutoCampaign))
])

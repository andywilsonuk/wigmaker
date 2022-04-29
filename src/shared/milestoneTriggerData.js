import { campaign, notion, milestone, research } from './milestones'
import { firstCustomerId, nylonBuyId, nylonTransferId, warId } from '../incidents/incidentIds'
import { initMessage, initNews } from './logData'
import { InitVogue } from '../market/vogueMechanic'
import { brandRequiredForTrends, TrendsEnabled, TrendsVisible } from '../market/trendsMechanic'
import { StartIncident } from '../incidents/incidentManager'
import { actionSwitchFabsLevel2 } from '../make/fabricatorMechanic'

export default [{
  id: milestone.manufacture,
  trigger: ({ wigsMade }) => wigsMade >= 3,
  log: initMessage('6a', 'An admirable piece of craftsmanship')
}, {
  id: milestone.firstCustomer,
  trigger: ({ wigsMade }) => wigsMade >= 6,
  action: [StartIncident, firstCustomerId]
}, {
  id: milestone.notions,
  trigger: ({ wigsMade }) => wigsMade >= 8,
  log: initMessage('6b', 'Ideas bubble as wigs form')
}, {
  id: milestone.nylonBuyEarly,
  trigger: ({ wigsMade }) => wigsMade > 120,
  milestones: [notion.nylonWigs, campaign.socialMedia],
  action: [StartIncident, nylonBuyId]
}, {
  id: milestone.vogue,
  trigger: ({ wigsMade, brand }) => brand >= 1200 && wigsMade >= 150,
  milestones: [notion.marketing],
  action: InitVogue,
  log: initNews('6c', 'Wigs set to come into vogue')
}, {
  id: milestone.trendsVisible,
  trigger: ({ brand }) => brand >= 5000,
  milestones: [notion.marketing],
  action: TrendsVisible,
  log: initMessage('6d', 'Branding starts to become influential')
}, {
  id: milestone.trendsEnabled,
  trigger: ({ brand }) => brand >= brandRequiredForTrends,
  milestones: [milestone.vogue],
  action: TrendsEnabled,
  log: initMessage('6e', 'Brand strong enough for trend setting')
}, {
  id: milestone.bribes,
  trigger: ({ brand }) => brand >= 5000,
  milestones: [campaign.politicalInfluencers],
  log: initNews('6f', 'Hat sales struggle, wigs on the up')
}, {
  id: milestone.war,
  trigger: ({ wigsMade, bribes }) => bribes >= 5 && wigsMade >= 10000,
  milestones: [notion.siliconeWigs],
  action: [StartIncident, warId]
}, {
  id: milestone.hatDrop,
  trigger: ({ wigsMade }) => wigsMade >= 180000,
  milestones: [research.storage],
  log: initNews('6h', 'Hat wearing sees big drop')
}, {
  id: milestone.nylonTransfer,
  trigger: ({ wigsMade }) => wigsMade >= 250000,
  milestones: [milestone.war, research.storage],
  action: [StartIncident, nylonTransferId]
}, {
  id: milestone.fabQuantitySwitchNewLevel,
  trigger: ({ fabricators }) => fabricators >= actionSwitchFabsLevel2,
  log: initMessage('6g', 'Additional fabricator bulk action quantity available')
}]

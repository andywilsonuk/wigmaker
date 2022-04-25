import fulfillment from "../market/fulfillment"
import CampaignVisibilityCheck from "../market/campaignVisibilityCheck"
import CampaignUpdate from "../market/campaignUpdate"
import MilestoneTriggersCheck from "../shared/milestoneTriggersCheck"
import { MakeHandmadeUpdate } from "../fabrication/handmadeWig"
import { BoostUpdate } from "../make/boostMechanic"
import Fabricating from "../fabrication/fabricating"
import { AutoMakeWigSwitch } from "../fabrication/autoMakeWigSwitcher"
import IncidentSelector from "../incidents/incidentManager"
import Demand from "../market/demand"
import MeshUpdate from "../mesh/meshUpdate"
import { AutoInstall, Commissioning } from "../mesh/dataCenterMechanic"
import { OpportunityProgressUpdate, OpportunityVisibilityCheck } from "../mesh/opportunityMechanic"
import { AlgaePoolUpdate } from "../make/algaeMechanic"
import { VogueUpdate } from "../market/vogueMechanic"
import { PuttyRateCounter } from "../make/synapticPuttyMechanic"
import { TrendUpdate } from "../market/trendsMechanic"
import { ResearchUpdate, ResearchVisibilityCheck } from "../research/researchMechanic"
import { StrandsUpdate } from "../research/strandsMechanic"
import CampaignManager from "../market/campaignManager"

const perSecondJobs = [
  fulfillment,
  AutoMakeWigSwitch,
  CampaignVisibilityCheck,
  MilestoneTriggersCheck,
  ResearchVisibilityCheck,
  OpportunityVisibilityCheck,
  CampaignManager,
  AutoInstall,
]
const perFrameJobs = [
  Demand,
  BoostUpdate,
  CampaignUpdate,
  MakeHandmadeUpdate,
  ResearchUpdate,
  Fabricating,
  IncidentSelector,
  VogueUpdate,
  StrandsUpdate,
  TrendUpdate,
  AlgaePoolUpdate,
  PuttyRateCounter,
  MeshUpdate,
  Commissioning,
  OpportunityProgressUpdate,
]

const perSecondJobInterval = 1000 / perSecondJobs.length
let perSecondJobIndex = 0
let perSecondJobAccumulation = 0

export default (dispatch, deltaTime) => {
  perSecondJobAccumulation += deltaTime
  if (perSecondJobAccumulation >= perSecondJobInterval) {
    dispatch(perSecondJobs[perSecondJobIndex])
    perSecondJobAccumulation -= perSecondJobInterval
    perSecondJobIndex = (perSecondJobIndex + 1) % perSecondJobs.length
  }

  for (let i = 0; i < perFrameJobs.length; i += 1) {
    dispatch([perFrameJobs[i], deltaTime])
  }
}

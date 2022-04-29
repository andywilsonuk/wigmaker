import { achievedLookup, milestone, opportunity, research } from '../shared/milestones'
import bulkSale from './bulkSale'
import emergencyWig from './emergencyWig'
import evacuate from './evacuate'
import fire from './fire'
import firstCustomer from './firstCustomer'
import freeWigs from './freeWigs'
import gridSabotage from './gridSabotage'
import hacked from './hacked'
import jailedPolitician from './jailedPolitician'
import makeFail from './makeFail'
import nylonBuy from './nylonBuy'
import nylonTransfer from './nylonTransfer'
import payLater from './payLater'
import protesters from './protesters'
import raided from './raided'
import stockCheck from './stockCheck'
import survey from './survey'
import theft from './theft'
import theft2 from './theft2'
import trade from './trade'
import unstick from './unstick'
import vegans from './vegans'
import war from './war'

const wigsMade750 = [
  freeWigs,
  payLater
]
const wigsMade10K = [
  bulkSale,
  freeWigs,
  payLater,
  trade
]
const wigsMadePreWar = [
  evacuate,
  raided,
  stockCheck,
  theft
]
const warStarted = [
  emergencyWig,
  fire,
  gridSabotage,
  hacked,
  stockCheck,
  vegans
]
const postMesh = [
  theft2,
  emergencyWig,
  gridSabotage,
  hacked,
  jailedPolitician,
  protesters
]
const endgame = [
  theft2,
  gridSabotage,
  hacked,
  protesters,
  survey
]

const triggered = [
  firstCustomer,
  nylonTransfer,
  unstick,
  war,
  makeFail, // deprecated
  nylonBuy
]
export const incidentsList = Array.from(new Set(triggered
  .concat(wigsMade750)
  .concat(wigsMade10K)
  .concat(wigsMadePreWar)
  .concat(warStarted)
  .concat(postMesh)
  .concat(endgame)))

const idToIncidentMap = new Map(incidentsList.map((x) => [x.id, x]))
export const getIncident = (id) => idToIncidentMap.get(id)

export const gatedIncidents = ({ wigsMade, achieved }) => {
  if (wigsMade < 300) { return [] }
  if (wigsMade < 750) { return wigsMade750 }
  if (wigsMade < 10000) { return wigsMade10K }
  if (!achievedLookup.has(achieved, milestone.warStarted)) { return wigsMadePreWar }
  if (!achievedLookup.has(achieved, milestone.inititalGridDestroyed)) { return [gridSabotage] }
  if (!achievedLookup.has(achieved, research.mesh)) { return warStarted }
  if (!achievedLookup.has(achieved, research.smartWigs)) { return postMesh }
  if (!achievedLookup.has(achieved, opportunity.wipeAwayCompetitors)) { return endgame }
  return []
}

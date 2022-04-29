import dataProvider from '../shared/dataProvider'
import outcomeHandler from '../shared/outcomeHandler'
import { getIncident } from '../incidents/incidentsData'
import { StartIncident } from '../incidents/incidentManager'
import orderedMilestones, { categories } from './orderedMilestones'
import { achievedLookup } from '../shared/milestones'
import { audioIds, enqueueAudio } from '../audio'

let expandedMilestones

window.requestAnimationFrame(() => {
  expandedMilestones = orderedMilestones()
})

export const ProgressTo = (state, progressToMilestoneId) => {
  const newState = { ...state }
  const outcomes = []

  for (let i = 0; i < expandedMilestones.length; i += 1) {
    const { id: milestoneId, category } = expandedMilestones[i]

    if (achievedLookup.has(newState.achieved, milestoneId)) { continue }

    const currentMilestone = dataProvider.getById(milestoneId)
    outcomes.push(currentMilestone)

    if (category === categories.notion || category === categories.research) {
      newState.research = newState.research.filter((x) => x.id !== milestoneId)
    } else if (category === categories.campaign) {
      newState.campaigns = newState.campaigns.filter((x) => x.id !== milestoneId)
      if (newState.campaignRunning?.id === milestoneId) {
        newState.campaignRunning = null
      }
      newState.brand += currentMilestone.brand ?? 0
    } else if (category === categories.opportunity && newState.opportunity?.id === milestoneId) {
      newState.opportunity = null
    } else if (currentMilestone.action !== undefined && Array.isArray(currentMilestone.action) && currentMilestone.action[0] === StartIncident) {
      outcomes.push({ id: milestoneId, action: getIncident(currentMilestone.action[1]).actions[0][0] })
    }

    if (milestoneId === progressToMilestoneId) { break }
  }

  return [{
    ...newState,
    incidentId: null
  }, enqueueAudio(audioIds.button)].concat(outcomes.map(outcomeHandler))
}

export const milestones = () => expandedMilestones
export const isAchieved = (state, id) => achievedLookup.has(state.achieved, id)
export const devToolsActive = window.location.hash === '#devtools'

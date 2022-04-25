import { gatedIncidents } from "./incidentsData"
import { randomInt } from "../utils/random"
import { save } from "../state/statePersister"
import { allowNav, navFlags } from "../shared/nav"
import { sceneTempFlags, setFlag } from "../shared/sceneTempFlags"
import { audioIds, enqueueAudio } from "../audio"

export const StartIncident = (state, id) => [{
  ...state,
  incidentId: id,
  incidentDue: null,
  incidentLast: id,
  nav: allowNav(state.nav, navFlags.make, navFlags.memo),
  sceneTemp: setFlag(state.sceneTemp, sceneTempFlags.gamePaused),
}, save(), enqueueAudio(audioIds.incident)]

const incidentDueTime = ({ wigsMade }) => (wigsMade < 250000 ? 20 : 30)
export const ScheduleNextIncident = (state) => ({
  ...state,
  incidentDue: incidentDueTime(state) * 60 * 1000,
})

const selectIncident = (state) => {
  const { incidentLast } = state
  const currentGroup = gatedIncidents(state)
  const viable = currentGroup.filter((x) => x.id !== incidentLast).filter((x) => x.allowed === undefined || x.allowed(state))

  if (viable.length === 0) { return null }

  const selectedIndex = randomInt(0, viable.length - 1)
  return viable[selectedIndex].id
}

export default (state, deltaTime) => {
  const { incidentId, incidentDue } = state
  if (incidentId !== null) { return state }
  if (incidentDue === null) { return ScheduleNextIncident }
  if (incidentDue <= 0) {
    const selectedIncidentId = selectIncident(state)
    return selectedIncidentId === null ? ScheduleNextIncident : [StartIncident, selectedIncidentId]
  }

  return {
    ...state,
    incidentDue: incidentDue - deltaTime,
  }
}

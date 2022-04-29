import { initMessage, logTransform } from '../shared/logData'
import { removeFlag, sceneTempFlags } from '../shared/sceneTempFlags'
import { audioIds, enqueueAudio } from '../audio'
import { save } from '../state/statePersister'

export const incidentTransform = (state) => ({
  incidentId: null,
  incidentDue: null,
  sceneTemp: removeFlag(state.sceneTemp, sceneTempFlags.gamePaused)
})

export const incidentOutcome = (state) => [state, enqueueAudio(audioIds.button), save()]

export const JustLog = (state, message) => incidentOutcome({
  ...state,
  ...incidentTransform(state),
  ...logTransform(state, message)
})

const noWigsLog = initMessage('3f', 'Not enough wigs')
export const WhenWigs = (whenAction, whenNotAction = [JustLog, noWigsLog]) =>
  (state) => (state.wigs === 0 ? whenNotAction : whenAction)

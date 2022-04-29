import dataProvider from '../shared/dataProvider'
import outcomeHandler from '../shared/outcomeHandler'
import { visualizationReset, visualizationUpdate } from './opportunityProgressVisual'
import criteriaCheck from '../utils/criteriaCheck'
import { audioIds, enqueueAudio } from '../audio'
import toggleFlags from '../utils/toggleFlags'

export const allowed = ({ opportunity }) => opportunity !== null && opportunity.progress === 0

export const Start = (state, { id }) => {
  if (!allowed(state)) { return state }
  return [{ ...state, opportunity: { id, progress: 0.0001, accumulation: 0 } }, visualizationReset(), enqueueAudio(audioIds.button)]
}

export const Completed = (state, opportunity) => [{
  ...state,
  opportunity: null
}, outcomeHandler(opportunity), visualizationReset()]

export const OpportunityProgressUpdate = (state, deltaTime) => {
  const { opportunity: opportunityState, compute } = state
  if (opportunityState === null) { return state }

  if (state.lowPower) { return [state, visualizationUpdate()] }

  let { progress, accumulation } = opportunityState
  if (progress === 0) { return [state, visualizationUpdate()] }

  const opportunity = dataProvider.getById(opportunityState.id)
  const { compute: computeRequired, duration } = opportunity
  const maxComputePerSecond = computeRequired / duration

  accumulation += Math.min(deltaTime * maxComputePerSecond, compute)
  const computeUsed = Math.floor(accumulation)

  if (computeUsed === 0) { return [state, visualizationUpdate()] }

  accumulation -= computeUsed
  progress += computeUsed

  if (progress > computeRequired) {
    return [Completed, opportunity]
  }

  return [{
    ...state,
    opportunity: { ...opportunityState, progress, accumulation },
    compute: compute - computeUsed
  }, visualizationUpdate(), compute - computeUsed === 0 && !toggleFlags.isOn(state.autoInstall) && enqueueAudio(audioIds.computeZero)]
}

export const OpportunityVisibilityCheck = (state) => {
  const { opportunity } = state
  if (opportunity !== null) { return state }

  const nodeCount = state.meshNodes
  if (nodeCount === 0) { return state }

  const newlyVisible = dataProvider.opportunities.filter((o) => criteriaCheck(state, o))
  if (newlyVisible.length === 0) { return state }
  return {
    ...state,
    opportunity: { id: newlyVisible[0].id, progress: 0 }
  }
}

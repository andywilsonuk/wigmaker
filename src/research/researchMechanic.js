import outcomeHandler from '../shared/outcomeHandler'
import { costTransform } from '../utils/cost'
import dataProvider from '../shared/dataProvider'
import { achievedLookup, notion } from '../shared/milestones'
import criteriaCheck from '../utils/criteriaCheck'
import { audioIds, enqueueAudio } from '../audio'

export const ResearchVisibilityCheck = (state) => {
  const newlyVisible = dataProvider.allResearch
    .filter(({ id }) => !state.research.some((n) => n.id === id))
    .filter((r) => criteriaCheck(state, r))
    .map(({ id }) => ({ id, remaining: 0 }))

  if (newlyVisible.length === 0) { return state }
  return {
    ...state,
    research: state.research.concat(newlyVisible)
  }
}

export const researchAllowed = (state, researchItemState, researchItem) =>
  researchItemState.id !== state.researchId && (researchItemState.remaining !== 0 || researchItem.allowed(state))

const ResearchStart = (state, { id, duration, allowCost }) => [{
  ...state,
  strandsOn: false,
  researchId: id,
  research: state.research.map((r) => (r.id === id ? { ...r, remaining: duration } : r)),
  ...costTransform(state, allowCost)
}, enqueueAudio(audioIds.button)]

export const ResearchResume = (state, research) => {
  const { id } = research
  if (id === state.researchId) { return state }
  const currentNotion = state.research.find((x) => x.id === id)

  if (currentNotion.remaining === 0) {
    if (!research.allowed(state)) { return state }
    return [ResearchStart, research]
  }
  return { ...state, strandsOn: false, researchId: id }
}

const ResearchComplete = (state, research) => [{
  ...state,
  researchId: null,
  research: state.research.filter((x) => x.id !== research.id)
}, outcomeHandler(research), enqueueAudio(audioIds.researchComplete)]

export const ResearchUpdate = (state, deltaTime) => {
  const { researchId } = state
  if (researchId === null) { return state }
  if (achievedLookup.has(state.achieved, notion.research) && state.lowPower) {
    return state
  }

  let { remaining } = state.research.find((x) => x.id === researchId)
  remaining -= deltaTime

  return (remaining <= 0)
    ? [ResearchComplete, dataProvider.getById(researchId)]
    : {
        ...state,
        research: state.research.map((n) => (n.id === researchId ? { ...n, remaining } : n))
      }
}

import { achievedLookup } from "../shared/milestones"

export default (state, { id, milestones, trigger }) =>
  !achievedLookup.has(state.achieved, id)
  && (trigger === undefined || trigger(state))
  && achievedLookup.hasAll(state.achieved, milestones)

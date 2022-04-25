import { saveToLocal } from "../state/statePersister"
import { logTransform } from "./logData"
import { achievedLookup, opportunity } from "./milestones"

const AddAchievement = (state, { id, log }) => ({
  ...state,
  achieved: achievedLookup.include(state.achieved, id),
  ...logTransform(state, log),
})

const outcomeHandlerEffect = (dispatch, outcome) => {
  if (outcome.action != null) {
    dispatch(outcome.action)
  }
  dispatch([AddAchievement, outcome])
  if (outcome.id !== opportunity.eradicateMilliners) { dispatch(saveToLocal) }
}

export default (props) => [outcomeHandlerEffect, props]

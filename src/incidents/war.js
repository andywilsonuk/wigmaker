import { warId } from "./incidentIds"
import { initNews, logTransform } from "../shared/logData"
import { incidentOutcome, incidentTransform } from "./common"
import { achievedLookup, milestone } from "../shared/milestones"

const rivalryLog = initNews("3b", "Rivalry between hat makers and wig makers turns to open conflict")
export const WarCommences = (state) => incidentOutcome({
  ...state,
  achieved: achievedLookup.include(state.achieved, milestone.warStarted),
  ...incidentTransform(state),
  incidentDue: 30 * 1000,
  ...logTransform(state, rivalryLog),
})

export default {
  id: warId,
  title: "From the Consortium of Milliners",
  description: ["That’s far enough.", "We can no longer tolerate this encroachment into our domain."],
  actions: [[WarCommences, "Continue"]],
}

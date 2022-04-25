import { surveyId } from "./incidentIds"
import { initMessage, logTransform } from "../shared/logData"
import { incidentOutcome, incidentTransform } from "./common"

const cashPaid = 20

const thanksLog = initMessage("3H", `Researchers send thanks and $${cashPaid}`)

export const CashPaid = (state) => incidentOutcome({
  ...state,
  cash: state.cash + cashPaid,
  ...incidentTransform(state),
  ...logTransform(state, thanksLog),
})

export default {
  id: surveyId,
  title: "Survey",
  description: ["Preference survey on hair style:"],
  actions: [
    [CashPaid, "Curly"],
    [CashPaid, "Straight"],
  ],
}

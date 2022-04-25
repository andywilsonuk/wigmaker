import { theft2Id } from "./incidentIds"
import { initMessage, logTransform } from "../shared/logData"
import { ChanceRange } from "../utils/random"
import wigStockReductionTransform from "../utils/wigStockReductionTransform"
import { incidentOutcome, incidentTransform, JustLog, WhenWigs } from "./common"
import { percentOfTotalInt } from "../utils/math"

const theftLog = initMessage("3O", "Nothing can be done to recover stolen wigs")

export const Theft2 = (state, lossPercent) => incidentOutcome({
  ...state,
  ...wigStockReductionTransform(state, percentOfTotalInt(state.wigs, lossPercent)),
  ...incidentTransform(state),
  ...logTransform(state, theftLog),
})

export default {
  id: theft2Id,
  title: "Theft",
  description: ["Fake identity used to steal large quantity of wigs."],
  actions: [
    [WhenWigs(ChanceRange(Theft2, 30, 75), [JustLog, theftLog]), "Continue"],
  ],
  allowed: ({ wigs }) => wigs >= 1000,
}

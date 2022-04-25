import { theftId } from "./incidentIds"
import { initMessage, logTransform } from "../shared/logData"
import { ChanceRange } from "../utils/random"
import wigStockReductionTransform from "../utils/wigStockReductionTransform"
import { incidentOutcome, incidentTransform, JustLog, WhenWigs } from "./common"
import { percentOfTotalInt } from "../utils/math"

const theftLog = initMessage("3p", "Thief remains elusive")
export const Theft = (state, lossPercent) => incidentOutcome({
  ...state,
  ...wigStockReductionTransform(state, percentOfTotalInt(state.wigs, lossPercent)),
  ...incidentTransform(state),
  ...logTransform(state, theftLog),
})

export default {
  id: theftId,
  title: "Stock levels lower than thought",
  description: ["A stocktake has found units missing."],
  actions: [
    [WhenWigs(ChanceRange(Theft, 1, 20), [JustLog, theftLog]), "Attempt to catch the thief"],
    [WhenWigs(ChanceRange(Theft, 1, 20), [JustLog, theftLog]), "Move on"]],
  allowed: ({ wigs }) => wigs >= 100,
}

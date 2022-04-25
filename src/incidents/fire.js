import { fireId } from "./incidentIds"
import { initNews, logTransform } from "../shared/logData"
import wigStockReductionTransform from "../utils/wigStockReductionTransform"
import { incidentOutcome, incidentTransform, JustLog, WhenWigs } from "./common"
import { ChanceRange } from "../utils/random"
import { percentOfTotalInt } from "../utils/math"

const fireLog = initNews("3q", "Fire at wig making facility, no one was available for comment")

export const FireDamage = (state, lossPercent) => incidentOutcome({
  ...state,
  ...wigStockReductionTransform(state, percentOfTotalInt(state.wigs, lossPercent)),
  ...incidentTransform(state),
  ...logTransform(state, fireLog),
})

export default {
  id: fireId,
  title: "Fire!",
  description: ["A small fire has broken out in the warehouse."],
  actions: [
    [WhenWigs(ChanceRange(FireDamage, 1, 80), [JustLog, fireLog]), "Evacuate"],
    [WhenWigs(ChanceRange(FireDamage, 20, 40), [JustLog, fireLog]), "Save the stock first"],
  ],
  allowed: ({ wigs }) => wigs >= 1000,
}

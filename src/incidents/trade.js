import { tradeId } from "./incidentIds"
import { incidentOutcome, incidentTransform, JustLog, WhenWigs } from "./common"
import { initMessage, logTransform } from "../shared/logData"
import wigStockReductionTransform from "../utils/wigStockReductionTransform"
import { brandUpdateForSalesTransform } from "../market/fulfillment"

const tradeSuccessLog = initMessage("3g", "A successful trade")
const buyNothingLog = initMessage("3u", "Trader leaves disappointed")

export const TradeHair = (state, rate) => incidentOutcome({
  ...state,
  ...wigStockReductionTransform(state, state.wigs),
  ...brandUpdateForSalesTransform(state, state.wigs),
  hair: state.hair + rate * state.wigs,
  ...incidentTransform(state),
  ...logTransform(state, tradeSuccessLog),
})

export const TradeNylon = (state, rate) => incidentOutcome({
  ...state,
  ...wigStockReductionTransform(state, state.wigs),
  ...brandUpdateForSalesTransform(state, state.wigs),
  nylon: state.nylon + rate * state.wigs,
  ...incidentTransform(state),
  ...logTransform(state, tradeSuccessLog),
})

export const TradeSilicon = (state, rate) => incidentOutcome({
  ...state,
  ...wigStockReductionTransform(state, state.wigs),
  ...brandUpdateForSalesTransform(state, state.wigs),
  silicon: state.silicon + rate * state.wigs,
  ...incidentTransform(state),
  ...logTransform(state, tradeSuccessLog),
})

export default {
  id: tradeId,
  title: "Market trader",
  description: ["Trader thinks there might be interest in exchange for wigs.", "Wants whole stock; offers choice of rates per wig."],
  actions: [
    [WhenWigs([TradeHair, 150]), "150 hair"],
    [WhenWigs([TradeNylon, 300]), "300 nylon"],
    [WhenWigs([TradeSilicon, 25]), "25 silicon"],
    [[JustLog, buyNothingLog], "Dismiss"],
  ],
  allowed: ({ wigs }) => wigs >= 2,
}

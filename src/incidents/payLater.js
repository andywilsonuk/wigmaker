import { payLaterId } from "./incidentIds"
import { Chance } from "../utils/random"
import { initMessage, logTransform } from "../shared/logData"
import wigStockReductionTransform from "../utils/wigStockReductionTransform"
import { incidentOutcome, incidentTransform, JustLog, WhenWigs } from "./common"
import { cashString } from "../utils/humanize"

const cashPayback = 350
const nylonPayback = 80

const paybackLog = initMessage("3j", `${cashString(cashPayback)} has been credited to the account`)
const noPaybackLog = initMessage("3k", "No cash has been forthcoming")
const tradeNoPaybackLog = initMessage("3l", "Wig taken, nothing offered")
const tradePaybackLog = initMessage("3m", `Wig swapped for ${nylonPayback} nylon`)
const turnThemAwayLog = initMessage("3v", "With a cure they depart")

export const GiftPaidBack = (state) => incidentOutcome({
  ...state,
  ...wigStockReductionTransform(state, 1),
  cash: state.cash + cashPayback,
  ...incidentTransform(state),
  ...logTransform(state, paybackLog),
})

export const GiftNotPaidBack = (state) => incidentOutcome({
  ...state,
  ...wigStockReductionTransform(state, 1),
  ...incidentTransform(state),
  ...logTransform(state, noPaybackLog),
})

export const TradePaidBack = (state) => incidentOutcome({
  ...state,
  ...wigStockReductionTransform(state, 1),
  nylon: state.nylon + nylonPayback,
  ...incidentTransform(state),
  ...logTransform(state, tradePaybackLog),
})

export const TradeNotPaidBack = (state) => incidentOutcome({
  ...state,
  ...wigStockReductionTransform(state, 1),
  ...incidentTransform(state),
  ...logTransform(state, tradeNoPaybackLog),
})

export default {
  id: payLaterId,
  title: "Wig request",
  description: ["Someone desperately needs a wig, promises to pay later."],
  actions: [
    [WhenWigs(Chance(80, GiftPaidBack, GiftNotPaidBack)), "Give wig"],
    [WhenWigs(Chance(80, TradePaidBack, TradeNotPaidBack)), "Suggest a trade"],
    [[JustLog, turnThemAwayLog], "Turn them away"]],
  allowed: ({ wigs }) => wigs >= 20,
}

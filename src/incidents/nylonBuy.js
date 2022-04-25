import { nylonBuyId } from "./incidentIds"
import { initMessage, logTransform } from "../shared/logData"
import { achievedLookup, notion } from "../shared/milestones"
import { incidentOutcome, incidentTransform, JustLog } from "./common"
import { cashString } from "../utils/humanize"

const dealLog = initMessage("3c", "A deal is made")
const noDealLog = initMessage("3d", "Too little cash, no deal")
const buyNothingLog = initMessage("3t", "Trader leaves disappointed")

const lowQuanity = { quantity: 100, price: 9 }
const highQuanity = { quantity: 500, price: 35 }

export const NylonBuy = (state, { quantity, price }) => incidentOutcome({
  ...state,
  nylon: state.nylon + quantity,
  cash: state.cash - price,
  ...incidentTransform(state),
  ...logTransform(state, dealLog),
})

export const NylonBuyCheck = (state, props) =>
  (state.cash >= props.price ? [NylonBuy, props] : [JustLog, noDealLog])

export default {
  id: nylonBuyId,
  title: "Nylon trading",
  description: ["“Quality nylon at bargain prices”"],
  actions: [
    [[NylonBuyCheck, lowQuanity], `Buy ${lowQuanity.quantity} @ ${cashString(lowQuanity.price)}`],
    [[NylonBuyCheck, highQuanity], `Buy ${highQuanity.quantity} @ ${cashString(highQuanity.price)}`],
    [[JustLog, buyNothingLog], "Buy nothing"],
  ],
}

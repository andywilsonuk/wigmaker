import { hackedId } from "./incidentIds"
import { initMessage, logTransform } from "../shared/logData"
import { incidentOutcome, incidentTransform } from "./common"
import { fabricatingIndex } from "../fabrication/fabricatingEnum"
import { percentOfTotalInt } from "../utils/math"
import { powerCostLast } from "../make/fabricatorMechanic"

const logMessage = initMessage("3E", "Fabrication capacity reduced")

export const ReduceWigFabsBySpecific = (state, quantity) => incidentOutcome({
  ...state,
  fabricating: state.fabricating.map((f, index) => (index === fabricatingIndex.wig ? { ...f, allocated: f.allocated - quantity } : f)),
  fabricators: state.fabricators - quantity,
  powerDemand: state.powerDemand - powerCostLast(state.fabricators, quantity),
  ...incidentTransform(state),
  ...logTransform(state, logMessage),
})

const ReduceWigFabs = (state) => [ReduceWigFabsBySpecific, percentOfTotalInt(state.fabricating[fabricatingIndex.wig].allocated, 10)]

export default {
  id: hackedId,
  title: "System hacked",
  description: ["Milliner attack contained and repelled.", "Affected fabricators inoperable."],
  actions: [
    [ReduceWigFabs, "Continue"],
  ],
  allowed: (state) => state.fabricating[fabricatingIndex.wig].allocated > 20,
}

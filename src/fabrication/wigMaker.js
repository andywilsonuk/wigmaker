import { fabricatingSubtype } from './fabricatingEnum'
import * as algaeWigMakeCost from './algaeWigMakeCost'
import * as hairWigMakeCost from './hairWigMakeCost'
import * as nylonWigMakeCost from './nylonWigMakeCost'
import * as siliconeWigMakeCost from './siliconeWigMakeCost'
import * as smartWigMakeCost from './smartWigMakeCost'

const levels = [
  7,
  5,
  2.5,
  1.25,
  0.8
].map((s) => s * 1000)
const costings = new Map([
  [fabricatingSubtype.hair, hairWigMakeCost],
  [fabricatingSubtype.nylon, nylonWigMakeCost],
  [fabricatingSubtype.silicone, siliconeWigMakeCost],
  [fabricatingSubtype.algae, algaeWigMakeCost],
  [fabricatingSubtype.smart, smartWigMakeCost]
])
const madeTransforms = new Map([
  [fabricatingSubtype.hair, (state, quantity) => ({ wigsHair: state.wigsHair + quantity })],
  [fabricatingSubtype.nylon, (state, quantity) => ({ wigsNylon: state.wigsNylon + quantity })],
  [fabricatingSubtype.silicone, (state, quantity) => ({ wigsSilicone: state.wigsSilicone + quantity })],
  [fabricatingSubtype.algae, (state, quantity) => ({ wigsAlgae: state.wigsAlgae + quantity })],
  [fabricatingSubtype.smart, (state, quantity) => ({ wigsSmart: state.wigsSmart + quantity })]
])

export const allowed = (state, subtype) => costings.get(subtype).allowed(state)
export const costTransform = (state, quantity, subtype) => costings.get(subtype).costTransform(state, quantity)
export const cost = (subtype) => costings.get(subtype).cost()
export const duration = ({ wigMakerLevel }) => levels[wigMakerLevel]
export const madeTransform = (state, quantity, subtype) => ({
  ...madeTransforms.get(subtype)(state, quantity),
  wigs: state.wigs + quantity,
  wigsMade: state.wigsMade + quantity
})
export const resourceMax = (state, subtype) => costings.get(subtype).resourceMax(state)

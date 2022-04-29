import { fabricatingSubtype } from './fabricatingEnum'
import * as microMakeCost from './microMakeCost'
import * as microBioMakeCost from './microBioMakeCost'

const makeTime = 35 * 1000

const costings = new Map([
  [fabricatingSubtype.micro, microMakeCost],
  [fabricatingSubtype.microBio, microBioMakeCost]
])
const madeTransforms = new Map([
  [fabricatingSubtype.micro, (state, quantity) => ({ micro: state.micro + quantity })],
  [fabricatingSubtype.microBio, (state, quantity) => ({ microBio: state.microBio + quantity })]
])

export const allowed = (state, subtype) => costings.get(subtype).allowed(state)
export const costTransform = (state, quantity, subtype) => costings.get(subtype).costTransform(state, quantity)
export const cost = (subtype) => costings.get(subtype).cost()
export const duration = () => makeTime
export const madeTransform = (state, quantity, subtype) => ({
  ...madeTransforms.get(subtype)(state, quantity)
})
export const resourceMax = (state, subtype) => costings.get(subtype).resourceMax(state)

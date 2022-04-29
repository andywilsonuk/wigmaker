import * as demandNormal from './demandNormal'

export const demandPerSecond = (brand, wigs) => wigs > 10 ? (wigs * 0.05) : demandNormal.demandPerSecond(brand)
export const demandTransform = (state, orderQuantity) => demandNormal.demandTransformWithCap(state, orderQuantity, 5)

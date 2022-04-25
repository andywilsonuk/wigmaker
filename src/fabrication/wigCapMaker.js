const nylonCost = 1
const levels = [
  2,
  1,
  0.5,
  0.2,
].map((s) => s * 1000)

export const allowed = ({ nylon }) => nylon >= nylonCost
export const costTransform = ({ nylon }, quantity) => ({ nylon: nylon - nylonCost * quantity })
export const cost = () => `${nylonCost} nylon`
export const duration = ({ wigCapMakerLevel }) => levels[wigCapMakerLevel]
export const madeTransform = (state, quantity) => ({ wigCaps: state.wigCaps + quantity })
export const resourceMax = ({ nylon }) => Math.floor(nylon / nylonCost)

const nylonCost = 1
const makeTime = 0.1 * 1000

export const allowed = ({ nylon }) => nylon >= nylonCost
export const costTransform = ({ nylon }, quantity) => ({ nylon: nylon - nylonCost * quantity })
export const cost = () => `${nylonCost} nylon`
export const duration = () => makeTime
export const madeTransform = (state, quantity) => ({ wiglets: state.wiglets + quantity })
export const resourceMax = ({ nylon }) => Math.floor(nylon / nylonCost)

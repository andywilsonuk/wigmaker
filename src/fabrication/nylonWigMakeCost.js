const hairCost = 2
const nylonCost = 3
const caps = 1

export const allowed = ({ hair, nylon, wigCaps }) => hair >= hairCost && nylon >= nylonCost && wigCaps >= caps
export const costTransform = ({ hair, nylon, wigCaps }, quantity) => ({
  hair: hair - hairCost * quantity,
  nylon: nylon - nylonCost * quantity,
  wigCaps: wigCaps - caps * quantity
})
export const cost = () => `${hairCost} hair, ${nylonCost} nylon, cap`
export const resourceMax = ({ hair, wigCaps, nylon }) => Math.min(Math.floor(hair / hairCost), Math.floor(nylon / nylonCost), Math.floor(wigCaps / caps))

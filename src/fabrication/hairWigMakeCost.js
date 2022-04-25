const hairCost = 4
const caps = 1

export const allowed = ({ hair, wigCaps }) => hair >= hairCost && wigCaps >= caps
export const costTransform = ({ hair, wigCaps }, quantity) => ({
  hair: hair - hairCost * quantity,
  wigCaps: wigCaps - caps * quantity,
})
export const cost = () => `${hairCost} hair, wig cap`
export const resourceMax = ({ hair, wigCaps }) => Math.min(Math.floor(hair / hairCost), Math.floor(wigCaps / caps))

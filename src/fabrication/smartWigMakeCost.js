const algaeCost = 1
const smartChipCost = 1

export const allowed = ({ algae, smartChips }) => algae >= algaeCost && smartChips >= smartChipCost
export const costTransform = ({ algae, smartChips }, quantity) => ({
  algae: algae - algaeCost * quantity,
  smartChips: smartChips - smartChipCost * quantity
})
export const cost = () => `${algaeCost} algae, chip`
export const resourceMax = ({ algae, smartChips }) => Math.min(Math.floor(algae / algaeCost), Math.floor(smartChips / smartChipCost))

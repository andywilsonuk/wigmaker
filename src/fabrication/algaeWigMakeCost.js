const algaeCost = 1

export const allowed = ({ algae }) => algae >= algaeCost
export const costTransform = ({ algae }, quantity) => ({
  algae: algae - algaeCost * quantity,
})
export const cost = () => `${algaeCost} algae`
export const resourceMax = ({ algae }) => Math.floor(algae / algaeCost)

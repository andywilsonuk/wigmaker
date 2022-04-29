import { cashString, compactString, decimalString } from './humanize'

const brandString = (brand) => `≥${compactString(brand)} brand`
const microString = (micro) => `${decimalString(micro)} micro`
const powerString = (micro) => `${decimalString(micro)} power`

export const costString = ({ cash, brand, micro, power, free }) => {
  const c = []
  if (free) { return ' ' }
  if (cash !== undefined) { c.push(cashString(cash)) }
  if (brand !== undefined) { c.push(brandString(brand)) }
  if (micro !== undefined) { c.push(microString(micro)) }
  if (power !== undefined) { c.push(powerString(power)) }
  if (c.length === 0) { throw new Error('Bad cost input') }
  return c.join(', ')
}

export const microCostTransform = (micro, microBio, required) => {
  const availableFromMicro = Math.min(micro, required)
  return {
    micro: micro - availableFromMicro,
    microBio: microBio - (required - availableFromMicro)
  }
}

export const costTransform = ({ cash, micro, microBio }, { cash: requiredCash = 0, micro: requiredMicro = 0 }) => ({
  cash: cash - requiredCash,
  ...microCostTransform(micro, microBio, requiredMicro)
})

export const allowed = (
  { cash, brand, micro, microBio },
  { cash: requiredCash = 0, brand: requiredBrand = 0, micro: requiredMicro = 0 }
) =>
  cash >= requiredCash &&
  brand >= requiredBrand &&
  micro + microBio >= requiredMicro

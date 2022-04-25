export const percentOfTotalInt = (total, percent) => Math.ceil((total / 100) * percent)

const sum = (a, b) => a + b
export const sumArray = (array) => array.reduce(sum, 0)

export const normalize = (val, min, max) => (val - min) / (max - min)
export const inverseNormalize = (val, min, max) => (val - max) / (min - max)
export const intBetween = (val, min, max) => Math.floor(val * (max - min + 1) + min)
export const floorPrecision = (value, precision = 2) => {
  const s = Math.floor(value).toString()
  const t = s.slice(0, precision).padEnd(s.length, "0")
  const newValue = +t
  return t[precision - 1] === "5" && s.length % 2 !== 0 ? newValue - 1 : newValue
}

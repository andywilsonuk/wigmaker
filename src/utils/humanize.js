import { floorPrecision } from "./math"

/* eslint-disable max-len */
const locale = "en-US"
const dollars = new Intl.NumberFormat(locale, { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 2, notation: "compact", compactDisplay: "short" })
const currentDollars = new Intl.NumberFormat(locale, { style: "currency", currency: "USD", minimumSignificantDigits: 1, maximumSignificantDigits: 3, notation: "compact", compactDisplay: "short" })
const percent = new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 0 })
const percent2dp = new Intl.NumberFormat(locale, { style: "percent", minimumFractionDigits: 2, maximumFractionDigits: 2 })
const percent5dp = new Intl.NumberFormat(locale, { style: "percent", minimumFractionDigits: 5, maximumFractionDigits: 5 })
const decimal = new Intl.NumberFormat(locale, { style: "decimal", maximumFractionDigits: 2 })
const decimal1dp = new Intl.NumberFormat(locale, { style: "decimal", minimumFractionDigits: 1, maximumFractionDigits: 1 })
const decimal0dp = new Intl.NumberFormat(locale, { style: "decimal", maximumFractionDigits: 0 })
const compact = new Intl.NumberFormat(locale, { style: "decimal", maximumFractionDigits: 2, notation: "compact", compactDisplay: "short" })
const compact2dp = new Intl.NumberFormat(locale, { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2, notation: "compact", compactDisplay: "short" })
const compactMax2dp = new Intl.NumberFormat(locale, { style: "decimal", minimumFractionDigits: 0, maximumFractionDigits: 2, notation: "compact", compactDisplay: "short" })
const compact0dp = new Intl.NumberFormat(locale, { style: "decimal", maximumFractionDigits: 0, notation: "compact", compactDisplay: "short" })
const shortTime = new Intl.DateTimeFormat(locale, { minute: "2-digit", second: "2-digit", fractionalSecondDigits: 3 })

export const cashString = (number) => dollars.format(number)
export const cashCurrentString = (number) => currentDollars.format(floorPrecision(number, 3))
export const percentString = (number) => percent.format(number)
export const percent2dpString = (number) => percent2dp.format(number)
export const percent5dpString = (number) => percent5dp.format(number)
export const decimalString = (number) => decimal.format(number)
export const decimal1dpString = (number) => decimal1dp.format(number)
export const decimal0dpString = (number) => decimal0dp.format(number)
export const compactString = (number) => compact.format(number)
export const compact2dpString = (number) => compact2dp.format(number)
export const compactMax2dpString = (number) => compactMax2dp.format(number)
export const compact0dpString = (number) => compact0dp.format(number)
export const shortTimeString = (milliseconds) => shortTime.format(new Date(milliseconds))
export const timeDurationString = (milliseconds) => {
  const seconds = parseInt((milliseconds / 1000) % 60, 10)
  const minutes = parseInt((milliseconds / (1000 * 60)) % 60, 10)
  const hours = parseInt((milliseconds / (1000 * 60 * 60)) % 24, 10)

  const hoursString = (hours < 10) ? `0${hours}` : hours
  const minutesString = (minutes < 10) ? `0${minutes}` : minutes
  const secondsString = (seconds < 10) ? `0${seconds}` : seconds

  return `${hoursString}:${minutesString}:${secondsString}`
}
export const labelWithCost = (label, cost) => (cost === undefined ? label : `${label} (${cost})`)
export const maxedUpgrades = "(maxed)"

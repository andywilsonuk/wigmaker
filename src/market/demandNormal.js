import weightedDistribution from '../utils/weightedDistribution'
import Memorization from '../utils/memorization'
import { achievedLookup, notion, research, milestone } from '../shared/milestones'
import { sumArray } from '../utils/math'
import { oneHundredThousand } from '../shared/bigNumbers'

const baseWeights = [1, 1.65, 4, 10]
const wigAllowedAchievements = [milestone.manufacture, notion.nylonWigs, notion.siliconeWigs, research.algaeIncubator]

const levelMaxAndValue = [
  [50, 0.1],
  [100, 0.11],
  [400, 0.2],
  [1000, 0.3],
  [1800, 0.4],
  [2000, 0.5],
  [3000, 0.6],
  [4600, 0.7],
  [5000, 0.9],
  [6000, 1.1],
  [7000, 1.5],
  [9000, 1.8],
  [15000, 3],
  [20000, 5],
  [30000, 7],
  [40000, 9],
  [50000, 15],
  [60000, 20],
  [70000, 30],
  [200000, 40]
]
const leveledDemand = levelMaxAndValue.map(([max, value], index) => [max, index === 0 ? 0 : levelMaxAndValue[index - 1][0], value])
let leveledDemandIndex = 0

export const demandPerSecond = (level) => {
  let maxedLevels = leveledDemandIndex === leveledDemand.length
  let maxLevel

  if (!maxedLevels) {
    [maxLevel] = leveledDemand[leveledDemandIndex]
    if (level < leveledDemand[leveledDemandIndex][1]) {
      // state import?
      leveledDemandIndex = 0;
      [maxLevel] = leveledDemand[leveledDemandIndex]
    }

    while (level > maxLevel) {
      leveledDemandIndex += 1
      maxedLevels = leveledDemandIndex === leveledDemand.length
      if (maxedLevels) { break }
      [maxLevel] = leveledDemand[leveledDemandIndex]
    }
  }

  return maxedLevels ? 20 + Math.floor(level / oneHundredThousand) * 10 : leveledDemand[leveledDemandIndex][2]
}
const ordersCap = (brand) => (brand < 200000 ? Math.max(35, Math.floor(brand * 0.05)) : oneHundredThousand)

const weightsWithRestrictions = (achieved) =>
  wigAllowedAchievements.map((a, i) => (achievedLookup.has(achieved, a) ? baseWeights[i] : 0)).filter((a) => a !== 0)
const weightsMemo = new Memorization(weightsWithRestrictions)

export const demandTransformWithCap = (state, orderQuantity, cap) => {
  const { achieved, orders } = state
  const totalOrders = sumArray(orders)
  const required = orderQuantity === 0 ? 0 : Math.min(orderQuantity, cap - totalOrders)
  if (required <= 0) { return undefined }

  const weights = weightsMemo.get(achieved)
  const newOrders = weightedDistribution(weights, required)

  return {
    orders: orders.map((existing, index) => existing + (newOrders[index] ?? 0))
  }
}

export const demandTransform = (state, orderQuantity) => demandTransformWithCap(state, orderQuantity, ordersCap(state.brand))

import { intBetween, inverseNormalize, normalize, sumArray } from "./math"
import { random } from "./random"
import Memorization from "./memorization"

const calcThresholds = (weights) => {
  const totalWeight = sumArray(weights)
  return weights.map((w) => inverseNormalize(w, 0, totalWeight))
}
const calcThresholdsMemo = new Memorization(calcThresholds)

export default (weights, required) => {
  const thresholds = calcThresholdsMemo.get(weights)
  const distributions = new Array(weights.length).fill(0)
  let remaining = required
  let counter = weights.length
  let index = -1

  while (counter > 0) {
    index = (index + 1) % weights.length
    counter -= 1
    if (counter === 0) {
      distributions[index] = remaining
      break
    }

    const rand = random()
    if (rand < thresholds[index]) { continue }
    const norm2 = normalize(rand, thresholds[index], 1)
    const allocated = intBetween(norm2, 1, remaining)
    remaining -= allocated
    distributions[index] = allocated
    if (remaining === 0) { break }
  }
  return distributions
}

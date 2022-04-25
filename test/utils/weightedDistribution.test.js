import { overrideRandom } from "../../src/utils/random"
import weightedDistribution from "../../src/utils/weightedDistribution"
import { mockSequence } from "../testUtils"

test("Low probability, last takes all", () => {
  const originalWeights = [1, 2]
  const required = 3
  overrideRandom(mockSequence(0))

  const actualDistributions = weightedDistribution(originalWeights, required)

  expect(actualDistributions).toStrictEqual([0, 3])
})
test("High probability, first takes to max", () => {
  const originalWeights = [1, 2]
  const required = 3
  overrideRandom(mockSequence(0.9999))

  const actualDistributions = weightedDistribution(originalWeights, required)

  expect(actualDistributions).toStrictEqual([3, 0])
})
test("Even spread", () => {
  const originalWeights = [1, 2]
  const required = 10
  overrideRandom(mockSequence(0.8))

  const actualDistributions = weightedDistribution(originalWeights, required)

  expect(actualDistributions).toStrictEqual([5, 5])
})
test("Four weights", () => {
  const originalWeights = [1, 2, 3, 4]
  const required = 10
  overrideRandom(mockSequence(0.8, 0.8, 0.8))

  const actualDistributions = weightedDistribution(originalWeights, required)

  expect(actualDistributions).toStrictEqual([0, 1, 4, 5])
})

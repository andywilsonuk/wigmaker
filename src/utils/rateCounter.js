const alphaWeighting = 0.9

export const weightedRate = (newRate, previousRate) => (newRate === 0 ? 0 : alphaWeighting * newRate + (1 - alphaWeighting) * previousRate)

export default class RateCounter {
  constructor() {
    this.current = 0
  }

  increment(addition) {
    this.current += addition
  }

  emit(previous) {
    const { current } = this

    this.current = 0
    if (current === 0) { return 0 }
    return weightedRate(current, previous)
  }
}

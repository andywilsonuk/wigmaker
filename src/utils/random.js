/* eslint-disable no-plusplus */
const baseOffset = 1000000
const randomFn = (offset) => ((Math.sin(offset + baseOffset) + 1) * 5 * offset) % 1
export const generateSeed = () => Math.random() * baseOffset

export class Generator {
  constructor (seed, offset) {
    this.seed = seed ?? generateSeed()
    this.offset = offset ?? 0
    this.rand = randomFn
  }

  random () {
    return this.rand(this.seed + (++this.offset))
  }

  randomInt (min, max) {
    return min === max ? min : Math.floor(this.rand(this.seed + (++this.offset)) * (max - min + 1) + min)
  }

  randomRange (min, max) {
    const r = this.rand(this.seed + (++this.offset))
    const t = r * (max - min) + min
    return t
  }

  setOffset (offset) {
    this.offset = offset
  }
}

const defaultGenerator = new Generator()
export const setOffset = (offset) => { defaultGenerator.setOffset(offset) }
export const getOffset = () => defaultGenerator.offset
export const random = () => defaultGenerator.random()
export const randomRange = (min, max) => defaultGenerator.randomRange(min, max) // max is exclusive
export const randomInt = (min, max) => defaultGenerator.randomInt(min, max) // max is inclusive

export const overrideRandom = (override) => { defaultGenerator.rand = override }

export const Chance = (percentChance, positionAction, negativeAction) => () =>
  (defaultGenerator.randomInt(1, 100) < percentChance ? positionAction : negativeAction)
export const ChanceRange = (action, min, max) => [action, defaultGenerator.randomRange(min, max)]
export const ChanceInt = (action, min, max) => [action, defaultGenerator.randomInt(min, max)]

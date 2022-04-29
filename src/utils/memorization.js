export default class Memorization {
  constructor (calcFn) {
    this.calcFn = calcFn
    this.source1 = null
    this.source2 = null
    this.calculated = null
  }

  get (source, ...args) {
    if (source === this.source1) { return this.calculated }
    this.source1 = source
    this.calculated = this.calcFn(source, ...args)
    return this.calculated
  }

  getFor2 (source1, source2, ...args) {
    if (source1 === this.source1 && source2 === this.source2) { return this.calculated }
    this.source1 = source1
    this.source2 = source2
    this.calculated = this.calcFn(source1, source2, ...args)
    return this.calculated
  }
}

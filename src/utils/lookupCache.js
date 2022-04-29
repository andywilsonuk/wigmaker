export default class LookupCache {
  constructor () {
    this.innerSet = new Set()
    this.innerArrayRef = null
  }

  refreshAsNeeded (stateArray) {
    if (this.innerArrayRef !== stateArray) {
      this.innerSet.clear()
      stateArray.forEach((element) => this.innerSet.add(element))
      this.innerArrayRef = stateArray
    }
  }

  has (stateArray, value) {
    this.refreshAsNeeded(stateArray)
    return this.innerSet.has(value)
  }

  hasAll (stateArray, values) {
    this.refreshAsNeeded(stateArray)
    return values.every((v) => this.innerSet.has(v))
  }

  // eslint-disable-next-line class-methods-use-this
  include (stateArray, ...values) {
    return [...new Set([...stateArray, ...values])]
  }
}

export default class LocalStorageFacade {
  constructor (key) {
    this.key = `wigmaker_${key}`
  }

  write (serializedState) { global.localStorage.setItem(this.key, serializedState) }

  read () { return global.localStorage.getItem(this.key) }

  exists () { return global.localStorage.getItem(this.key) != null }

  remove () { global.localStorage.removeItem(this.key) }
}

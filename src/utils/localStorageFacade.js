export default class LocalStorageFacade {
  constructor(key) {
    this.key = `wigmaker_${key}`
  }

  write(serializedState) { localStorage.setItem(this.key, serializedState) }

  read() { return localStorage.getItem(this.key) }

  exists() { return localStorage.getItem(this.key) != null }

  remove() { localStorage.removeItem(this.key) }
}

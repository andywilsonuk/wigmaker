import { nodeFlags, setNorth, setWest } from "./node"

export const northNeighbour = "N"
export const westNeighbour = "W"

export class Cell {
  constructor() {
    this.state = nodeFlags.off
    this.neighbours = []
    this.northNeighbour = undefined
    this.westNeighbour = undefined
  }

  get unlinked() {
    return this.state === nodeFlags.off
  }

  link(cell) {
    if (cell === this.northNeighbour) {
      this.state = setNorth(this.state)
    } else if (cell === this.westNeighbour) {
      this.state = setWest(this.state)
    } else if (this.state === nodeFlags.off) {
      this.state = nodeFlags.on
    }
  }

  setNeighbour(neighbour, direction) {
    this.neighbours.push(neighbour)
    if (direction === northNeighbour) {
      this.northNeighbour = neighbour
    } else if (direction === westNeighbour) {
      this.westNeighbour = neighbour
    }
  }

  reset() {
    this.state = nodeFlags.off
  }

  setOn() {
    this.state = nodeFlags.on
  }
}

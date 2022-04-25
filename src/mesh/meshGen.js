import { intBetween, normalize } from "../utils/math"
import { Cell, northNeighbour, westNeighbour } from "./cell"

const weightForLast = 0.8

const active = []
let grid
let needsStart

const prepareGrid = (size) => {
  const newGrid = Array.from({ length: size * size }, () => new Cell())
  for (let cellIndex = 0; cellIndex < newGrid.length; cellIndex += 1) {
    const cell = newGrid[cellIndex]
    const x = cellIndex % size
    const y = Math.floor(cellIndex / size)

    if (y >= 1) { cell.setNeighbour(newGrid[cellIndex - size], northNeighbour) }
    if (y <= size - 2) { cell.setNeighbour(newGrid[cellIndex + size]) }
    if (x >= 1) { cell.setNeighbour(newGrid[cellIndex - 1], westNeighbour) }
    if (x <= size - 2) { cell.setNeighbour(newGrid[cellIndex + 1]) }
  }
  return newGrid
}

const addStartCell = (list, rand) => {
  const startIndex = rand.randomInt(0, list.length - 1)
  const start = list[startIndex]
  start.setOn()
  active.push(start)
}

export const init = (gridSize) => {
  grid = prepareGrid(gridSize)
  needsStart = true
  return grid
}

const selectionStrategy = (list, rand) => {
  const r = rand.random()
  if (r < weightForLast) { return list[list.length - 1] }
  const r2 = normalize(r, weightForLast, 1)
  const index = intBetween(r2, 0, list.length - 1)
  return list[index]
}

export const next = (rand) => {
  if (needsStart) {
    addStartCell(grid, rand)
    needsStart = false
    return
  }

  while (active.length !== 0) {
    const cell = selectionStrategy(active, rand)
    const availableNeighbours = cell.neighbours.filter((c) => c.unlinked)
    if (availableNeighbours.length === 0) {
      active.splice(active.findIndex((c) => c === cell), 1)
      continue
    }
    const neighbour = availableNeighbours[rand.randomInt(0, availableNeighbours.length - 1)]
    cell.link(neighbour)
    neighbour.link(cell)
    active.push(neighbour)
    break
  }
}

export const reset = () => {
  grid.forEach((c) => c.reset())
  needsStart = true
}

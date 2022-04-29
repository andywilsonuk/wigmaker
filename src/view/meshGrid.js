import { memo, text } from '../hyperapp'
import { svg, rect, container } from '../viewComponents'
import { meshProjection, meshGridAvailable, visualizationKey } from '../mesh/meshGridVisual'
import { hasDirection, nodeFlags } from '../mesh/node'

const viewBoxSize = 120
const node = (x, y, size, on) => rect(x, y, size, size, { key: `node${x},${y}`, class: ['meshGridNode', on && 'meshGridNodeOn'] })
const connectionVertical = (x, y, length, thickness, on) => rect(x, y, thickness, length, { key: `connv${x},${y}`, class: ['meshGridConnection', on && 'meshGridConnectionOn'] })
const connectionHortizontal = (x, y, length, thickness, on) => rect(x, y, length, thickness, { key: `connh${x},${y}`, class: ['meshGridConnection', on && 'meshGridConnectionOn'] })

const build = () => {
  const [gridSize, nodeStates] = meshProjection()
  const offset = 4
  const gap = viewBoxSize / 12
  const spacingSize = viewBoxSize / gridSize
  const nodeSize = spacingSize - gap
  const connectorThickness = 1
  const connectorOffset = (nodeSize / 2) - (connectorThickness / 2)
  const parts = []

  for (let index = 0; index < nodeStates.length; index += 1) {
    const cellState = nodeStates[index]
    const x = index % gridSize
    const y = Math.floor(index / gridSize)
    const cellX = (x * spacingSize) + offset
    const cellY = (y * spacingSize) + offset

    if (y > 0) {
      const northOn = hasDirection(cellState, nodeFlags.north)
      parts.push(connectionVertical(cellX + connectorOffset, cellY - gap, gap, connectorThickness, northOn))
    }
    if (x > 0) {
      const westOn = hasDirection(cellState, nodeFlags.west)
      parts.push(connectionHortizontal(cellX - gap, cellY + connectorOffset, gap, connectorThickness, westOn))
    }
  }
  for (let index = 0; index < nodeStates.length; index += 1) {
    const cellState = nodeStates[index]
    const x = index % gridSize
    const y = Math.floor(index / gridSize)
    const cellX = (x * spacingSize) + offset
    const cellY = (y * spacingSize) + offset
    parts.push(node(cellX, cellY, nodeSize, cellState !== nodeFlags.off))
  }
  return parts
}

const grid = () => svg(`0 0 ${viewBoxSize} ${viewBoxSize}`, { class: 'meshGrid', 'aria-hidden': true }, build())

export default ({ meshIteration }) => meshGridAvailable() && container([
  memo(grid, visualizationKey()),
  container(text(`Iteration: ${meshIteration}`))
])

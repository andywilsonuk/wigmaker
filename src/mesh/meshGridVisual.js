import { effectWithPayload } from '../utils/hyperAppHelpers'
import { Generator } from '../utils/random'
import { init, next, reset } from './meshGen'

let meshGrid
let lastStep = 0
let lastIteration = null
let gridSize
let rand
let maxIterations

const setupRand = ({ randSeed, meshIteration }) => { rand = new Generator(randSeed, Math.cos(meshIteration)) }

const updateToSteps = (meshIterationStep) => {
  while (lastStep < meshIterationStep) {
    lastStep += 1
    next(rand)
  }
}

const VisualizationInit = (state, { nodesPerGrid, maxIterationVisuals }) => {
  const { meshIterationStep, meshIteration } = state
  gridSize = Math.sqrt(nodesPerGrid)
  maxIterations = maxIterationVisuals
  meshGrid = init(gridSize)
  setupRand(state)
  lastIteration = meshIteration
  lastStep = 0
  updateToSteps(meshIteration > maxIterations ? nodesPerGrid : meshIterationStep)
  return state
}

const VisualizationNext = (state) => {
  const { meshIterationStep, meshIteration } = state
  if (meshIteration > maxIterations) { return state } // visualization has ended
  if (lastIteration !== meshIteration) {
    reset()
    setupRand(state)
    lastStep = 0
    lastIteration = meshIteration
  }

  updateToSteps(meshIterationStep)

  return state
}

export const visualizationUpdate = (nodesPerGrid, maxIterationVisuals) =>
  [effectWithPayload, { action: meshGrid == null ? VisualizationInit : VisualizationNext, payload: { nodesPerGrid, maxIterationVisuals } }]

export const meshGridAvailable = () => meshGrid !== undefined
export const visualizationKey = () => `${lastIteration}-${lastStep}`
export const meshProjection = () => [gridSize, meshGrid.map((c) => c.state)]

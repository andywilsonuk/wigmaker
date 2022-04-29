import { audioIds, enqueueAudio } from '../audio'
import { randomInt } from '../utils/random'
import { capacity } from './dataCenterMechanic'
import { visualizationUpdate } from './meshGridVisual'
import { nodeLogTransform } from './nodeLogMessages'

const nodesPerGrid = 64
const initialNodesPerStep = 20000
const maxConnectionsPerNode = 2.5
const maxIterationVisuals = 65

export default (state) => {
  if (state.lowPower) { return state }

  const { smartWigsSold, meshIteration, meshNodes, meshNodeAccumulation, meshIterationStep, meshConnections } = state

  if (smartWigsSold === 0) { return [state, visualizationUpdate(nodesPerGrid, maxIterationVisuals)] }

  const additional = Math.min(capacity(state) - meshNodes, smartWigsSold - meshNodes)

  let accumulation = meshNodeAccumulation + additional
  const additionalConnections = additional === 0 ? 0 : randomInt(additional, additional * maxConnectionsPerNode)

  const nodesPerStep = initialNodesPerStep + Math.floor((initialNodesPerStep * meshIteration) ** 1.1)

  const stepsSinceLast = Math.floor(accumulation / nodesPerStep)
  let nowStep = meshIterationStep + stepsSinceLast
  const iterationsSinceLast = Math.floor(nowStep / nodesPerGrid)
  nowStep -= iterationsSinceLast * nodesPerGrid
  accumulation -= stepsSinceLast * nodesPerStep

  return [{
    ...state,
    meshConnections: meshConnections + additionalConnections,
    meshNodes: meshNodes + additional,
    meshNodeAccumulation: accumulation,
    meshIteration: meshIteration + iterationsSinceLast,
    meshIterationStep: nowStep,
    ...nodeLogTransform(state, additional)
  }, visualizationUpdate(nodesPerGrid, maxIterationVisuals),
  iterationsSinceLast > 0 && meshIteration < 40 && enqueueAudio(audioIds.meshIteration)]
}

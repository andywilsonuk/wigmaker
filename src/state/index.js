import { devToolsActive } from '../devTools'
import { continuationCheck, incidentRequiresPauseCheck } from '../shared/sceneHelpers'
import initial from './initial'
import { canRestore, restore } from './statePersister'

export default () => [
  { ...initial },
  continuationCheck(),
  devToolsActive && canRestore() && restore(),
  devToolsActive && incidentRequiresPauseCheck()
]

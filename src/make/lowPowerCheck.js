import { audioIds, enqueueAudio } from '../audio'
import { initMessage, logTransform } from '../shared/logData'
import { effectNoPayload } from '../utils/hyperAppHelpers'
import { boostEndTransform } from './boostMechanic'
import { powerDemandExceedsSupply } from './powerMechanic'

const lowPowerMessage = initMessage('4d', 'Insufficient power')

const checkLowPower = (state) => (!state.lowPower && powerDemandExceedsSupply(state)
  ? [{
      ...state,
      ...boostEndTransform,
      lowPower: true,
      ...logTransform(state, lowPowerMessage)
    }, enqueueAudio(audioIds.lowPower)]
  : state)
export default () => [effectNoPayload, checkLowPower]

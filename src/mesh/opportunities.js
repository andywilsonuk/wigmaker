import lowPowerCheck from "../make/lowPowerCheck"
import { updateTheme } from "../shared/optionsManager"
import { dataCenterTransferTransform } from "./dataCenterMechanic"
import { optionFlags } from "../shared/options"
import { fiftyTrillion, oneTrillion, sevenBillion } from "../shared/bigNumbers"
import { changeSceneTransform, scenes } from "../shared/scenes"
import { audioIds, enqueueAudio } from "../audio"
import { clear } from "../state/statePersister"

export const Heist = (state) => ({ ...state, cash: state.cash + sevenBillion })
export const MeshMode = (state) => [{
  ...state,
  prestige: true,
}, updateTheme(optionFlags.meshTheme), enqueueAudio(audioIds.meshMode)]
export const SecureHairStocks = (state) => ({ ...state, hair: oneTrillion })
export const TransferDataCenter = (state) => [{
  ...state,
  ...dataCenterTransferTransform(state),
}, lowPowerCheck()]
export const WipeAwayCompetitors = (state) => ({ ...state, cash: state.cash + fiftyTrillion })
export const TheEnd = (state) => [{
  ...state,
  ...changeSceneTransform(scenes.theEnd),
}, clear(), enqueueAudio(audioIds.theEnd)]

import { canRestore, restore, save, initOffset, clear } from "../state/statePersister"
import { hasFlag, sceneTempFlags, setFlag, toggleFlag } from "./sceneTempFlags"
import { changeScene, scenes } from "./scenes"
import { effectNoPayload } from "../utils/hyperAppHelpers"
import { textToObject } from "../utils/serializer"
import { updateTheme } from "./optionsManager"
import { optionFlags } from "./options"
import initial from "../state/initial"
import { audioIds, enqueueAudio, stopAudio } from "../audio"

export const gamePaused = (state) => hasFlag(state.sceneTemp, sceneTempFlags.gamePaused) || state.incidentId !== null
export const ToggleGameRunning = (state) => [{
  ...state,
  sceneTemp: toggleFlag(state.sceneTemp, sceneTempFlags.gamePaused),
}, save(), enqueueAudio(audioIds.pause)]
export const PauseGame = (state) => [{
  ...state,
  sceneTemp: setFlag(state.sceneTemp, sceneTempFlags.gamePaused),
}, enqueueAudio(audioIds.pause)]
const IncidentRequiresPauseCheck = (state) => (state.incidentId === null ? state : PauseGame)
export const incidentRequiresPauseCheck = () => [effectNoPayload, IncidentRequiresPauseCheck]

const continuationCheckActual = (state) => ({
  ...state,
  sceneTemp: canRestore() ? sceneTempFlags.none : sceneTempFlags.initial,
})
export const continuationCheck = () => [effectNoPayload, continuationCheckActual]

export const ShowConfirm = (state, sceneFlag) => [{ ...state, sceneTemp: sceneFlag }, enqueueAudio(audioIds.button)]

export const DialogBack = (state) => [state, changeScene(scenes.titles), continuationCheck()]
export const Continue = (state) => [state, canRestore() && restore(), changeScene(scenes.main), incidentRequiresPauseCheck(), enqueueAudio(audioIds.start)]

export const ImportFromText = (state, text) => {
  let newState
  try {
    newState = textToObject(text, initial)
  } catch (error) {
    return ({ ...state, sceneTemp: sceneTempFlags.restoreError })
  }
  newState = { ...newState, scene: state.scene, sceneTemp: state.scene === scenes.import ? sceneTempFlags.importSuccess : sceneTempFlags.none }
  return [newState,
    initOffset(),
    save(),
    newState.prestige && updateTheme(optionFlags.meshTheme),
    state.scene === scenes.main && incidentRequiresPauseCheck(),
    enqueueAudio(audioIds.button),
  ]
}
export const Reset = (state) => [
  { ...initial, scene: state.scene, sceneTemp: state.scene === scenes.import ? sceneTempFlags.resetSuccess : sceneTempFlags.none, prestige: state.prestige },
  initOffset(),
  clear(),
  enqueueAudio(audioIds.button),
]

export const RunningToTitles = (state) => [state, save(), changeScene(scenes.titles)]

export const EndToTitles = (state) => [
  { ...initial, scene: scenes.titles, sceneTemp: sceneTempFlags.initial, prestige: state.prestige },
  initOffset(),
  stopAudio(audioIds.theEnd),
]

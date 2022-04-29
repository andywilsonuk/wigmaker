import initial from './initial'
import { effectNoPayload } from '../utils/hyperAppHelpers'
import { getOffset, setOffset } from '../utils/random'
import LocalStorageFacade from '../utils/localStorageFacade'
import { textToObject, objectToCodedText } from '../utils/serializer'

const store = new LocalStorageFacade('state')

const initOffsetActual = (state) => {
  setOffset(state.randOffset)
  return state
}
export const initOffset = () => [effectNoPayload, initOffsetActual]

export const buildFinalState = (state) => ({ ...state, randOffset: getOffset() })

let lastState
export const saveToLocal = (state) => {
  if (lastState === state) { return state }
  lastState = state
  store.write(objectToCodedText(buildFinalState(state)))
  return state
}
export const save = () => [effectNoPayload, saveToLocal]

const restoreFromLocal = (dispatch) => {
  const state = textToObject(store.read(), initial)
  setOffset(state.randOffset)
  dispatch(state, initOffset())
}
export const restore = () => [restoreFromLocal]
export const canRestore = () => store.exists()

const removeLocal = (state) => {
  store.remove()
  return state
}
export const clear = () => [effectNoPayload, removeLocal]

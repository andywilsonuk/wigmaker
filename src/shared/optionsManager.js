import LocalStorageFacade from "../utils/localStorageFacade"
import { objectToCodedText, textToObject } from "../utils/serializer"
import { disableOptions, enableOption, hasOption, optionFlags, toggleOption } from "./options"
import { mute, unmute } from "../audio"

const store = new LocalStorageFacade("options")
let options

const save = () => {
  store.write(objectToCodedText({ o: options }))
}

const setTheme = () => {
  const htmlElement = document.documentElement
  htmlElement.removeAttribute("data-theme", "dark")
  htmlElement.removeAttribute("data-themeOverlay", "mesh")

  if (hasOption(options, optionFlags.lightTheme)) { return }

  htmlElement.setAttribute("data-theme", "dark")

  if (hasOption(options, optionFlags.meshTheme)) {
    htmlElement.setAttribute("data-themeOverlay", "mesh")
  }
}

const setSound = () => {
  if (hasOption(options, optionFlags.soundOff)) {
    mute()
  } else {
    unmute()
  }
}

export const init = () => {
  options = store.exists() ? textToObject(store.read(), { o: null }).o : optionFlags.lightTheme
  document.addEventListener("DOMContentLoaded", setTheme)
  setSound()
}

const forceRender = (dispatch) => dispatch((state) => ({ ...state }))

const updateThemeActual = (dispatch, themeFlag) => {
  options = disableOptions(options, optionFlags.lightTheme, optionFlags.darkTheme, optionFlags.meshTheme)
  if (themeFlag !== undefined) {
    options = enableOption(options, themeFlag)
    if (themeFlag === optionFlags.meshTheme) {
      options = enableOption(options, optionFlags.meshAllowed)
    }
  }
  setTheme()
  save()
  forceRender(dispatch)
}
export const updateTheme = (themeFlag) => [updateThemeActual, themeFlag]
export const ChangeTheme = (state, themeFlag) => [state, updateTheme(themeFlag)]
export const isCurrentTheme = (themeFlag) => hasOption(options, themeFlag)
export const isSoundOn = () => !hasOption(options, optionFlags.soundOff)
export const isMeshAllowed = () => hasOption(options, optionFlags.meshAllowed)
export const isTabbedMode = () => !hasOption(options, optionFlags.flatView)

const toggleSoundOption = (dispatch) => {
  options = toggleOption(options, optionFlags.soundOff)
  save()
  setSound()
  forceRender(dispatch)
}
const updateSoundOption = () => [toggleSoundOption]
export const ChangeSound = (state) => [state, updateSoundOption()]

const toggleViewOption = (dispatch) => {
  options = toggleOption(options, optionFlags.flatView)
  save()
  forceRender(dispatch)
}
export const updateViewOption = () => [toggleViewOption]
export const ChangeView = (state) => [state, updateViewOption()]

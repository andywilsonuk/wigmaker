import MainLoop from "mainloop.js"
import frameUpdate from "./frameUpdate"
import { gameTimeCounter } from "../devTools/reporting"
import { saveOnHidden, saveOnSchedule } from "./autoSave"
import unstick from "./unstick"
import { devToolsActive } from "../devTools"
import * as audio from "../audio"
import sounds from "../audio/sounds"
import { hasFlag, sceneTempFlags } from "../shared/sceneTempFlags"
import { scenes } from "../shared/scenes"
import * as optionsManager from "../shared/optionsManager"

let queuedRender = null
let hyperAppDispatch
let gameRunning = null
let sprintMode = false

const subs = [
  saveOnSchedule(),
  !devToolsActive && saveOnHidden(),
  unstick(),
  gameTimeCounter(),
]
let runningSubs

const unpause = () => {
  if (runningSubs != null) { return }
  runningSubs = subs.filter((s) => s !== false).map((s) => s[0](hyperAppDispatch, s[1]))
  audio.unpause()
}
const pause = () => {
  if (runningSubs == null) { return }
  runningSubs.forEach((s) => s())
  runningSubs = null
  audio.pause()
}

const checkSubscriptions = (state) => {
  if (state == null) { throw new Error("State has been discarded") }

  const running = state.scene === scenes.main && !hasFlag(state.sceneTemp, sceneTempFlags.gamePaused)
  if (gameRunning === running) { return state }
  gameRunning = running

  if (running) {
    unpause()
  } else {
    pause()
  }

  return state
}

const update = (deltaTime) => {
  if (!gameRunning) { return }
  frameUpdate(hyperAppDispatch, deltaTime * (sprintMode ? 10 : 1))
}

const draw = () => {
  if (queuedRender == null) { return }
  queuedRender()
  queuedRender = null
  hyperAppDispatch(checkSubscriptions)
}

const loopEnd = (_, panic) => {
  if (panic) {
    MainLoop.resetFrameDelta()
    audio.clearQueued()
  } else {
    audio.playQueued()
  }
}

const setSprintModeFlag = () => { sprintMode = true }
export const enableSprintMode = () => [setSprintModeFlag]
export const enqueueRender = (render) => { queuedRender = render }

export const init = (dispatch) => {
  hyperAppDispatch = dispatch
  audio.init(sounds)
  optionsManager.init()

  MainLoop.setUpdate(update)
  MainLoop.setDraw(draw)
  MainLoop.setEnd(loopEnd)
  MainLoop.start()
}

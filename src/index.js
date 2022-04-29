import { app } from './hyperapp'
import './styles/all.css'
import initState from './state'
import view from './view'
import errorAlerting from './devTools/errorAlerting'
import * as gameEngine from './gameEngine'
import * as appInstall from './appInstall'

const dispatch = app({
  init: initState(),
  view,
  node: document.getElementById('app'),
  dispatch: errorAlerting,
  enqueueRender: gameEngine.enqueueRender
})

gameEngine.init(dispatch)
appInstall.init(dispatch)

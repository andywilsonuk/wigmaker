import header from './header'
import memoTab from './memoTab'
import makeTab from './makeTab'
import marketTab from './marketTab'
import meshTab from './meshTab'
import options from './options'
import { container } from '../viewComponents'
import svgDefs from './svgDefs'
import devToolsTab from './devToolsTab'
import titles from './titles'
import { scenes } from '../shared/scenes'
import importExport from './importExport'
import { gamePaused } from '../shared/sceneHelpers'
import theEnd from './theEnd'
import credits from './credits'
import log from './log'
import { isTabbedMode } from '../shared/optionsManager'
import { navFlags } from '../shared/nav'

const tabWrapper = (children) => container({ class: 'tabWrapper' }, children)
const logArea = (state) => container({ class: 'logArea' }, state.navSelected !== navFlags.memo && log(state))

const main = (state) => [
  svgDefs(),
  header(state),
  tabWrapper([
    logArea(state),
    state.navSelected !== navFlags.devTools && memoTab(state),
    state.navSelected !== navFlags.devTools && makeTab(state),
    state.navSelected !== navFlags.devTools && marketTab(state),
    state.navSelected !== navFlags.devTools && meshTab(state),
    devToolsTab(state)
  ])
]

const scene = (state) => {
  switch (state.scene) {
    case scenes.main: return main(state)
    case scenes.options: return options(state)
    case scenes.import: return importExport(state)
    case scenes.theEnd: return theEnd(state)
    case scenes.credits: return credits(state)
    default: return titles(state)
  }
}

export default (state) => container({ class: { gamePaused: gamePaused(state), flat: !isTabbedMode() } }, scene(state))

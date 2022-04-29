import { hasNav, navFlags } from '../shared/nav'
import marketForcesPanel from './marketForcesPanel'
import campaignsPanel from './campaignsPanel'
import trendsPanel from './trendsPanel'
import { leftArea, rightArea, pausedOverlay, main, flatTitle } from '../viewComponents'
import { isTabbedMode } from '../shared/optionsManager'

export default (state) => (state.navSelected === navFlags.market || (hasNav(state.nav, navFlags.market) && !isTabbedMode())) && main([
  !isTabbedMode() && flatTitle('Market'),
  leftArea([
    marketForcesPanel(state),
    trendsPanel(state),
    pausedOverlay(state)
  ]),
  rightArea([
    campaignsPanel(state),
    pausedOverlay(state)
  ])
])

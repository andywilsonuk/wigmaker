import { text } from '../hyperapp'
import { hasNav, navFlags } from '../shared/nav'
import { leftArea, rightArea, pausedOverlay, main, panel, flexRow, actionButton, container, styledSpan, toggle, separator, flatTitle } from '../viewComponents'
import meshGrid from './meshGrid'
import { decimalString, percent5dpString, percentString } from '../utils/humanize'
import {
  coverage, commissionAllowed, isCommissioning, Commission, commissionTime, installAllowed, Install,
  atCapacity, ToggleAutoInstall, buyDataCenterLabel, computeString, maxComputeString, capacity
} from '../mesh/dataCenterMechanic'
import opportunityPanel from './opportunityPanel'
import { safeMode } from '../viewComponents/powerIndications'
import toggleFlags from '../utils/toggleFlags'
import { achievedLookup, research } from '../shared/milestones'
import { isTabbedMode } from '../shared/optionsManager'

const coverageText = (state) => {
  const percent = coverage(state)
  return percent > 0 && percent < 0.0000001 ? `<${percent5dpString(0.0000001)}` : percent5dpString(percent)
}

const meshOffline = panel('Connection error', safeMode)

const computeRow = (state, autoInstallAvailable) => {
  const compute = text(`Compute: ${computeString(state)} / ${maxComputeString(state)}`)
  const button = actionButton('Install micros', Install, installAllowed(state))
  const autoToggle = container(toggle('Auto', state.autoInstall, ToggleAutoInstall))
  const breaker = container({ class: 'flexBreak' }, container())

  return flexRow(autoInstallAvailable
    ? [compute, breaker, button, autoToggle]
    : [compute, button])
}

const onlinePanel = (state) => panel('Online', [
  flexRow([
    text('Data centers: '),
    text(capacity(state) === Infinity ? 'decentralized' : state.dataCenters),
    actionButton(buyDataCenterLabel(state), Commission, commissionAllowed(state)),
    isCommissioning(state) && text(percentString(state.dataCenterProgress / commissionTime(state)))
  ]),
  flexRow([
    text(`Nodes: ${decimalString(state.meshNodes)}`),
    atCapacity(state) && styledSpan('meshCapacityReached', 'Insufficient capacity')
  ]),
  container(text(`Connections: ${decimalString(state.meshConnections)}`)),
  container(text(`Coverage: ${coverageText(state)}`)),
  state.meshNodes === 0 && !achievedLookup.has(state.achieved, research.smartWigs) && container(styledSpan('meshCapacityReached', 'Node connections not currently available')),
  separator(),
  computeRow(state, toggleFlags.isAvailable(state.autoInstall))
])

export default (state) => (state.navSelected === navFlags.mesh || (hasNav(state.nav, navFlags.mesh) && !isTabbedMode())) && main([
  !isTabbedMode() && flatTitle('Mesh'),
  leftArea(
    state.lowPower
      ? [meshOffline, pausedOverlay(state)]
      : [onlinePanel(state), opportunityPanel(state), pausedOverlay(state)]
  ),
  rightArea(
    state.lowPower
      ? [pausedOverlay(state)]
      : [meshGrid(state), pausedOverlay(state)]
  )
])

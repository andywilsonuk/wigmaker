import { h, text } from '../hyperapp'
import { navFlags } from '../shared/nav'
import { button, container, flexRow, leftArea, logList, main } from '../viewComponents'
import { getIncident } from '../incidents/incidentsData'
import { isTabbedMode } from '../shared/optionsManager'

const incidentParagraph = (desc) => h('p', { class: 'logDetailedP' }, text(desc))

const incidentPanel = ({ title, description, actions }) =>
  container([
    container({ class: 'logDetailed' }, [
      h('h3', { class: 'logDetailedTitle' }, text(title)),
      container(description.map(incidentParagraph)),
      flexRow(actions.map(([action, label]) => button({ class: 'actionButton', onclick: action }, text(label))))
    ])
  ])

export default (state) => (state.navSelected === navFlags.memo || !isTabbedMode()) && main([
  leftArea([
    state.incidentId != null && incidentPanel(getIncident(state.incidentId)),
    isTabbedMode() && logList(state)
  ])
])

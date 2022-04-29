import { leftArea, rightArea, main, panel, flexRow, plainSpan, button, container, plainSpanWithMarginRight, tableRow, tableCell, table } from '../viewComponents'
import { navFlags } from '../shared/nav'
import { h, text } from '../hyperapp'
import {
  GiftCash, GiftWigsMade, GiftBrand, GiftStrands, ShowCampaigns, ShowResearch, NoWait,
  SprintMode, GiftMicroBio, GiftSmartWigsSold, ShowOpportunity, GiftSmartChips
} from '../devTools/gifting'
import { compactString } from '../utils/humanize'
import { OutputCampaigns, OutputLogText, IncludeGameTime, OutputMaxMessageIds } from '../devTools/reporting'
import { StartIncident } from '../incidents/incidentManager'
import { isAchieved, milestones, ProgressTo } from '../devTools'
import { buildFinalState } from '../state/statePersister'
import { objectToText } from '../utils/serializer'
import { ImportFromText, PauseGame, Reset } from '../shared/sceneHelpers'
import { incidentsList } from '../incidents/incidentsData'
import { categories } from '../devTools/orderedMilestones'

const targetValue = (action) => (state, { target: { value } }) => (value === '' ? state : [action, +value])
const textbox = (action) => h('input', { type: 'text', class: 'devToolsInput', onchange: targetValue(action) })
const row = (cells) => tableRow(cells.map((c) => tableCell(c)))
const devButton = (label, action, enabled = true, props) =>
  button({ class: ['actionButton', 'marginTopHalf'], disabled: !enabled && 'disabled', onclick: action, ...props }, text(label))

const select = (list, action, labelFn, valueFn) =>
  h('select', { onchange: targetValue(action) }, [h('option', {})].concat(list.map((element) => h('option', { value: valueFn(element) }, text(labelFn(element))))))

const importAreaId = 'import'
const Import = () => [ImportFromText, document.getElementById(importAreaId).value]
const stateTextArea = (state) => h('textarea', { id: importAreaId, onfocus: PauseGame, onchange: Import }, text(objectToText(buildFinalState(state))))

export default (state) => state.navSelected === navFlags.devTools && main([
  leftArea([
    panel('Gifting',
      table('', [
        row([text(`Cash (${compactString(state.cash)})`), devButton('+10K', [GiftCash, state.cash + 10000]), textbox(GiftCash)]),
        row([text(`Brand (${compactString(state.brand)})`), devButton('+10K', [GiftBrand, state.brand + 10000]), textbox(GiftBrand)]),
        row([text(`Strands (${compactString(state.strands)})`), devButton('+10K', [GiftStrands, state.strands + 10000]), textbox(GiftStrands)]),
        row([text(`MicroBio (${compactString(state.microBio)})`), devButton('+10K', [GiftMicroBio, state.microBio + 10000]), textbox(GiftMicroBio)]),
        row([text(`Wigs made (${compactString(state.wigsMade)})`), devButton('+10K', [GiftWigsMade, state.wigsMade + 10000]), textbox(GiftWigsMade)]),
        row([text(`SmartWigs made (${compactString(state.smartWigsSold)})`), devButton('+10K', [GiftSmartWigsSold, state.smartWigsSold + 10000]), textbox(GiftSmartWigsSold)]),
        row([text(`SmartChips (${compactString(state.smartChips)})`), devButton('+10K', [GiftSmartChips, state.smartChips + 10000]), textbox(GiftSmartChips)])
      ])),
    panel('State', stateTextArea(state)),
    panel('Actions', [
      flexRow([
        devButton('Game timer', IncludeGameTime),
        devButton('Enable all research', ShowResearch),
        devButton('Enable all campaigns', ShowCampaigns),
        devButton('No wait for updates', NoWait),
        devButton('Sprint Mode', SprintMode),
        devButton('Reset state', Reset)
      ]),
      flexRow([
        plainSpan('Incidents:'),
        select(incidentsList, StartIncident, (e) => `${e.id}: ${e.title}`, (e) => e.id)
      ]),
      flexRow([
        plainSpan('Opportunities:'),
        select(milestones().filter((m) => m.category === categories.opportunity), ShowOpportunity, (e) => e.name, (e) => e.id)
      ])
    ]),
    panel('Reports', flexRow([
      devButton('Campaigns', OutputCampaigns),
      devButton('Log text', OutputLogText),
      devButton('Log Ids', OutputMaxMessageIds)
    ]))
  ]),
  rightArea(
    panel('Milestones',
      h('div', { class: 'flowColumn2' }, milestones().map(({ id, category, name }) =>
        container([plainSpanWithMarginRight(category), devButton(name, [ProgressTo, id], !isAchieved(state, id))]))))
  )
])

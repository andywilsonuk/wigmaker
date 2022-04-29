import { h, text } from '../hyperapp'
import { researchAllowed, ResearchResume } from '../research/researchMechanic'
import { actionButton, container, notionsPanel, list, listItem, plainSpan, progressButton, flexRow } from '../viewComponents'
import dataProvider from '../shared/dataProvider'
import { notionIconById } from '../viewComponents/icons'
import { StrandsResume, strandString } from '../research/strandsMechanic'

const notionItem = (state, researchItemState, research, isCurrent) => listItem(researchItemState.id, [
  container({ class: 'notionImageContainer' }, notionIconById(researchItemState.id)),
  h('h3', {}, [
    h('span', { class: 'textBold' }, text(research.title)),
    plainSpan(`(${research.cost})`)
  ]),
  container(text(research.description)),
  container({ class: 'notionButtonContainer' },
    progressButton(
      'Ponder',
      researchAllowed(state, researchItemState, research),
      [ResearchResume, research],
      research.duration,
      isCurrent ? researchItemState.remaining : 0
    ))
])

export default (state) => notionsPanel('Notions', [
  state.research.length === 0
    ? container(plainSpan('No new ideas'))
    : list({ class: 'notionsList' }, state.research.map((r) => notionItem(state, r, dataProvider.getById(r.id), r.id === state.researchId))),
  flexRow([
    actionButton('Contemplate', StrandsResume, !state.strandsOn),
    plainSpan(`Strands: ${strandString(state)}`)
  ])
])

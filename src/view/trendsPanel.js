import { text } from '../hyperapp'
import { actionButton, button, container, flexRow, flexRowLastRight, panel, plainSpan } from '../viewComponents'
import {
  TrendConvertToVogue, StartTrend, CorrectTrendChoice, NextTrendSelection, availableChoices,
  brandRequiredForTrends, startTrendAllowed, trendName, selectedChoice, startTrendLabel
} from '../market/trendsMechanic'
import * as trendsEnum from '../market/trendEnum'
import { decimalString, percentString } from '../utils/humanize'
import { pausedCheck } from '../viewComponents/pausedOverlay'
import wigs from '../viewComponents/wigs'

const choiceByIndex = (index) => wigs(index)

const choiceButton = (children, action, enabled = true, props) =>
  button({ class: ['actionButton', 'trendChoiceButton'], disabled: !enabled && 'disabled', onclick: [pausedCheck, action], ...props }, children)

const choiceButtons = (state, allowed, selected) => flexRow(availableChoices(state).map((choiceIndex) =>
  choiceButton(allowed ? choiceByIndex(choiceIndex) : text('?'), selected === choiceIndex ? CorrectTrendChoice : NextTrendSelection, allowed)))
const overlayChoices = (state) =>
  availableChoices(state).map((choiceIndex) => container({ class: ['trendsIndicatorInner', 'trendsIndicatorSelecting'] }, choiceByIndex(choiceIndex)))
const selection = (state) => {
  if (trendsEnum.isSelecting(state.trendStatus)) {
    return container({ class: 'trendsIndicatorOuter', 'aria-label': 'Selection sequence running' }, overlayChoices(state))
  }
  if (trendsEnum.isSelected(state.trendStatus)) {
    return container({ class: 'trendsIndicatorOuter' }, container({ class: 'trendsIndicatorInner' }, choiceByIndex(selectedChoice(state))))
  }
  return container({ class: 'trendsIndicatorOuter' }, container({ class: 'trendsIndicatorInner' }, text('')))
}

const trendsUnavailable = container(text(`Brand value ${decimalString(brandRequiredForTrends)} required for trends`))
const trendsAvailable = (state) => [
  container(actionButton(startTrendLabel(state), StartTrend, startTrendAllowed(state))),
  container({ class: 'marginTop' }, text(`Trend: ${trendName(state)}`)),
  container({ class: 'trendsLayout' }, [
    container({ class: 'trendsIndicatorWrap' }, selection(state)),
    choiceButtons(state, trendsEnum.isSelected(state.trendStatus), selectedChoice(state)),
    container({ class: 'trendsProgress' }, plainSpan(percentString(state.trendProgress)))
  ]),
  flexRow(flexRowLastRight(actionButton('Convert', TrendConvertToVogue, trendsEnum.isFinished(state.trendStatus))))
]

export default (state) => !trendsEnum.isHidden(state.trendStatus) && panel('Trends',
  trendsEnum.isDisabled(state.trendStatus) ? trendsUnavailable : trendsAvailable(state))

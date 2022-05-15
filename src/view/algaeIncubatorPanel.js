import { text } from '../hyperapp'
import { actionButton, container, flexRow, panel, plainSpanWithMarginRight, spanBlock, toggle } from '../viewComponents'
import { decimal0dpString, percentString } from '../utils/humanize'
import { BuyPoolExpansion, AlgaeHarvestRate, ToggleAutoPutty, growthText, algaePoolExpansionAllowed, buyPoolExpansionLabel, poolUsedString, poolSizeString }
  from '../make/algaeMechanic'
import { achievedLookup, research } from '../shared/milestones'

const rateButton = (current, rate) => actionButton(percentString(rate), [AlgaeHarvestRate, rate], current !== rate)

export default (state) => achievedLookup.has(state.achieved, research.algaeIncubator) && panel('Algae incubator', [
  flexRow([
    plainSpanWithMarginRight(`Pool size: ${poolUsedString(state)}/${poolSizeString(state)}`),
    actionButton(buyPoolExpansionLabel(state), BuyPoolExpansion, algaePoolExpansionAllowed(state))
  ]),
  container(text(`Growth effectiveness: ${growthText(state)}`)),
  flexRow([
    spanBlock(text('Harvest:')),
    flexRow([
      rateButton(state.algaeHarvest, 0.1),
      rateButton(state.algaeHarvest, 0.25),
      rateButton(state.algaeHarvest, 0.5),
      rateButton(state.algaeHarvest, 0.75),
      rateButton(state.algaeHarvest, 0.9)
    ])
  ]),
  achievedLookup.has(state.achieved, research.smartWigs) && flexRow([
    container(toggle('Synapse enhancer', state.autoPutty, ToggleAutoPutty)),
    state.puttyEnhanced === 0 ? text('Idle') : text(`${decimal0dpString(state.puttyEnhanced)}/s`)
  ])
])

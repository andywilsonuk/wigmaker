import { actionButton, container, plainSpanWithMarginRight } from '../viewComponents'
import { achievedLookup, milestone } from '../shared/milestones'
import { allowed, BuyBribe, buyBribeLabel } from '../market/bribeMechanic'

export default (state) => achievedLookup.has(state.achieved, milestone.bribes) && container([
  plainSpanWithMarginRight(`Bribed politicians: ${state.bribes}`),
  actionButton(buyBribeLabel(state), BuyBribe, allowed(state))
])

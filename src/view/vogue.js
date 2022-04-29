import { actionButton, container, plainSpanWithMarginRight } from '../viewComponents'
import { achievedLookup, milestone } from '../shared/milestones'
import { UseVogue, useVogueAllowed, vogueLimitString, vogueString } from '../market/vogueMechanic'

export default (state) =>
  achievedLookup.has(state.achieved, milestone.vogue) && container([
    plainSpanWithMarginRight(`Vogue: ${vogueString(state)}/${vogueLimitString(state)}`),
    actionButton('Increase brand', UseVogue, useVogueAllowed(state))
  ])

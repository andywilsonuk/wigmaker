import { button, plainSpan } from "./simple"
import { rect, svg } from "./svg"
import { pausedCheck } from "./pausedOverlay"

export default (
  label,
  enabled,
  action,
  duration,
  remaining,
) => button({
  class: "actionButton",
  disabled: (!enabled || remaining > 0) && "disabled",
  onclick: [pausedCheck, action],
}, [
  plainSpan(label),
  svg("0 0 100 100", {
    preserveAspectRatio: "none",
    class: {
      actionButtonProgressbar: true,
      actionButtonProgressbarOn: remaining > 0,
    },
    style: {
      transform: `scaleX(${remaining / duration})`,
    },
  },
  rect(0, 0, 100, 100)),
])

import toggleFlags from "../utils/toggleFlags"
import { button, plainSpan, plainSpanWithMarginRight, spanBlock } from "./simple"
import { rect, svg } from "./svg"
import { pausedCheck } from "./pausedOverlay"

const overlayRects = (values) => values.map((x) => rect(x, 0, "100%", "100%", { class: "toggleButtonRect" }))

export default (label, flags, toggle, enabled = true) => toggleFlags.isAvailable(flags) && spanBlock([
  plainSpanWithMarginRight(label),
  button({ class: "toggleButton", onclick: [pausedCheck, toggle], disabled: !enabled && "disabled" },
    [
      plainSpan(toggleFlags.isOn(flags) ? "On" : "Off"),
      toggleFlags.isOn(flags) && svg("0 0 200 100", {
        class: "toggleButtonOverlay",
        preserveAspectRatio: "none",
      }, overlayRects([0, 40, 80, 120, 160])),
    ]),
])

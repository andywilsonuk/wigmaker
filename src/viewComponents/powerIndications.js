import { text } from "../hyperapp"
import { powerIcon } from "./icons"
import { container } from "./simple"

export const powerIndicator = (label) => container({ class: "powerIconContainer" }, powerIcon({ "aria-label": label }))
const powerIndicatorHiddenLabel = () => container({ class: "powerIconContainer" }, powerIcon({ "aria-hidden": true }))

export const offline = container({ class: "powerOffline" }, [
  text("offline"),
  powerIndicator("Offline due to low power"),
])
export const boosted = container({ class: "boosted" }, [powerIndicatorHiddenLabel(), text("boosted")])
export const lowPower = container({ class: "lowPower" }, [powerIndicatorHiddenLabel(), text("low power")])
export const safeMode = container({ class: "powerOffline" }, [powerIndicator("Safe mode due to low power"), text("safe mode")])

import { h } from "../hyperapp"
import { gamePaused } from "../shared/sceneHelpers"

export const pausedCheck = (state, action) => (gamePaused(state) ? state : action)
export default (state) => (gamePaused(state) && h("div", { class: "pausedOverlay" }))

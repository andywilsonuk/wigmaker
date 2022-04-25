import { text } from "../hyperapp"
import { pausedCheck } from "./pausedOverlay"
import { button } from "./simple"

export default (label, action, enabled = true, props) =>
  button({ class: "actionButton", disabled: !enabled && "disabled", onclick: [pausedCheck, action], ...props }, text(label))

export const actionButtonNonText = (children, action, enabled = true, props) =>
  button({ class: "actionButton", disabled: !enabled && "disabled", onclick: [pausedCheck, action], ...props }, children)

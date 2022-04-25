import { h, text } from "../hyperapp"
import { Navigate, navFlags } from "../shared/nav"
import { isTabbedMode } from "../shared/optionsManager"
import { button, logList, spanBlock } from "../viewComponents"

const incidentMessage = () => h("div", { key: "incident", class: ["logItem", "logItemIncident", "flexRow"], "aria-live": "polite" }, [
  spanBlock([text("There’s been an incident...")]),
  isTabbedMode() && button({ class: "actionButton", onclick: [Navigate, navFlags.memo] }, text("Investigate")),
])

export default (state) => [
  state.incidentId !== null && incidentMessage(),
  logList(state),
]

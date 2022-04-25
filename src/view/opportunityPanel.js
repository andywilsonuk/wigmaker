import dataProvider from "../shared/dataProvider"
import { memo } from "../hyperapp"
import { allowed, Start } from "../mesh/opportunityMechanic"
import { allocations, visualizationKey, progressMessage } from "../mesh/opportunityProgressVisual"
import { percent2dpString } from "../utils/humanize"
import { panel, actionButton, plainSpan, flexRow, flexRowLastRight, container, svg, path, styledSpan } from "../viewComponents"

const pathReducer = (pathString, { position, size }) => `${pathString} M${position} 0 h ${size}`
const progressbar = () => container({ class: "opportunityProgressbar" },
  svg("0 0 100 1", { class: "opportunityProgressbarSvg", preserveAspectRatio: "none" }, path(allocations().reduce(pathReducer, ""))))
const progressPercent = (percent) => (percent < 0.0001 ? `<${percent2dpString(0.0001)}` : percent2dpString(percent))

const item = (opportunity, progress, isAllowed, isProgressing) => container([
  flexRow([
    plainSpan(opportunity.title),
    flexRowLastRight(actionButton("Commence", [Start, opportunity], isAllowed)),
  ]),
  opportunity !== null && progress > 0 && memo(progressbar, visualizationKey()),
  opportunity !== null && progress > 0 && flexRow([
    plainSpan(progressPercent(progress / opportunity.compute)),
    isProgressing ? plainSpan(progressMessage(progress, opportunity.compute)) : styledSpan("insufficientCompute", "Insufficient compute"),
  ]),
])

export default (state) => panel("Opportunities", state.opportunity === null
  ? plainSpan("None available")
  : item(dataProvider.getById(state.opportunity.id), state.opportunity.progress, allowed(state), state.compute > 0))

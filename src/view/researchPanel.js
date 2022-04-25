import { h, text } from "../hyperapp"
import { researchAllowed, ResearchResume } from "../research/researchMechanic"
import { actionButton, container, list, listItem, plainSpan, plainRight, svg, circle, flexRow, flexRowLastRight } from "../viewComponents"
import dataProvider from "../shared/dataProvider"
import { researchPanel } from "../viewComponents/panel"
import { shortTimeString } from "../utils/humanize"
import { offline } from "../viewComponents/powerIndications"
import { StrandsResume, strandString } from "../research/strandsMechanic"

const researchItem = (state, researchItemState, research) => listItem(researchItemState.id, [
  h("h3", { class: "textBold" }, text(research.title)),
  actionButton("Research", [ResearchResume, research], researchAllowed(state, researchItemState, research)),
  plainSpan(research.cost),
  researchItemState.remaining !== 0 && plainRight(shortTimeString(researchItemState.remaining)),
  container({ class: "researchDescriptionContainer" }, text(research.description)),
])

const light = (id) => circle((id - 0.5) * 30, 15, 12, { key: id, class: "researchLight" })
const lights = container({ class: "researchLightContainer" }, svg("0 0 90 30", undefined, [
  light(1),
  light(2),
  light(3),
]))

export default (state) => researchPanel(
  "Research",
  !state.lowPower && lights,
  [
    state.research.length === 0
      ? container(plainSpan("None available"))
      : list({ class: "researchList" }, state.research.map((r) => researchItem(state, r, dataProvider.getById(r.id)))),
    flexRow([
      actionButton("Contemplate", StrandsResume, !state.strandsOn),
      plainSpan(`Strands: ${strandString(state)}`),
      flexRowLastRight(state.lowPower && offline),
    ]),
  ],
)

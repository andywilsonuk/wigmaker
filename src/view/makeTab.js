import createHandmade from "./createHandmade"
import storesPanel from "./storesPanel"
import notionsPanel from "./notionsPanel"
import machineryPanel from "./machineryPanel"
import fabricationPanel from "./fabricationPanel"
import algaeIncubatorPanel from "./algaeIncubatorPanel"
import powerPanel from "./powerPanel"
import { leftArea, rightArea, pausedOverlay, main } from "../viewComponents"
import { navFlags } from "../shared/nav"
import researchPanel from "./researchPanel"
import { achievedLookup, notion, milestone } from "../shared/milestones"
import { isTabbedMode } from "../shared/optionsManager"

const researchView = (state) => {
  if (achievedLookup.has(state.achieved, notion.research)) { return researchPanel(state) }
  if (achievedLookup.has(state.achieved, milestone.notions)) { return notionsPanel(state) }
  return undefined
}
const fabricatingView = (state) => {
  if (achievedLookup.has(state.achieved, notion.fabricator)) { return fabricationPanel(state) }
  if (achievedLookup.has(state.achieved, milestone.autoMaker)) { return machineryPanel(state) }
  return undefined
}

export default (state) => (state.navSelected === navFlags.make || !isTabbedMode()) && main([
  leftArea([
    createHandmade(state),
    fabricatingView(state),
    powerPanel(state),
    algaeIncubatorPanel(state),
    pausedOverlay(state),
  ]),
  rightArea([
    storesPanel(state),
    researchView(state),
    pausedOverlay(state),
  ]),
])

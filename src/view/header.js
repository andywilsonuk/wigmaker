import { h, text } from "../hyperapp"
import { button, container, line, path, plainSpan, rect, svg } from "../viewComponents"
import { hasNav, navFlags, Navigate } from "../shared/nav"
import { gamePaused, RunningToTitles, ToggleGameRunning } from "../shared/sceneHelpers"
import { cashCurrentString, compactMax2dpString, timeDurationString } from "../utils/humanize"
import { achievedLookup, milestone } from "../shared/milestones"
import { powerIndicator } from "../viewComponents/powerIndications"
import { devToolsActive } from "../devTools"
import { floorPrecision } from "../utils/math"
import { isTabbedMode } from "../shared/optionsManager"

const playIcon = (children) => svg("0 0 50 50", {}, children)
const pause = playIcon([line(15, 15, 15, 35), line(35, 15, 35, 35)])
const play = playIcon(path("M 21 15 L 36 25 L 21 35 z"))
const playNotAllowed = playIcon(rect(15, 15, 20, 20))

const playStateButton = (label, className, enabled, icon) =>
  button({ class: ["playStateButton", className], onclick: ToggleGameRunning, "aria-label": label, disabled: !enabled }, icon)

const runningStateButton = playStateButton("pause game", "runningButton", true, pause)
const pausedStateButton = playStateButton("resume game", "pausedButton", true, play)
const haltedStateButton = playStateButton("game halted awaiting incident response", "pausedIncidentButton", false, playNotAllowed)

const navButton = (buttonText, navOption, selected) => button({
  class: {
    navButton: true,
    navButtonSelected: selected,
  },
  disabled: selected && "disabled",
  onclick: [Navigate, navOption],
}, text(buttonText))

const isSelected = (navSelected, navOption) => navSelected === navOption

const navbar = ({ nav, navSelected }) => h("nav", { class: "navArea" }, [
  hasNav(nav, navFlags.memo) && isTabbedMode() && navButton("Memo", navFlags.memo, isSelected(navSelected, navFlags.memo)),
  hasNav(nav, navFlags.make) && isTabbedMode() && navButton("Make", navFlags.make, isSelected(navSelected, navFlags.make)),
  hasNav(nav, navFlags.market) && isTabbedMode() && navButton("Market", navFlags.market, isSelected(navSelected, navFlags.market)),
  hasNav(nav, navFlags.mesh) && isTabbedMode() && navButton("Mesh", navFlags.mesh, isSelected(navSelected, navFlags.mesh)),
  devToolsActive && !isTabbedMode() && navButton("Main", navFlags.make, isSelected(navSelected, navFlags.make)),
  devToolsActive && navButton("DevTools", navFlags.devTools, isSelected(navSelected, navFlags.devTools)),
])

const gameTimeIfAvailable = ({ gameTime }) => gameTime && plainSpan(timeDurationString(gameTime))
const wigsMadeToString = (wigsMade) => (wigsMade < 1000 ? compactMax2dpString(wigsMade) : compactMax2dpString(floorPrecision(wigsMade, 3)))

export default (state) => h("header", {}, [
  container({ class: "titleArea" }, h("h1", { class: "logoFont" }, text("wigmaker"))),
  navbar(state),
  achievedLookup.has(state.achieved, milestone.manufacture) && container({ class: "statsArea" }, [
    gameTimeIfAvailable(state),
    state.lowPower && powerIndicator("low power"),
    plainSpan(`wigs made: ${wigsMadeToString(state.wigsMade)}`),
    plainSpan(`cash: ${cashCurrentString(state.cash)}`),
  ]),
  container({ class: "menuArea" }, [
    !gamePaused(state) && runningStateButton,
    gamePaused(state) && (state.incidentId === null ? pausedStateButton : haltedStateButton),
    button({ class: "menuButton", onclick: RunningToTitles }, text("Menu")),
  ]),
])

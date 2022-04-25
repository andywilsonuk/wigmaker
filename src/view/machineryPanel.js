/* eslint-disable max-len */
import { text } from "../hyperapp"
import { fabricatingIndex, fabricatingSubtype } from "../fabrication/fabricatingEnum"
import { actionButtonNonText, button, container, list, listItem, panel, plainSpanWithCost, rect, svg } from "../viewComponents"
import * as wigMaker from "../fabrication/wigMaker"
import * as wigCapMaker from "../fabrication/wigCapMaker"
import { infiniteIcon } from "../viewComponents/icons"
import { achievedLookup, notion } from "../shared/milestones"
import { DecreaseFabricatorAllocation, IncreaseFabricatorAllocation } from "../make/fabricatorMechanic"
import { UpdateWigSelection } from "../fabrication/autoMakeWigSwitcher"
import { boostOn } from "../make/boostMechanic"

const machineryToggleButton = (allocated, action) =>
  button({
    class: {
      machineryButton: true,
      machineryButtonOff: !allocated,
      machineryButtonOn: allocated,
    },
    onclick: action,
  }, allocated ? infiniteIcon({ "aria-label": "on" }) : text("0"))

const progressbar = (duration, progress, boosted) =>
  container({ class: "machineryProgress" },
    svg("0 0 100 100", {
      preserveAspectRatio: "none",
      class: {
        machineryProgressbar: true,
        machineryProgressbarBoosted: boosted,
      },
      style: {
        transform: `scaleX(${Math.min(1, progress / duration)})`,
      },
    }, rect(0, 0, 100, 100)))

const machineryItem = (id, { allocated, progress }, nameChild, duration, boosted) =>
  listItem(id, [
    machineryToggleButton(allocated !== 0, allocated === 0 ? [IncreaseFabricatorAllocation, id] : [DecreaseFabricatorAllocation, id]),
    container(nameChild),
    progressbar(duration, progress, boosted),
  ])

const wigOptionButton = (label, nextSubtype) =>
  actionButtonNonText(label, [UpdateWigSelection, nextSubtype || fabricatingSubtype.hair], true, { class: ["actionButton", "machineryWigSwitch"] })

const wigOption = new Map([
  [fabricatingSubtype.hair, () => wigOptionButton(
    plainSpanWithCost("Hair wig", wigMaker.cost(fabricatingSubtype.hair)),
    fabricatingSubtype.nylon,
  )],
  [fabricatingSubtype.nylon, () => wigOptionButton(
    plainSpanWithCost("Nylon wig", wigMaker.cost(fabricatingSubtype.nylon)),
    fabricatingSubtype.hair,
  )],
])

export default (state) => panel("Machinery", [
  list({ class: "machineryList" }, [
    achievedLookup.has(state.achieved, notion.wigs1) && machineryItem(
      fabricatingIndex.wig,
      state.fabricating[fabricatingIndex.wig],
      achievedLookup.has(state.achieved, notion.nylonWigs)
        ? wigOption.get(state.wigMakerSubtype)()
        : plainSpanWithCost("Wig", wigMaker.cost(fabricatingSubtype.hair)),
      wigMaker.duration(state),
      boostOn(state),
    ),
    achievedLookup.has(state.achieved, notion.wigCap1) && machineryItem(
      fabricatingIndex.wigCap,
      state.fabricating[fabricatingIndex.wigCap],
      plainSpanWithCost("Wig cap", wigCapMaker.cost()),
      wigCapMaker.duration(state),
      boostOn(state),
    ),
  ]),
])

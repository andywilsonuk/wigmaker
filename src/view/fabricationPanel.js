import { text } from '../hyperapp'
import { fabricatingIndex, fabricatingSubtype } from '../fabrication/fabricatingEnum'
import { container, panel, plainSpan, plainSpanWithCost, flexRow, actionButton, tableRow, table, tableCell, actionButtonNonText } from '../viewComponents'
import { wigMaker, wigCapMaker, wigletMaker, microComputeMaker, smartChipMaker } from '../fabrication/makers'
import { compact2dpString, decimal0dpString, decimal1dpString, percentString } from '../utils/humanize'
import { achievedLookup, notion, research } from '../shared/milestones'
import { boosted, lowPower } from '../viewComponents/powerIndications'
import {
  BuyFabricator, buyFabricatorAllowed, SetFabricationActionQuantity, DecreaseFabricatorAllocation, IncreaseFabricatorAllocation,
  actionQuantitySwitchAllowed, nextActionQuantity, buyFabricatorLabel
} from '../make/fabricatorMechanic'
import { BuyHyperFab, buyHyperFabAllowed, buyHyperFabLabel } from '../make/hyperFabMechanic'
import { UpdateWigSelection } from '../fabrication/autoMakeWigSwitcher'
import { decreaseIcon, increaseIcon, stalledIcon } from '../viewComponents/icons'
import { boostOn } from '../make/boostMechanic'

const ratePerSecond = (rate, allocated) => {
  if (allocated > 0 && rate !== 0 && rate < 0.1) { return `<${decimal1dpString(0.1)}/s` }
  if (rate < 100) { return `${decimal1dpString(rate)}/s` }
  if (rate < 10000) { return `${decimal0dpString(rate)}/s` }
  return `${compact2dpString(rate)}/s`
}

const fabricatorItem = (id, label, { rate, allocated, starved }, unallocated) => tableRow({ key: id }, [
  tableCell(label),
  tableCell({ class: ['fabricationStalledIcon', starved && allocated > 0 && 'fabricationStalledIconShow'] }, stalledIcon()),
  tableCell(text(ratePerSecond(rate, allocated))),
  tableCell({ class: 'allocationButtonCell' },
    actionButtonNonText(decreaseIcon({ class: 'allocationChangeIcon' }), [DecreaseFabricatorAllocation, id], allocated > 0, { 'aria-label': 'Decrease allocation' })),
  tableCell(plainSpan(allocated)),
  tableCell({ class: 'allocationButtonCell' },
    actionButtonNonText(increaseIcon({ class: 'allocationChangeIcon' }), [IncreaseFabricatorAllocation, id], unallocated > 0, { 'aria-label': 'Increase allocation' }))
])

const wigOptionButton = (label, nextSubtype) =>
  actionButtonNonText(label, [UpdateWigSelection, nextSubtype || fabricatingSubtype.hair], true, { class: ['actionButton', 'machineryWigSwitch'] })

const achievementMap = new Map([
  [notion.nylonWigs, fabricatingSubtype.nylon],
  [notion.siliconeWigs, fabricatingSubtype.silicone],
  [research.algaeIncubator, fabricatingSubtype.algae],
  [research.smartWigs, fabricatingSubtype.smart]
])
const nextSubtype = (available, desired) =>
  (achievedLookup.has(available, desired) ? achievementMap.get(desired) : fabricatingSubtype.hair)

const wigOption = new Map([
  [fabricatingSubtype.hair, (available) => wigOptionButton(
    plainSpanWithCost('Hair wig', wigMaker.cost(fabricatingSubtype.hair)),
    nextSubtype(available, notion.nylonWigs)
  )],
  [fabricatingSubtype.nylon, (available) => wigOptionButton(
    plainSpanWithCost('Nylon wig', wigMaker.cost(fabricatingSubtype.nylon)),
    nextSubtype(available, notion.siliconeWigs)
  )],
  [fabricatingSubtype.silicone, (available) => wigOptionButton(
    plainSpanWithCost('Silicone wig', wigMaker.cost(fabricatingSubtype.silicone)),
    nextSubtype(available, research.algaeIncubator)
  )],
  [fabricatingSubtype.algae, (available) => wigOptionButton(
    plainSpanWithCost('Algae wig', wigMaker.cost(fabricatingSubtype.algae)),
    nextSubtype(available, research.smartWigs)
  )],
  [fabricatingSubtype.smart, () => wigOptionButton(
    plainSpanWithCost('Smart wig', wigMaker.cost(fabricatingSubtype.smart)),
    fabricatingSubtype.hair
  )]
])

const powerModifyNotifications = (state, isBoosted) => (isBoosted || state.lowPower) && flexRow(isBoosted ? boosted : lowPower)

const fabActionQuantity = ({ fabricators, fabricatorActionQuantity }) => actionQuantitySwitchAllowed(fabricators) && actionButton(
  `${fabricatorActionQuantity}x`,
  [SetFabricationActionQuantity, nextActionQuantity(fabricators, fabricatorActionQuantity)],
  true,
  { 'aria-label': `Currently set to adjust in multiples of ${fabricatorActionQuantity}` }
)

export default (state) =>
  panel('Fabrication', [
    table('fabricationTable', [
      fabricatorItem(
        fabricatingIndex.wig,
        wigOption.get(state.wigMakerSubtype)(state.achieved),
        state.fabricating[fabricatingIndex.wig],
        state.fabricatorsUnallocated
      ),
      fabricatorItem(
        fabricatingIndex.wigCap,
        plainSpanWithCost('Wig cap', wigCapMaker.cost()),
        state.fabricating[fabricatingIndex.wigCap],
        state.fabricatorsUnallocated
      ),
      achievedLookup.has(state.achieved, notion.wiglets) && fabricatorItem(
        fabricatingIndex.wiglet,
        plainSpanWithCost('Wiglet', wigletMaker.cost()),
        state.fabricating[fabricatingIndex.wiglet],
        state.fabricatorsUnallocated
      ),
      achievedLookup.has(state.achieved, research.microCompute) && !achievedLookup.has(state.achieved, research.microBio) && fabricatorItem(
        fabricatingIndex.micro,
        plainSpanWithCost('Micro compute', microComputeMaker.cost(fabricatingSubtype.micro)),
        state.fabricating[fabricatingIndex.micro],
        state.fabricatorsUnallocated
      ),
      achievedLookup.has(state.achieved, research.microBio) && fabricatorItem(
        fabricatingIndex.micro,
        plainSpanWithCost('Micro+bio', microComputeMaker.cost(fabricatingSubtype.microBio)),
        state.fabricating[fabricatingIndex.micro],
        state.fabricatorsUnallocated
      ),
      achievedLookup.has(state.achieved, research.smartWigs) && fabricatorItem(
        fabricatingIndex.smartChip,
        plainSpanWithCost('Smart chip', smartChipMaker.cost()),
        state.fabricating[fabricatingIndex.smartChip],
        state.fabricatorsUnallocated
      )
    ]),
    flexRow([
      plainSpan(`Fabricators: ${state.fabricators}`),
      fabActionQuantity(state),
      actionButton(buyFabricatorLabel(state), BuyFabricator, buyFabricatorAllowed(state)),
      powerModifyNotifications(state, boostOn(state))
    ]),
    achievedLookup.has(state.achieved, research.hyperFab) && flexRow([
      plainSpan(`hyperFabs: ${state.fabricatorHyper}`),
      actionButton(buyHyperFabLabel(state), BuyHyperFab, buyHyperFabAllowed(state))
    ]),
    state.fabricatorMultiplier > 1 && container(text(`${percentString(state.fabricatorMultiplier)} efficiency`))
  ])

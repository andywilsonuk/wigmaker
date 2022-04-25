import { text } from "../hyperapp"
import { actionButton, container, flexRow, panel, progressButton, spanBlock, styledSpan, table, tableCell, tableRow } from "../viewComponents"
import { percentString } from "../utils/humanize"
import { achievedLookup, notion } from "../shared/milestones"
import { boostAllowed, Boost, boostDuration } from "../make/boostMechanic"
import { buyPowerAllowed, BuyPowerGrid, buyPowerLabel, BuyPowerSolar, BuyPowerWind, powerDemandString,
  powerSupplyId, powerSupplyName, powerSupplyString, supplyMutliplier } from "../make/powerMechanic"

const supplyDemandInfo = (state) => container([
  spanBlock([
    styledSpan(state.lowPower && "lowPower", `${powerDemandString(state)}`),
    text(` demand, ${powerSupplyString(state)} supply`),
  ]),
  spanBlock(progressButton("Boost", boostAllowed(state), Boost, boostDuration, state.boostRemaining)),
])
const buyGrid = (state) => actionButton(buyPowerLabel(state, powerSupplyId.grid), BuyPowerGrid, buyPowerAllowed(state, powerSupplyId.grid))
const buySolar = (state) => actionButton(buyPowerLabel(state, powerSupplyId.solar), BuyPowerSolar, buyPowerAllowed(state, powerSupplyId.solar))
const buyWind = (state) => actionButton(buyPowerLabel(state, powerSupplyId.wind), BuyPowerWind, buyPowerAllowed(state, powerSupplyId.wind))
const supplyTypeToClass = (supplyId) => {
  switch (supplyId) {
    case powerSupplyId.initial:
    case powerSupplyId.grid: return ["powerCell", "powerCellGrid"]
    case powerSupplyId.solar: return ["powerCell", "powerCellSolar"]
    case powerSupplyId.wind: return ["powerCell", "powerCellWind"]
    default: throw new Error(`Supply id fail ${supplyId}`)
  }
}
const supplyCell = (supplyId) => styledSpan(supplyTypeToClass(supplyId), powerSupplyName(supplyId))
const cellBasedLayout = (state) => container({ class: "powerCells" }, state.powerSupply.map((supply) => supplyCell(supply)))
const countForType = (supply, supplyId) => supply.filter((s) => s === supplyId).length
const typeBasedLayout = (state, supplyId, buyButton) => tableRow([
  tableCell({ class: supplyTypeToClass(supplyId) }, text(powerSupplyName(supplyId))),
  tableCell(text(`${countForType(state.powerSupply, supplyId)} @ ${percentString(supplyMutliplier(state, supplyId))}`)),
  tableCell(buyButton(state)),
])
const voidLayout = container({ class: "powerVoid" }, text("Void"))

const displaySwitch = (state) => {
  const { powerSupply } = state
  if (powerSupply[0] === powerSupplyId.void) { return voidLayout }
  if (powerSupply.length < 15) {
    return [
      supplyDemandInfo(state),
      cellBasedLayout(state),
      flexRow([buyGrid(state), buySolar(state), buyWind(state)]),
    ]
  }
  return [
    supplyDemandInfo(state),
    table("powerTypeBasedLayout", [
      typeBasedLayout(state, powerSupplyId.grid, buyGrid),
      typeBasedLayout(state, powerSupplyId.solar, buySolar),
      typeBasedLayout(state, powerSupplyId.wind, buyWind),
    ]),
  ]
}
export default (state) => achievedLookup.has(state.achieved, notion.power) && panel("Power", displaySwitch(state))

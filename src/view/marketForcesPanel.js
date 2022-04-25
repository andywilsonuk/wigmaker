import { h, text } from "../hyperapp"
import bribes from "./bribes"
import vogue from "./vogue"
import { button, container, panel, separator, table, tableCell, tableHeader, tableRow } from "../viewComponents"
import { compact0dpString, decimalString, percentString } from "../utils/humanize"
import { achievedLookup, notion, research } from "../shared/milestones"
import pricingCalculator from "../market/pricingCalculator"
import { viewChangeIcon } from "../viewComponents/icons"
import toggleFlags from "../utils/toggleFlags"
import { ToggleMarketForcesView } from "../market/forces"

const blank = "-"

const formatRowNumber = (value) => {
  if (value === 0) { return 0 }
  if (value < 99999) { return decimalString(value) }
  return compact0dpString(value)
}

const row = (name, stock, orders, price) =>
  tableRow([
    tableCell(text(name)),
    tableCell(text(formatRowNumber(stock))),
    tableCell(text(orders === blank ? blank : formatRowNumber(orders))),
    tableCell(text(price)),
  ])

const ordersTable = ({
  achieved, wigsHair, wigsNylon, wigsSilicone, wigsAlgae, wigsSmart, wiglets,
  orders: [wigHairOrders, wigNylonOrders, wigSiliconeOrders, wigAlgaeOrders, wigSmartOrders],
}, prices) =>
  table("orders", [
    tableRow([
      tableHeader(),
      tableHeader(text("Stock")),
      tableHeader(text("Orders")),
      tableHeader(text("Unit Price")),
    ]),
    row("Hair", wigsHair, wigHairOrders, prices.wigHairText),
    achievedLookup.has(achieved, notion.nylonWigs) && row("Nylon", wigsNylon, wigNylonOrders, prices.wigNylonText),
    achievedLookup.has(achieved, notion.siliconeWigs) && row("Silicone", wigsSilicone, wigSiliconeOrders, prices.wigSiliconeText),
    achievedLookup.has(achieved, research.algaeIncubator) && row("Algae", wigsAlgae, wigAlgaeOrders, prices.wigAlgaeText),
    achievedLookup.has(achieved, research.smartWigs) && row("Smart", wigsSmart, wigSmartOrders, prices.wigSmartText),
    achievedLookup.has(achieved, notion.wiglets) && row("Wiglet", wiglets, blank, prices.wigletText),
  ])

const altView = ({ wigsSmart, achieved, orders: [, , , , wigSmartOrders], smartWigsFulfillment, wiglets }) => h("fieldset", { class: "ordersAltViewContainer" }, [
  h("legend", {}, text("Smart wigs")),
  table("ordersAltView", [
    tableRow([
      tableHeader(text("Stock")),
      h("td", {}, text(decimalString(wigsSmart))),
    ]),
    tableRow([
      tableHeader(text("Orders")),
      tableCell(text(decimalString(wigSmartOrders))),
    ]),
  ]),
  container(text(`Stock vs orders: ${achievedLookup.has(achieved, research.demandLinking) ? "demand linked" : percentString(smartWigsFulfillment)}`)),
  container(text(`Wiglets: ${decimalString(wiglets)}`)),
])

const viewSwitcher = (state) => toggleFlags.isAvailable(state.marketForcesAltView)
  && container({ class: "ordersViewSwitchContainer" }, button({ class: "ordersViewSwitch", onclick: ToggleMarketForcesView }, viewChangeIcon()))

export default (state) => panel("Forces", [
  toggleFlags.isOn(state.marketForcesAltView) ? altView(state) : ordersTable(state, pricingCalculator(state)),
  viewSwitcher(state),
  separator(),
  container([
    text(`Brand value: ${decimalString(state.brand)} (+${state.brandMultiplier} per sale)`),
  ]),
  vogue(state),
  bribes(state),
])

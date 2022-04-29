import { text } from '../hyperapp'
import { actionButton, panel, table, tableCell, tableRow, toggle } from '../viewComponents'
import { decimalString } from '../utils/humanize'
import { achievedLookup, notion, research, milestone } from '../shared/milestones'
import { BuyHair, buyHairAllowed, buyHairLabel } from '../make/hairMechanic'
import { BuyNylon, buyNylonAllowed, buyNylonLabel } from '../make/nylonMechanic'
import { BuyWigCaps, buyWigCapsAllowed, buyWigCapsLabel } from '../make/wigCapMechanic'
import { BuySilicon, buySiliconAllowed, buySiliconLabel, ToggleAutoSilicon } from '../make/siliconMechanic'
import toggleFlags from '../utils/toggleFlags'

const row = (name, value, third) =>
  tableRow([
    tableCell(text(name)),
    tableCell(text(value != null ? decimalString(value) : '-')),
    tableCell({ class: 'flexRow' }, third ?? [])
  ])

const hairRow = (state) => row('Hair', state.hair, actionButton(buyHairLabel(state), BuyHair, buyHairAllowed(state)))
const wigCapsRow = (state) => row('Wig caps', state.wigCaps, actionButton(buyWigCapsLabel(state), BuyWigCaps, buyWigCapsAllowed(state)))
const nylonRow = (state) => achievedLookup.has(state.achieved, notion.wigCap1) &&
  row('Nylon', state.nylon, actionButton(buyNylonLabel(state), BuyNylon, buyNylonAllowed(state)))
const siliconRow = (state) => (achievedLookup.has(state.achieved, notion.siliconeWigs) || state.silicon > 0) && row('Silicon', state.silicon, [
  actionButton(buySiliconLabel(state), BuySilicon, buySiliconAllowed(state)),
  toggle('AutoSilicon', state.autoSilicon, ToggleAutoSilicon)
])
const algaeRow = (state) => achievedLookup.has(state.achieved, research.algaeIncubator) && row('Algae', state.algae)
const synapticPuttyRow = (state) =>
  toggleFlags.isAvailable(state.autoPutty) && row('Synaptic putty', undefined, text(toggleFlags.isOn(state.autoPutty) ? 'Enhanced on-demand' : 'Enhancer off'))
const wigsRow = (state) => row('Wigs', state.wigs)
const wigletsRow = (state) => achievedLookup.has(state.achieved, notion.wiglets) && row('Wiglets', state.wiglets)
const smartChipRow = (state) => achievedLookup.has(state.achieved, research.smartWigs) && row('Smart chips', state.smartChips)
const microComputeRow = (state) => achievedLookup.has(state.achieved, research.microCompute) && row('Micro compute', state.micro)
const microBioRow = (state) => achievedLookup.has(state.achieved, research.microBio) && row('Micro+bio', state.microBio)

export default (state) => achievedLookup.has(state.achieved, milestone.manufacture) && panel('Stores', [
  table('stores', [
    hairRow(state),
    wigCapsRow(state),
    nylonRow(state),
    siliconRow(state),
    algaeRow(state),
    synapticPuttyRow(state),
    wigsRow(state),
    wigletsRow(state),
    smartChipRow(state),
    microComputeRow(state),
    microBioRow(state)
  ])
])

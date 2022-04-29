import pricingCalculator from './pricingCalculator'
import { randomInt } from '../utils/random'
import { weightedRate } from '../utils/rateCounter'

const calcWigletSales = (totalSales) => randomInt(totalSales / 2, totalSales - totalSales / 2 + 1)

export const brandUpdateForSalesTransform = (state, quantity) => ({ brand: state.brand + quantity * state.brandMultiplier })

export default (state) => {
  const { brand, orders: [wigHairOrders, wigNylonOrders, wigSiliconeOrders, wigAlgaeOrders, wigSmartOrders], smartWigsFulfillment } = state

  if (brand === 0) { return state }
  const prices = pricingCalculator(state)
  const hairWigSales = Math.min(state.wigsHair, wigHairOrders)
  const nylonWigSales = Math.min(state.wigsNylon, wigNylonOrders)
  const siliconeWigSales = Math.min(state.wigsSilicone, wigSiliconeOrders)
  const algaeWigSales = Math.min(state.wigsAlgae, wigAlgaeOrders)
  const smartWigSales = Math.min(state.wigsSmart, wigSmartOrders)

  const totalSales = hairWigSales + nylonWigSales + siliconeWigSales + algaeWigSales + smartWigSales
  if (totalSales === 0) {
    if (smartWigsFulfillment === 0) { return state }
    return {
      ...state,
      smartWigsFulfillment: 0
    }
  }

  const updatedOrders = [
    wigHairOrders - hairWigSales,
    wigNylonOrders - nylonWigSales,
    wigSiliconeOrders - siliconeWigSales,
    wigAlgaeOrders - algaeWigSales,
    wigSmartOrders - smartWigSales
  ]
  const wigletSales = Math.min(state.wiglets, calcWigletSales(totalSales))

  return {
    ...state,
    wigs: state.wigs - totalSales,
    wigsHair: state.wigsHair - hairWigSales,
    wigsNylon: state.wigsNylon - nylonWigSales,
    wigsSilicone: state.wigsSilicone - siliconeWigSales,
    wigsAlgae: state.wigsAlgae - algaeWigSales,
    wigsSmart: state.wigsSmart - smartWigSales,
    wiglets: state.wiglets - wigletSales,
    orders: updatedOrders,
    ...brandUpdateForSalesTransform(state, totalSales),
    smartWigsSold: state.smartWigsSold + smartWigSales,
    smartWigsFulfillment: weightedRate(state.wigsSmart / wigSmartOrders, state.smartWigsFulfillment),
    cash: state.cash +
    prices.wigHair * hairWigSales +
    prices.wigNylon * nylonWigSales +
    prices.wigSilicone * siliconeWigSales +
    prices.wigAlgae * algaeWigSales +
    prices.wigSmart * smartWigSales +
    prices.wiglet * wigletSales
  }
}

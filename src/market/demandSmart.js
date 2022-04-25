import { oneHundredMillion, oneHundredThousand, tenMillion } from "../shared/bigNumbers"
import { achievedLookup, research } from "../shared/milestones"
import { sumArray } from "../utils/math"

export const demandPerSecond = (brand) => (brand / oneHundredThousand) * 13

const ordersCap = ({ brand }) => {
  if (brand < oneHundredMillion) { return oneHundredThousand }
  return Math.ceil(brand / tenMillion) * 10000
}

export const demandTransform = (state, orderQuantity) => {
  if (orderQuantity === 0) { return undefined }
  const { orders, achieved, wigsSmart } = state
  const totalOrders = sumArray(orders)
  const cap = ordersCap(state)

  const existingSmartOrders = orders[4]
  const newSmartOrders = achievedLookup.has(achieved, research.demandLinking) ? wigsSmart : existingSmartOrders + Math.min(orderQuantity, cap - totalOrders)
  if (newSmartOrders <= 0) { return undefined }

  return {
    orders: orders.map((existing, index) => (index === 4 ? newSmartOrders : existing)),
  }
}

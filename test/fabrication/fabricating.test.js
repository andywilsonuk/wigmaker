import { progressLine } from "../../src/fabrication/fabricating"
import { fabricatingSubtype } from "../../src/fabrication/fabricatingEnum"
import { nylonState, siliconState, wigStockState } from "../testUtils"

const nylonPerMake = 2
const siliconPerMake = 1
const durationOfOne = 10
let fakeMaker

beforeEach(() => {
  fakeMaker = {
    duration: () => durationOfOne,
    resourceMax: ({ nylon, silicon }, subtype) =>
      (subtype === fabricatingSubtype.nylon ? Math.floor(nylon / nylonPerMake) : Math.floor(silicon / siliconPerMake)),
    costTransform: ({ nylon, silicon }, started, subtype) =>
      (subtype === fabricatingSubtype.nylon ? { nylon: nylon - (started * nylonPerMake) } : { silicon: silicon - (started * siliconPerMake) }),
    madeTransform: ({ wigsNylon, wigsSilicone }, made, subtype) =>
      (subtype === fabricatingSubtype.nylon ? { ...wigStockState([0, wigsNylon + made, wigsSilicone, 0, 0]) } : { ...wigStockState([0, wigsNylon, wigsSilicone + made, 0, 0]) }),
  }
})
const fabricationLine = ({ allocated = 1, progress = 0, rate = 0, starved = false, subtype = fabricatingSubtype.nylon }) =>
  ({ allocated, progress, rate, starved, subtype })
test("Fab 1 unit when has stock", () => {
  const state = { ...nylonState(10), ...wigStockState([0, 0, 0, 0, 0]) }
  const line = fabricationLine({})
  const newSubtype = fabricatingSubtype.nylon
  const deltaTime = durationOfOne

  const [updatedLine, updatedState, makeRate] = progressLine(state, line, newSubtype, fakeMaker, deltaTime)

  expect(updatedLine).toStrictEqual(fabricationLine({}))
  expect(updatedState).toStrictEqual({ ...nylonState(8), ...wigStockState([0, 1, 0, 0, 0]) })
  expect(makeRate).toBe(1)
})
test("Fab 0 units when has no stock", () => {
  const state = { ...nylonState(0), ...wigStockState([0, 0, 0, 0, 0]) }
  const line = fabricationLine({})
  const newSubtype = fabricatingSubtype.nylon
  const deltaTime = durationOfOne

  const [updatedLine, updatedState, makeRate] = progressLine(state, line, newSubtype, fakeMaker, deltaTime)

  expect(updatedLine).toStrictEqual(fabricationLine({ starved: true }))
  expect(updatedState).toStrictEqual(state)
  expect(makeRate).toBe(0)
})
test("Fab 0 units when no allocation", () => {
  const state = { ...nylonState(0), ...wigStockState([0, 0, 0, 0, 0]) }
  const line = fabricationLine({ allocated: 0 })
  const newSubtype = fabricatingSubtype.nylon
  const deltaTime = durationOfOne

  const [updatedLine, updatedState, makeRate] = progressLine(state, line, newSubtype, fakeMaker, deltaTime)

  expect(updatedLine).toStrictEqual(undefined)
  expect(updatedState).toStrictEqual(undefined)
  expect(makeRate).toBe(undefined)
})
test("Fab 3 units when multiple allocated", () => {
  const state = { ...nylonState(10), ...wigStockState([0, 0, 0, 0, 0]) }
  const line = fabricationLine({ allocated: 3 })
  const newSubtype = fabricatingSubtype.nylon
  const deltaTime = durationOfOne

  const [updatedLine, updatedState, makeRate] = progressLine(state, line, newSubtype, fakeMaker, deltaTime)

  expect(updatedLine).toStrictEqual(fabricationLine({ allocated: 3 }))
  expect(updatedState).toStrictEqual({ ...nylonState(4), ...wigStockState([0, 3, 0, 0, 0]) })
  expect(makeRate).toBe(3)
})
test("Fab 0.5 units", () => { // 1 completely made another in-progress, resources for both taken
  const state = { ...nylonState(10), ...wigStockState([0, 0, 0, 0, 0]) }
  const line = fabricationLine({})
  const newSubtype = fabricatingSubtype.nylon
  const deltaTime = durationOfOne + 5

  const [updatedLine, updatedState, makeRate] = progressLine(state, line, newSubtype, fakeMaker, deltaTime)

  expect(updatedLine).toStrictEqual(fabricationLine({ progress: 5 }))
  expect(updatedState).toStrictEqual({ ...nylonState(6), ...wigStockState([0, 1, 0, 0, 0]) })
  expect(makeRate).toBe(1.5)
})
test("Fab 2 units when has existing progress", () => {
  const state = { ...nylonState(10), ...wigStockState([0, 0, 0, 0, 0]) }
  const line = fabricationLine({ allocated: 2, progress: 5 })
  const newSubtype = fabricatingSubtype.nylon
  const deltaTime = durationOfOne + 1

  const [updatedLine, updatedState, makeRate] = progressLine(state, line, newSubtype, fakeMaker, deltaTime)

  expect(updatedLine).toStrictEqual(fabricationLine({ allocated: 2, progress: 7 }))
  expect(updatedState).toStrictEqual({ ...nylonState(6), ...wigStockState([0, 2, 0, 0, 0]) })
  expect(makeRate).toBe(2.2)
})
test("Fab 0 units when progress not enough", () => {
  const state = { ...nylonState(10), ...wigStockState([0, 0, 0, 0, 0]) }
  const line = fabricationLine({ progress: 2 })
  const newSubtype = fabricatingSubtype.nylon
  const deltaTime = 3

  const [updatedLine, updatedState, makeRate] = progressLine(state, line, newSubtype, fakeMaker, deltaTime)

  expect(updatedLine).toStrictEqual(fabricationLine({ progress: 5 }))
  expect(updatedState).toStrictEqual({ ...nylonState(10), ...wigStockState([0, 0, 0, 0, 0]) })
  expect(makeRate).toBe(0.3)
})
test("Fab 0 units when no resources", () => {
  const state = { ...nylonState(0), ...wigStockState([0, 0, 0, 0, 0]) }
  const line = fabricationLine({})
  const newSubtype = fabricatingSubtype.nylon
  const deltaTime = durationOfOne

  const [updatedLine, updatedState, makeRate] = progressLine(state, line, newSubtype, fakeMaker, deltaTime)

  expect(updatedLine).toStrictEqual(fabricationLine({ starved: true }))
  expect(updatedState).toStrictEqual(state)
  expect(makeRate).toBe(0)
})
test("Fab 1 unit from progress when no more resources", () => {
  const state = { ...nylonState(0), ...wigStockState([0, 0, 0, 0, 0]) }
  const line = fabricationLine({ progress: 5 })
  const newSubtype = fabricatingSubtype.nylon
  const deltaTime = durationOfOne

  const [updatedLine, updatedState, makeRate] = progressLine(state, line, newSubtype, fakeMaker, deltaTime)

  expect(updatedLine).toStrictEqual(fabricationLine({ progress: 0, starved: true }))
  expect(updatedState).toStrictEqual({ ...nylonState(0), ...wigStockState([0, 1, 0, 0, 0]) })
  expect(makeRate).toBe(0.5)
})
test("Fab 0 units continuation progress when no more resources", () => {
  const state = { ...nylonState(0), ...wigStockState([0, 0, 0, 0, 0]) }
  const line = fabricationLine({ progress: 5 })
  const newSubtype = fabricatingSubtype.nylon
  const deltaTime = 3

  const [updatedLine, updatedState, makeRate] = progressLine(state, line, newSubtype, fakeMaker, deltaTime)

  expect(updatedLine).toStrictEqual(fabricationLine({ progress: 8 }))
  expect(updatedState).toStrictEqual({ ...nylonState(0), ...wigStockState([0, 0, 0, 0, 0]) })
  expect(makeRate).toBe(0.3)
})
test("Fab 1 units continuation progress when enough time only to start new", () => {
  const state = { ...nylonState(nylonPerMake), ...wigStockState([0, 0, 0, 0, 0]) }
  const line = fabricationLine({ progress: 5 })
  const newSubtype = fabricatingSubtype.nylon
  const deltaTime = 6

  const [updatedLine, updatedState, makeRate] = progressLine(state, line, newSubtype, fakeMaker, deltaTime)

  expect(updatedLine).toStrictEqual(fabricationLine({ progress: 1 }))
  expect(updatedState).toStrictEqual({ ...nylonState(0), ...wigStockState([0, 1, 0, 0, 0]) })
  expect(makeRate).toBe(0.6)
})
test("Fab 1 unit when resources allow one even through multiple allocates", () => {
  const state = { ...nylonState(nylonPerMake), ...wigStockState([0, 0, 0, 0, 0]) }
  const line = fabricationLine({ allocated: 2 })
  const newSubtype = fabricatingSubtype.nylon
  const deltaTime = durationOfOne + 1

  const [updatedLine, updatedState, makeRate] = progressLine(state, line, newSubtype, fakeMaker, deltaTime)

  expect(updatedLine).toStrictEqual(fabricationLine({ allocated: 2, progress: 0, starved: true }))
  expect(updatedState).toStrictEqual({ ...nylonState(0), ...wigStockState([0, 1, 0, 0, 0]) })
  expect(makeRate).toBe(1)
})
test("Fab 1 unit when subtype change immediate due to nothing in-progress", () => {
  const state = { ...nylonState(10), ...siliconState(5), ...wigStockState([0, 0, 0, 0, 0]) }
  const line = fabricationLine({ subtype: fabricatingSubtype.nylon })
  const newSubtype = fabricatingSubtype.silicone
  const deltaTime = durationOfOne

  const [updatedLine, updatedState, makeRate] = progressLine(state, line, newSubtype, fakeMaker, deltaTime)

  expect(updatedLine).toStrictEqual(fabricationLine({ progress: 0, subtype: fabricatingSubtype.silicone }))
  expect(updatedState).toStrictEqual({ ...nylonState(10), ...siliconState(5 - siliconPerMake), ...wigStockState([0, 0, 1, 0, 0]) })
  expect(makeRate).toBe(1)
})
test("Fab 1 unit when subtype change finishes one in-progress then subtype others", () => {
  const state = { ...nylonState(10), ...siliconState(5), ...wigStockState([0, 0, 0, 0, 0]) }
  const line = fabricationLine({ allocated: 2, progress: 5, subtype: fabricatingSubtype.nylon })
  const newSubtype = fabricatingSubtype.silicone
  const deltaTime = durationOfOne + 1

  const [updatedLine, updatedState, makeRate] = progressLine(state, line, newSubtype, fakeMaker, deltaTime)

  expect(updatedLine).toStrictEqual(fabricationLine({ allocated: 2, progress: 7, subtype: fabricatingSubtype.silicone }))
  expect(updatedState).toStrictEqual({ ...nylonState(10), ...siliconState(5 - (siliconPerMake * 2)), ...wigStockState([0, 1, 1, 0, 0]) })
  expect(makeRate).toBe(2.2)
})
test("Fab 1 unit when subtype change immediate but no stock", () => {
  const state = { ...nylonState(10), ...siliconState(0), ...wigStockState([0, 0, 0, 0, 0]) }
  const line = fabricationLine({ subtype: fabricatingSubtype.nylon })
  const newSubtype = fabricatingSubtype.silicone
  const deltaTime = durationOfOne + 1

  const [updatedLine, updatedState, makeRate] = progressLine(state, line, newSubtype, fakeMaker, deltaTime)

  expect(updatedLine).toStrictEqual(fabricationLine({ progress: 0, subtype: fabricatingSubtype.silicone, starved: true }))
  expect(updatedState).toStrictEqual(state)
  expect(makeRate).toBe(0)
})
test("Fab 0 units when subtype change still pending", () => {
  const state = { ...nylonState(10), ...siliconState(0), ...wigStockState([0, 0, 0, 0, 0]) }
  const line = fabricationLine({ progress: 2, subtype: fabricatingSubtype.nylon })
  const newSubtype = fabricatingSubtype.silicone
  const deltaTime = 3

  const [updatedLine, updatedState, makeRate] = progressLine(state, line, newSubtype, fakeMaker, deltaTime)

  expect(updatedLine).toStrictEqual(fabricationLine({ progress: 5, subtype: fabricatingSubtype.nylon }))
  expect(updatedState).toStrictEqual(state)
  expect(makeRate).toBe(0.3)
})
test("Fab 100 units when no more resources", () => {
  const state = { ...nylonState(nylonPerMake * 10), ...wigStockState([0, 0, 0, 0, 0]) }
  const line = fabricationLine({ allocated: 100, progress: 0 })
  const newSubtype = fabricatingSubtype.nylon
  const deltaTime = durationOfOne

  const [updatedLine, updatedState, makeRate] = progressLine(state, line, newSubtype, fakeMaker, deltaTime)

  expect(makeRate).toBe(10)
  expect(updatedLine).toStrictEqual(fabricationLine({ allocated: 100, progress: 0, starved: true }))
  expect(updatedState).toStrictEqual({ ...nylonState(0), ...wigStockState([0, 10, 0, 0, 0]) })
})

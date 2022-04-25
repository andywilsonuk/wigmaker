import Memorization from "../../src/utils/memorization"

const source = { a: 1 }
const calculated = { b: 2 }

test("First time", () => {
  const mockCalc = jest.fn(() => calculated)
  const memo = new Memorization(mockCalc)

  const result = memo.get(source)

  expect(result).toBe(calculated)
  expect(mockCalc.mock.calls[0][0]).toBe(source)
})
test("Same source", () => {
  const mockCalc = jest.fn(() => calculated)
  const memo = new Memorization(mockCalc)

  memo.get(source)
  memo.get(source)

  expect(mockCalc.mock.calls.length).toBe(1)
})
test("Changed source", () => {
  const mockCalc = jest.fn(() => calculated)
  const memo = new Memorization(mockCalc)

  memo.get(source)
  const result = memo.get({ a: 2 })

  expect(result).toBe(calculated)
  expect(mockCalc.mock.calls.length).toBe(2)
})

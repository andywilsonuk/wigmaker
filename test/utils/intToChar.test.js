import intToChar from "../../src/utils/intToChar"

describe("Integer to character", () => {
  const testCases = [{
    value: 1,
    expected: "a",
  }, {
    value: 11,
    expected: "k",
  }, {
    value: 26,
    expected: "z",
  }, {
    value: 27,
    expected: "A",
  }, {
    value: 31,
    expected: "E",
  }]
  testCases.forEach(({ value, expected }) => {
    it(`${value}, result ${expected}`, () => {
      const actual = intToChar(value - 1)

      expect(actual).toBe(expected)
    })
  })
})
test("Overflow", () => {
  const value = 26 + 26

  expect(() => intToChar(value)).toThrow()
})

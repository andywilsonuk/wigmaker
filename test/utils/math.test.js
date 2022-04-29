/* eslint-env jest */
import { floorPrecision } from '../../src/utils/math'

describe('floorPrecision', () => {
  [{
    value: 1,
    expected: 1
  }, {
    value: 12,
    expected: 12
  }, {
    value: 123,
    expected: 120
  }, {
    value: 1234,
    expected: 1200
  }, {
    value: 123456,
    expected: 120000
  }, {
    value: 12999,
    expected: 12000
  }, {
    value: 120.999,
    expected: 120
  }, {
    value: 2500012,
    expected: 2499999
  }, {
    value: 250012,
    expected: 250000
  }].forEach(({ value, expected }) => {
    it(`${JSON.stringify(value)}, result ${JSON.stringify(expected)}`, () => {
      const actual = floorPrecision(value)

      expect(actual).toStrictEqual(expected)
    })
  })
})

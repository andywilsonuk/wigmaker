/* eslint-env jest */
import {
  cashString, percentString, decimalString, decimal1dpString, compactString,
  compact2dpString, shortTimeString, percent5dpString, timeDurationString
} from '../../src/utils/humanize'

describe('Cash formatted to USD', () => {
  [{
    value: 1,
    expected: '$1'
  }, {
    value: 1000,
    expected: '$1K'
  }].forEach(({ value, expected }) => {
    it(`${value}, result ${expected}`, () => {
      const actual = cashString(value)

      expect(actual).toBe(expected)
    })
  })
})
describe('Percentages rounded to 0 decimal places', () => {
  [{
    value: 0.01,
    expected: '1%'
  }, {
    value: 0.102,
    expected: '10%'
  }].forEach(({ value, expected }) => {
    it(`${value}, result ${expected}`, () => {
      const actual = percentString(value)

      expect(actual).toBe(expected)
    })
  })
})
describe('Decimals formatted with seperator', () => {
  [{
    value: 1.234,
    expected: '1.23'
  }, {
    value: 1000,
    expected: '1,000'
  }].forEach(({ value, expected }) => {
    it(`${value}, result ${expected}`, () => {
      const actual = decimalString(value)

      expect(actual).toBe(expected)
    })
  })
})
describe('Decimals formatted with seperator forced to 1 decimal', () => {
  [{
    value: 1.234,
    expected: '1.2'
  }, {
    value: 1000,
    expected: '1,000.0'
  }].forEach(({ value, expected }) => {
    it(`${value}, result ${expected}`, () => {
      const actual = decimal1dpString(value)

      expect(actual).toBe(expected)
    })
  })
})
describe('Number compaction', () => {
  [{
    value: 1,
    expected: '1'
  }, {
    value: 999,
    expected: '999'
  }, {
    value: 1200,
    expected: '1.2K'
  }, {
    value: 1234,
    expected: '1.23K'
  }, {
    value: 1000000,
    expected: '1M'
  }].forEach(({ value, expected }) => {
    it(`${value}, result ${expected}`, () => {
      const actual = compactString(value)

      expect(actual).toBe(expected)
    })
  })
})
describe('Number compaction force 2 decimals', () => {
  [{
    value: 1,
    expected: '1.00'
  }, {
    value: 1200,
    expected: '1.20K'
  }].forEach(({ value, expected }) => {
    it(`${value}, result ${expected}`, () => {
      const actual = compact2dpString(value)

      expect(actual).toBe(expected)
    })
  })
})
describe('Short time', () => {
  [{
    value: 10 * 1000,
    expected: '00:10.000'
  }, {
    value: 100 * 1000,
    expected: '01:40.000'
  }].forEach(({ value, expected }) => {
    it(`${value}, result ${expected}`, () => {
      const actual = shortTimeString(value)

      expect(actual).toBe(expected)
    })
  })
})
describe('Percentages formatted with seperator forced to 5 decimal', () => {
  [{
    value: 1.234,
    expected: '123.40000%'
  }, {
    value: 10,
    expected: '1,000.00000%'
  }, {
    value: 0.0000001,
    expected: '0.00001%'
  }].forEach(({ value, expected }) => {
    it(`${value}, result ${expected}`, () => {
      const actual = percent5dpString(value)

      expect(actual).toBe(expected)
    })
  })
})
describe('Time duration', () => {
  [{
    value: 10 * 1000,
    expected: '00:00:10'
  }, {
    value: 100 * 1000,
    expected: '00:01:40'
  }, {
    value: ((2 * 60 * 60) + (3 * 60) + 4) * 1000,
    expected: '02:03:04'
  }].forEach(({ value, expected }) => {
    it(`${value}, result ${expected}`, () => {
      const actual = timeDurationString(value)

      expect(actual).toBe(expected)
    })
  })
})

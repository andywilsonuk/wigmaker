/* eslint-env jest */
import { allowed, costString, costTransform, microCostTransform } from '../../src/utils/cost'
import { brandState, cashState, microState } from '../testUtils/state'

describe('Cost transform', () => {
  [{
    state: { ...cashState(100), ...microState(10, 5) },
    cost: { cash: 20 },
    expected: { ...cashState(80), ...microState(10, 5) }
  }, {
    state: { ...cashState(100), ...microState(10, 5) },
    cost: { cash: 20, micro: 2 },
    expected: { ...cashState(80), ...microState(8, 5) }
  }, {
    state: { ...cashState(100), ...microState(5, 3) },
    cost: { micro: 6 },
    expected: { ...cashState(100), ...microState(0, 2) }
  }].forEach(({ state, cost, expected }) => {
    it(`${JSON.stringify(state)} with cost ${JSON.stringify(cost)}, result ${JSON.stringify(expected)}`, () => {
      const actual = costTransform(state, cost)

      expect(actual).toStrictEqual(expected)
    })
  })
})
describe('Cost allowed', () => {
  [{
    state: { ...cashState(100), ...brandState(10), ...microState(5, 3) },
    cost: { cash: 20 },
    expected: true
  }, {
    state: { ...cashState(100), ...brandState(10), ...microState(5, 3) },
    cost: { cash: 120 },
    expected: false
  }, {
    state: { ...cashState(100), ...brandState(10), ...microState(5, 3) },
    cost: { cash: 20, brand: 5, micro: 6 },
    expected: true
  }, {
    state: { ...cashState(100), ...brandState(10), ...microState(0, 3) },
    cost: { micro: 2 },
    expected: true
  }, {
    state: { ...cashState(100), ...brandState(10), ...microState(5, 3) },
    cost: { cash: 20, brand: 20 },
    expected: false
  }, {
    state: { ...cashState(100), ...brandState(10), ...microState(5, 3) },
    cost: { micro: 10 },
    expected: false
  }].forEach(({ state, cost, expected }) => {
    it(`${JSON.stringify(state)} with cost ${JSON.stringify(cost)}, result ${expected}`, () => {
      const actual = allowed(state, cost)

      expect(actual).toBe(expected)
    })
  })
})
describe('Cost string', () => {
  [{
    cost: { cash: 20 },
    expected: '$20'
  }, {
    cost: { cash: 20, brand: 50, micro: 25, a: 2 },
    expected: '$20, ≥50 brand, 25 micro'
  }, {
    cost: { cash: 20, power: 1200 },
    expected: '$20, 1,200 power'
  }].forEach(({ cost, expected }) => {
    it(`Cost ${JSON.stringify(cost)}, result ${expected}`, () => {
      const actual = costString(cost)

      expect(actual).toBe(expected)
    })
  })
})
describe('Micro cost transform', () => {
  [{
    state: { ...microState(10, 5) },
    cost: { micro: 2 },
    expected: { ...microState(8, 5) }
  }, {
    state: { ...microState(5, 3) },
    cost: { micro: 6 },
    expected: { ...microState(0, 2) }
  }].forEach(({ state, cost, expected }) => {
    it(`${JSON.stringify(state)} with cost ${JSON.stringify(cost)}, result ${JSON.stringify(expected)}`, () => {
      const actual = microCostTransform(state.micro, state.microBio, cost.micro)

      expect(actual).toStrictEqual(expected)
    })
  })
})

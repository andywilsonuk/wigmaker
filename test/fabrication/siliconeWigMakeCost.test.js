/* eslint-env jest */
import * as siliconeWigMakeCost from '../../src/fabrication/siliconeWigMakeCost'
import { autoSiliconState, buyLevelState, cashState, siliconState, wigCapsState } from '../testUtils'

describe('Silicone wig cost transform', () => {
  const testCases = [{
    silicon: 20,
    cash: 50,
    wigCaps: 10,
    autoSilicon: false,
    quantity: 2,
    expectedSilicon: 14,
    expectedCash: 50,
    expectedWigCaps: 8
  }, {
    silicon: 1,
    cash: 150,
    wigCaps: 10,
    autoSilicon: true,
    quantity: 3,
    expectedSilicon: 2,
    expectedCash: 90,
    expectedWigCaps: 7
  }]
  testCases.forEach(({ silicon, cash, wigCaps, autoSilicon, quantity, expectedSilicon, expectedCash, expectedWigCaps }) => {
    it(`${silicon} silicon, ${cash} cash, ${wigCaps} wigCaps with ${autoSilicon} auto. Result ${expectedSilicon} silicon, ${expectedCash} cash, ${expectedWigCaps} wigCaps`, () => {
      const state = {
        ...siliconState(silicon),
        ...cashState(cash),
        ...wigCapsState(wigCaps),
        ...autoSiliconState(autoSilicon),
        ...buyLevelState()
      }

      const actual = siliconeWigMakeCost.costTransform(state, quantity)

      expect(actual).toStrictEqual({
        ...siliconState(expectedSilicon),
        ...cashState(expectedCash),
        ...wigCapsState(expectedWigCaps)
      })
    })
  })
})
describe('Silicone wig resource max', () => {
  const testCases = [{
    silicon: 20,
    cash: 50,
    wigCaps: 10,
    autoSilicon: false,
    expected: 6
  }, {
    silicon: 1,
    cash: 50,
    wigCaps: 10,
    autoSilicon: false,
    expected: 0
  }, {
    silicon: 20,
    cash: 50,
    wigCaps: 0,
    autoSilicon: false,
    expected: 0
  }, {
    silicon: 2,
    cash: 100,
    wigCaps: 10,
    autoSilicon: true,
    expected: 5
  }]
  testCases.forEach(({ silicon, cash, wigCaps, autoSilicon, expected }) => {
    it(`${silicon} silicon, ${cash} cash, ${wigCaps} wigCaps with ${autoSilicon} auto. Result ${expected}`, () => {
      const state = {
        ...siliconState(silicon),
        ...cashState(cash),
        ...wigCapsState(wigCaps),
        ...autoSiliconState(autoSilicon),
        ...buyLevelState()
      }

      const actual = siliconeWigMakeCost.resourceMax(state)

      expect(actual).toBe(expected)
    })
  })
})

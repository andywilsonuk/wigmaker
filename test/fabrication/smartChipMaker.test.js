/* eslint-env jest */
import { smartChipMaker } from '../../src/fabrication/makers'
import { algaeState, autoPuttyState, autoSiliconState, buyLevelState, cashState, siliconState } from '../testUtils'

describe('Smart chip cost transform', () => {
  [{
    silicon: 6,
    cash: 150,
    algae: 20,
    autoSilicon: false,
    quantity: 3,
    expectedSilicon: 0,
    expectedCash: 150,
    expectedAlgae: 17
  }, {
    silicon: 2,
    cash: 150,
    algae: 20,
    autoSilicon: true,
    quantity: 2,
    expectedSilicon: 3,
    expectedCash: 120,
    expectedAlgae: 18
  }, {
    silicon: 1000,
    cash: 150,
    algae: 20,
    autoSilicon: true,
    quantity: 2,
    expectedSilicon: 1000 - 4,
    expectedCash: 150,
    expectedAlgae: 18
  }].forEach(({ silicon, cash, autoSilicon, quantity, algae, expectedSilicon, expectedCash, expectedAlgae }) => {
    it(`${silicon} silicon, ${cash} cash, ${algae} algae, with ${autoSilicon} auto silicon. ` +
      `Result ${expectedSilicon} silicon, ${expectedCash} cash, ${expectedAlgae} algae`, () => {
      const state = {
        ...siliconState(silicon),
        ...cashState(cash),
        ...autoSiliconState(autoSilicon),
        ...buyLevelState(),
        ...autoPuttyState(true),
        ...algaeState(algae)
      }

      const actual = smartChipMaker.costTransform(state, quantity)

      expect(actual).toStrictEqual({
        ...siliconState(expectedSilicon),
        ...cashState(expectedCash),
        ...algaeState(expectedAlgae)
      })
    })
  })
})
describe('Smart chip resource max', () => {
  [{
    silicon: 20,
    cash: 50,
    algae: 20,
    autoSilicon: false,
    autoPutty: false,
    expected: 0
  }, {
    silicon: 2,
    cash: 100,
    algae: 20,
    autoSilicon: true,
    autoPutty: false,
    expected: 0
  }, {
    silicon: 8,
    cash: 100,
    algae: 20,
    autoSilicon: false,
    autoPutty: true,
    expected: 4
  }, {
    silicon: 20,
    cash: 100,
    algae: 0,
    autoSilicon: false,
    autoPutty: true,
    expected: 0
  }, {
    silicon: 20,
    cash: 100,
    algae: 12,
    autoSilicon: true,
    autoPutty: true,
    expected: 12
  }, {
    silicon: 4,
    cash: 1,
    algae: 50,
    autoSilicon: true,
    autoPutty: true,
    expected: 2
  }].forEach(({ silicon, cash, autoSilicon, autoPutty, algae, expected }) => {
    it(`${silicon} silicon, ${cash} cash, ${algae} algae, ${autoPutty} putty with ${autoSilicon} auto silicon and ${autoPutty} auto putty. Result ${expected}`, () => {
      const state = {
        ...siliconState(silicon),
        ...cashState(cash),
        ...autoSiliconState(autoSilicon),
        ...buyLevelState(),
        ...autoPuttyState(autoPutty),
        ...algaeState(algae)
      }

      const actual = smartChipMaker.resourceMax(state)

      expect(actual).toBe(expected)
    })
  })
})
describe('Smart chip resource max', () => {
  [{
    silicon: 3,
    cash: 150,
    algae: 20,
    autoSilicon: false,
    autoPutty: true,
    expected: 1
  }, {
    silicon: 10,
    cash: 150,
    algae: 200,
    autoSilicon: true,
    autoPutty: true,
    expected: 5 + 12
  }, {
    silicon: 10,
    cash: 150,
    algae: 5,
    autoSilicon: true,
    autoPutty: true,
    expected: 5
  }, {
    silicon: 10,
    cash: 150,
    algae: 20,
    autoSilicon: true,
    autoPutty: false,
    expected: 0
  }].forEach(({ silicon, cash, autoSilicon, autoPutty, algae, expected }) => {
    it(`${silicon} silicon, ${cash} cash, ${algae} algae, with ${autoSilicon} auto silicon and ${autoPutty} auto putty. Result ${expected}`, () => {
      const state = {
        ...cashState(cash),
        ...buyLevelState(),
        ...siliconState(silicon),
        ...algaeState(algae),
        ...autoSiliconState(autoSilicon),
        ...autoPuttyState(autoPutty)
      }

      const actual = smartChipMaker.resourceMax(state)

      expect(actual).toBe(expected)
    })
  })
})

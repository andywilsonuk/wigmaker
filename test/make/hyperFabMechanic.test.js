import { fabricatorState, microState } from "../testUtils/state"
import { buyHyperFabAllowed } from "../../src/make/hyperFabMechanic"

describe("HyperFab allowed", () => {
  const testCases = [{
    fabricators: 23,
    fabricatorHyper: 0,
    micro: 10000,
    microBio: 10000,
    expected: false,
  }, {
    fabricators: 24,
    fabricatorHyper: 1,
    micro: 10000,
    microBio: 10000,
    expected: false,
  }, {
    fabricators: 24,
    fabricatorHyper: 0,
    micro: 100,
    microBio: 100,
    expected: false,
  }, {
    fabricators: 24,
    fabricatorHyper: 0,
    micro: 10000,
    microBio: 10000,
    expected: true,
  }, {
    fabricators: 48,
    fabricatorHyper: 0,
    micro: 10000,
    microBio: 10000,
    expected: true,
  }, {
    fabricators: 48,
    fabricatorHyper: 1,
    micro: 10000,
    microBio: 10000,
    expected: true,
  }]
  testCases.forEach(({ fabricators, fabricatorHyper, micro, microBio, expected }) => {
    it(`${fabricators} fabricators, ${fabricatorHyper} fabricatorHyper, ${micro}+${microBio} micro. Expected: ${expected}`, () => {
      const state = {
        ...fabricatorState(fabricators, fabricatorHyper),
        ...microState(micro, microBio),
      }

      const actual = buyHyperFabAllowed(state)

      expect(actual).toBe(expected)
    })
  })
})

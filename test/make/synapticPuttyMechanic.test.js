/* eslint-env jest */
import { algaeToPuttyTransform, maxPutty } from '../../src/make/synapticPuttyMechanic'
import { algaeState, autoPuttyState } from '../testUtils'

test('Synaptic Putty cost transform', () => {
  const state = {
    ...algaeState(16, 2)
  }

  const actual = algaeToPuttyTransform(state, 11)

  expect(actual).toStrictEqual({
    algae: 5
  })
})
test('Synaptic Putty max available matches algae', () => {
  const state = {
    ...algaeState(16),
    ...autoPuttyState(true)
  }

  const actual = maxPutty(state)

  expect(actual).toBe(16)
})
test('Synaptic Putty max available 0 when enhancer is off', () => {
  const state = {
    ...algaeState(16),
    ...autoPuttyState(false)
  }

  const actual = maxPutty(state)

  expect(actual).toBe(0)
})

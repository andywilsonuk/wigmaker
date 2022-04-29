/* eslint-env jest */
import wigStockReductionTransform from '../../src/utils/wigStockReductionTransform'
import { wigStockState } from '../testUtils'

test('Single stock', () => {
  const state = wigStockState([0, 10, 0, 0, 0])

  const result = wigStockReductionTransform(state, 5)

  expect(result).toStrictEqual(wigStockState([0, 5, 0, 0, 0]))
})

test('Split stock', () => {
  const state = wigStockState([10, 8, 6, 4, 2])

  const result = wigStockReductionTransform(state, 25)

  expect(result).toStrictEqual(wigStockState([5, 0, 0, 0, 0]))
})

test('Zero stock', () => {
  const state = wigStockState([0, 0, 0, 0, 0])

  const result = wigStockReductionTransform(state, 0)

  expect(result).toStrictEqual(wigStockState([0, 0, 0, 0, 0]))
})

test('Reduction greater than stock', () => {
  const state = wigStockState([1, 0, 0, 0, 0])

  expect(() => wigStockReductionTransform(state, 2)).toThrow()
})

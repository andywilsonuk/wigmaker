/* eslint-env jest */
import { getNext, getTextById } from '../../src/fabrication/handmadeWig'
import { overrideRandom } from '../../src/utils/random'
import { mockSequence } from '../testUtils'

test('Next id is different from last', () => {
  overrideRandom(mockSequence(0, 0.05))
  const last = 0

  const actual = getNext(last)

  expect(actual).toBe(1)
})
test('Id maps to text', () => {
  const actual = getTextById(0)

  expect(actual).toBe('Create a beautiful wig')
})

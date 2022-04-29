/* eslint-env jest */
import { ProgressAllocator } from '../../src/mesh/progressAllocator'
import { mockSequence } from '../testUtils'
import { makeTuple } from './blockList.test'

const allocator = new ProgressAllocator()
const rand = {
  randomInt: jest.fn()
}

beforeEach(() => {
  allocator.init()
})

test('Insert at index 0', () => {
  rand.randomInt = mockSequence(0, 50)

  allocator.update(rand)

  expect(allocator.allocated.blocks).toMatchObject([
    makeTuple(50, 1)
  ])
  expect(allocator.unallocated.blocks).toMatchObject([
    makeTuple(0, 50),
    makeTuple(51, 49)
  ])
})
test('Consume whole block', () => {
  rand.randomInt = mockSequence(1)
  allocator.unallocated.clear()
  allocator.unallocated.blocks.push(makeTuple(0, 5))
  allocator.unallocated.blocks.push(makeTuple(10, 1))
  allocator.unallocated.blocks.push(makeTuple(30, 70))
  allocator.allocated.clear()
  allocator.allocated.blocks.push(makeTuple(5, 5))

  allocator.update(rand)

  expect(allocator.allocated.blocks).toMatchObject([
    makeTuple(5, 6)
  ])
  expect(allocator.unallocated.blocks).toMatchObject([
    makeTuple(0, 5),
    makeTuple(30, 70)
  ])
})

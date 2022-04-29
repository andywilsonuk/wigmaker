/* eslint-env jest */
import { dehydrate1, rehydrate1, dehydrate2, rehydrate2 } from '../../src/utils/serializer'

const source = {
  b: 2,
  a: 1
}
const template = {
  b: 10,
  a: 20
}

test('dehydrate/rehydrate 1', () => {
  const dehydrated = dehydrate1(source)
  expect(dehydrated).toStrictEqual([2, 1])

  const actual = rehydrate1(dehydrated, template)
  expect(actual).toStrictEqual(source)
})
test('dehydrate/rehydrate 2', () => {
  const dehydrated = dehydrate2(source)
  expect(dehydrated).toStrictEqual([1, 2])

  const actual = rehydrate2(dehydrated, template)
  expect(actual).toStrictEqual(source)
})

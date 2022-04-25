import LookupCache from "../../src/utils/lookupCache"

test("Basic", () => {
  const cache = new LookupCache()
  const initial = [1]

  expect(cache.has(initial, 1)).toBe(true)
  expect(cache.has(initial, 2)).toBe(false)

  const next = [1, 2]

  expect(cache.has(next, 1)).toBe(true)
  expect(cache.has(next, 2)).toBe(true)
})
test("Removed item is no longer in cache", () => {
  const cache = new LookupCache()
  const initial = [1]

  expect(cache.has(initial, 1)).toBe(true)

  const next = []

  expect(cache.has(next, 1)).toBe(false)
})
test("Include adds item", () => {
  const cache = new LookupCache()
  const initial = [1]

  const next = cache.include(initial, 2)

  expect(cache.has(next, 1)).toBe(true)
  expect(cache.has(next, 2)).toBe(true)
})
test("Include ignores items that already exist", () => {
  const cache = new LookupCache()
  const initial = [1, 2]

  const next = cache.include(initial, 2, 3)

  expect(next).toStrictEqual([1, 2, 3])
})

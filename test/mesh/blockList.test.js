import { BlockList } from "../../src/mesh/blockList"

export const makeTuple = (position, size) => ({ position, size })

test("Insert into empty", () => {
  const list = new BlockList()

  list.insert(0, 5)

  expect(list.blocks).toMatchObject([
    makeTuple(0, 5),
  ])
})
test("Insert before first", () => {
  const list = new BlockList()
  list.insert(10, 5)

  list.insert(0, 5)

  expect(list.blocks).toMatchObject([
    makeTuple(0, 5),
    makeTuple(10, 5),
  ])
})
test("Insert before", () => {
  const list = new BlockList()
  list.insert(0, 5)
  list.insert(20, 5)

  list.insert(10, 5)

  expect(list.blocks).toMatchObject([
    makeTuple(0, 5),
    makeTuple(10, 5),
    makeTuple(20, 5),
  ])
})
test("Insert after last", () => {
  const list = new BlockList()
  list.insert(0, 5)

  list.insert(20, 5)

  expect(list.blocks).toMatchObject([
    makeTuple(0, 5),
    makeTuple(20, 5),
  ])
})
test("Merge with first", () => {
  const list = new BlockList()
  list.insert(0, 5)
  list.insert(20, 2)

  list.insert(5, 6)

  expect(list.blocks).toMatchObject([
    makeTuple(0, 11),
    makeTuple(20, 2),
  ])
})
test("Merge after last", () => {
  const list = new BlockList()
  list.insert(0, 5)
  list.insert(10, 6)

  list.insert(16, 10)

  expect(list.blocks).toMatchObject([
    makeTuple(0, 5),
    makeTuple(10, 16),
  ])
})
test("Merge before last", () => {
  const list = new BlockList()
  list.insert(0, 5)
  list.insert(13, 6)

  list.insert(10, 3)

  expect(list.blocks).toMatchObject([
    makeTuple(0, 5),
    makeTuple(10, 9),
  ])
})
test("Merge with previous and next", () => {
  const list = new BlockList()
  list.insert(0, 5)
  list.insert(9, 2)

  list.insert(5, 4)

  expect(list.blocks).toMatchObject([
    makeTuple(0, 11),
  ])
})
test("Remove at index 1", () => {
  const list = new BlockList()
  list.insert(0, 5)
  list.insert(10, 5)

  list.removeAt(1)

  expect(list.blocks).toMatchObject([
    makeTuple(0, 5),
  ])
})
test("Get at index 1", () => {
  const list = new BlockList()
  list.insert(0, 5)
  list.insert(10, 5)

  const expected = list.get(1)

  expect(expected).toStrictEqual(makeTuple(10, 5))
})
test("Get count", () => {
  const list = new BlockList()
  list.insert(0, 5)
  list.insert(10, 5)

  const expected = list.count

  expect(expected).toBe(2)
})
test("Insert at index 0", () => {
  const list = new BlockList()

  list.insertAt(0, 10, 5)
  list.insertAt(0, 2, 3)

  expect(list.blocks).toMatchObject([
    makeTuple(2, 3),
    makeTuple(10, 5),
  ])
})
test("Insert at index 0", () => {
  const list = new BlockList()
  list.insertAt(0, 10, 5)

  list.clear()

  expect(list.blocks).toMatchObject([
  ])
})

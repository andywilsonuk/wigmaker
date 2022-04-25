export class BlockList {
  constructor() {
    this.blocks = []
  }

  insert(position, size) {
    let i = 0
    let nextBlock
    while (i < this.blocks.length) {
      nextBlock = this.blocks[i]
      if (nextBlock.position > position) { break }
      i += 1
      continue
    }

    const previousBlock = this.blocks[i - 1]
    let sizeAfterMerge = size

    if (nextBlock !== undefined && nextBlock.position === position + size) {
      sizeAfterMerge = nextBlock.size + size
      nextBlock.position = position
      nextBlock.size = sizeAfterMerge
    }
    if (previousBlock !== undefined && previousBlock.position + previousBlock.size === position) {
      if (sizeAfterMerge !== size) {
        this.blocks.splice(i, 1)
      }
      sizeAfterMerge = previousBlock.size + sizeAfterMerge
      previousBlock.size = sizeAfterMerge
    }

    if (sizeAfterMerge !== size) { return }
    this.insertAt(i, position, size)
  }

  removeAt(index) {
    this.blocks.splice(index, 1)
  }

  insertAt(index, position, size) {
    this.blocks.splice(index, 0, { position, size })
  }

  get count() { return this.blocks.length }

  get(index) { return this.blocks[index] }

  clear() { this.blocks = [] }
}

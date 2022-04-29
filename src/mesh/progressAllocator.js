import { BlockList } from './blockList'

export class ProgressAllocator {
  constructor () {
    this.allocated = new BlockList()
    this.unallocated = new BlockList()
  }

  init () {
    this.allocated.clear()
    this.unallocated.clear()
    this.unallocated.insertAt(0, 0, 100)
    this.lastProgress = 0
  }

  update (rand) {
    const blockIndex = rand.randomInt(0, this.unallocated.count - 1)

    const block = this.unallocated.get(blockIndex)
    const { position, size: blockSize } = block
    const maxSize = 1

    if (blockSize === maxSize) {
      this.unallocated.removeAt(blockIndex)
      this.allocated.insert(position, blockSize)
      return
    }
    const relativePoint = rand.randomInt(1, blockSize - 1)
    const splitPosition = position + relativePoint
    const splitSize = blockSize - relativePoint
    block.size = relativePoint
    this.allocated.insert(splitPosition, maxSize)

    if (splitSize > maxSize) {
      this.unallocated.insertAt(blockIndex + 1, splitPosition + maxSize, splitSize - maxSize)
    }
  }
}

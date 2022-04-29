/* eslint-disable no-bitwise */
export const nodeFlags = {
  off: 0,
  on: 1,
  north: 2,
  west: 4
}

export const setNorth = (existing) => (existing === nodeFlags.off ? (nodeFlags.on | nodeFlags.north) : (existing | nodeFlags.north))
export const setWest = (existing) => (existing === nodeFlags.off ? (nodeFlags.on | nodeFlags.west) : (existing | nodeFlags.west))
export const hasDirection = (flags, direction) => (flags & direction) === direction

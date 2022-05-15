/* eslint-disable no-bitwise */
export const sceneTempFlags = {
  none: 0,

  // title
  initial: 1,

  // main
  gamePaused: 2,

  // import
  confirmReset: 4,
  restoreError: 8,
  importSuccess: 16,
  resetSuccess: 32
}

export const setFlag = (flags, newOption) => flags | newOption
export const removeFlag = (flags, ...newFlags) => newFlags.reduce((a, b) => a & ~b, flags)
export const hasFlag = (flags, flagToCheck) => (flags & flagToCheck) === flagToCheck
export const toggleFlag = (flags, flag) => flags ^ flag

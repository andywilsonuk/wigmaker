/* eslint-disable no-bitwise */
const flagStates = {
  unavailable: 0,
  available: 1,
  off: 2,
  on: 4
}

const has = (flags, flag) => (flags & flag) === flag

export default {
  unavailable: () => flagStates.unavailable,
  available: () => flagStates.available | flagStates.off,
  isAvailable: (flags) => has(flags, flagStates.available),
  isOn: (flags) => has(flags, flagStates.on),
  toggle: (flags) => flagStates.available | (has(flags, flagStates.on) ? flagStates.off : flagStates.on)
}

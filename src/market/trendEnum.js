/* eslint-disable no-bitwise */
export const flagStates = {
  hidden: 0,
  disabled: 1,
  enabled: 2,
  started: 4,
  selecting: 8,
  finished: 16,
}

const has = (flags, flag) => (flags & flag) === flag

export const isHidden = (flags) => flags === flagStates.hidden
export const isDisabled = (flags) => flags === flagStates.disabled
export const isStarted = (flags) => has(flags, flagStates.started)
export const isSelecting = (flags) => has(flags, flagStates.selecting)
export const isSelected = (flags) => has(flags, flagStates.started) && !has(flags, flagStates.selecting) && !has(flags, flagStates.finished)
export const isFinished = (flags) => has(flags, flagStates.finished)
export const hidden = () => flagStates.hidden
export const disabled = () => flagStates.disabled
export const enable = () => flagStates.enabled
export const selecting = () => (flagStates.enabled | flagStates.started | flagStates.selecting)
export const selected = () => (flagStates.enabled | flagStates.started)
export const finished = () => (flagStates.enabled | flagStates.started | flagStates.finished)
export const converted = () => flagStates.enabled

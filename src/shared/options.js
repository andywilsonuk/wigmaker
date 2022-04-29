/* eslint-disable no-bitwise */
export const optionFlags = {
  none: 0,
  lightTheme: 1,
  darkTheme: 2,
  meshTheme: 4,
  soundOff: 8,
  meshAllowed: 16,
  flatView: 32
}

export const enableOption = (options, newOption) => options | newOption
export const disableOption = (options, newOption) => options & ~newOption
export const disableOptions = (options, ...newOptions) => newOptions.reduce((a, b) => a & ~b, options)
export const hasOption = (options, optionToCheck) => (options & optionToCheck) === optionToCheck
export const hasAnyOption = (options, ...optionsToCheck) => optionsToCheck.some((o) => hasOption(options, o))
export const toggleOption = (options, optionToToggle) => options ^ optionToToggle

import { audioIds, enqueueAudio } from "../audio"

/* eslint-disable no-bitwise */
export const navFlags = {
  none: 0,
  memo: 2,
  make: 1,
  market: 4,
  mesh: 8,
  devTools: 16,
}

const combine = (a, b) => a | b

export const allowNav = (availableNav, ...additionalNav) => additionalNav.reduce(combine, availableNav)
export const hasNav = (availableNav, navToCheck) => (availableNav & navToCheck) === navToCheck

export const Navigate = (state, nav) => [{
  ...state,
  navSelected: nav,
  nav: allowNav(state.nav, navFlags.make), // if we switch to devTools before the nav is visible we need a way to get back
}, enqueueAudio(audioIds.tabChange)]

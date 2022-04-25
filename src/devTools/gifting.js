/* eslint-disable no-param-reassign */
import dataProvider from "../shared/dataProvider"
import { achievedLookup, milestone } from "../shared/milestones"
import { allowNav, navFlags } from "../shared/nav"
import { enableSprintMode } from "../gameEngine"
import { audioIds, enqueueAudio } from "../audio"

export const GiftCash = (state, newValue) => [{ ...state, cash: +newValue }, enqueueAudio(audioIds.button)]
export const GiftBrand = (state, newValue) => [{ ...state, brand: +newValue }, enqueueAudio(audioIds.button)]
export const GiftStrands = (state, newValue) => [{ ...state, strands: +newValue }, enqueueAudio(audioIds.button)]
export const GiftWigsMade = (state, newValue) => [{ ...state, wigsMade: +newValue }, enqueueAudio(audioIds.button)]
export const GiftMicroBio = (state, newValue) => [{ ...state, microBio: +newValue }, enqueueAudio(audioIds.button)]
export const GiftSmartWigsSold = (state, newValue) => [{ ...state, smartWigsSold: +newValue }, enqueueAudio(audioIds.button)]
export const GiftSmartChips = (state, newValue) => [{ ...state, smartChips: +newValue }, enqueueAudio(audioIds.button)]

export const ShowResearch = (state) => [{
  ...state,
  research: dataProvider.allResearch.map((x) => ({ id: x.id, allowed: true, remaining: x.duration })),
  nav: allowNav(state.nav, navFlags.memo, navFlags.make, navFlags.market),
  navSelected: navFlags.make,
  achieved: achievedLookup.include(state.achieved, milestone.manufacture, milestone.notions),
}, enqueueAudio(audioIds.button)]

export const ShowCampaigns = (state) => [{
  ...state,
  campaigns: dataProvider.campaigns.map((x) => ({ id: x.id, allowed: true })),
  nav: allowNav(state.nav, navFlags.memo, navFlags.make, navFlags.market),
  navSelected: navFlags.market,
  achieved: achievedLookup.include(state.achieved, milestone.manufacture),
}, enqueueAudio(audioIds.button)]

export const ShowOpportunity = (state, id) => [{
  ...state,
  opportunity: { id, progress: 0 },
  nav: allowNav(state.nav, navFlags.mesh),
  navSelected: navFlags.mesh,
}, enqueueAudio(audioIds.button)]

export const SprintMode = (state) => [state, enableSprintMode(), enqueueAudio(audioIds.button)]

export const NoWait = (state) => {
  dataProvider.all.filter((x) => x.duration !== undefined).forEach((x) => { x.duration = 1 })
  return [state, enqueueAudio(audioIds.button)]
}

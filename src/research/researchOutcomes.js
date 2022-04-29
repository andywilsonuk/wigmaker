import { achievedLookup, milestone } from '../shared/milestones'
import { allowNav, navFlags } from '../shared/nav'
import toggleFlags from '../utils/toggleFlags'
import lowPowerCheck from '../make/lowPowerCheck'
import { initialFabricatorPower, machineryPowerDemand } from '../make/fabricatorMechanic'
import { oneHundredMillion } from '../shared/bigNumbers'

export const AllowMaker = (state) => ({
  ...state,
  powerDemand: machineryPowerDemand,
  achieved: achievedLookup.include(state.achieved, milestone.autoMaker)
})

export const AllowFabricator = (state) => ({
  ...state,
  powerDemand: initialFabricatorPower,
  fabricatorsUnallocated: 2,
  fabricating: state.fabricating.map((x) => ({ ...x, allocated: 0, progress: 0, rate: 0 }))
})

export const AllowMarketing = (state) => ({
  ...state,
  nav: allowNav(state.nav, navFlags.market)
})

export const AllowResearch = (state, requiredPower) => [{
  ...state,
  powerDemand: state.powerDemand + requiredPower
}, lowPowerCheck()]

export const AllowAutoSilicon = (state) => ({
  ...state,
  autoSilicon: toggleFlags.available()
})

export const AllowMakeSmartWigs = (state) => ({
  ...state,
  autoPutty: toggleFlags.available(),
  marketForcesAltView: toggleFlags.available()
})

export const UpgradeMachineryWigLevel = (state, level) => ({
  ...state,
  wigMakerLevel: level
})

export const UpgradeMachineryWigCapLevel = (state, newLevel) => ({
  ...state,
  wigCapMakerLevel: newLevel
})

export const UpgradeBuyingPower = (state, newLevel) => ({
  ...state,
  buyLevel: newLevel
})

export const IncreaseBrandMultiplier = (state, increase) => ({
  ...state,
  brandMultiplier: state.brandMultiplier + increase
})

export const IncreaseFabricatorMultiplier = (state, increase) => ({
  ...state,
  fabricatorMultiplier: state.fabricatorMultiplier + increase
})

export const AllowMesh = (state) => ({
  ...state,
  nav: allowNav(state.nav, navFlags.mesh)
})

export const AllowCampaignManager = (state) => ({
  ...state,
  autoCampaign: toggleFlags.available()
})

export const DroneInitiatedDemand = (state) => ({
  ...state,
  brand: state.brand + oneHundredMillion,
  brandMultiplier: 35
})

export const AllowAutoInstall = (state) => ({
  ...state,
  autoInstall: toggleFlags.available()
})

import { navFlags } from "../shared/nav"
import { powerSupplyId } from "../make/powerMechanic"
import { fabricatingSubtype } from "../fabrication/fabricatingEnum"
import toggleFlags from "../utils/toggleFlags"
import { generateSeed } from "../utils/random"
import { hidden as trendsHidden } from "../market/trendEnum"
import { sceneTempFlags } from "../shared/sceneTempFlags"
import { scenes } from "../shared/scenes"

export default {
  randSeed: generateSeed(),
  randOffset: 0,
  gameTime: null,
  scene: scenes.titles,
  sceneTemp: sceneTempFlags.initial,
  nav: navFlags.none,
  navSelected: navFlags.make,
  achieved: [],
  log: [],
  cash: 0,
  hair: 100,
  wigCaps: 10,
  nylon: 0,
  silicon: 0,
  micro: 0,
  algae: 0,
  microBio: 0,
  wiglets: 0,
  smartChips: 0,
  strands: 0,
  wigs: 0,
  wigsHair: 0,
  wigsNylon: 0,
  wigsSilicone: 0,
  wigsAlgae: 0,
  wigsSmart: 0,
  wigsMade: 0,
  smartWigsSold: 0,
  smartWigsFulfillment: 0,
  handmadeId: 0,
  handmadeRemaining: 0,
  wigLogMessageId: null,
  research: [],
  researchId: null,
  strandsOn: false,
  demandAccumulation: 0,
  demandStartIndex: 0,
  wigMakerSubtype: fabricatingSubtype.hair,
  fabricating: [
    { allocated: 0, progress: 0, rate: 0, starved: false, subtype: fabricatingSubtype.hair }, // wig
    { allocated: 0, progress: 0, rate: 0, starved: false }, // wig cap
    { allocated: 0, progress: 0, rate: 0, starved: false }, // wiglet
    { allocated: 0, progress: 0, rate: 0, starved: false, subtype: fabricatingSubtype.micro }, // micro
    { allocated: 0, progress: 0, rate: 0, starved: false }, // smart chip
  ],
  fabricators: 2,
  fabricatorsUnallocated: 2,
  fabricatorActionQuantity: 1,
  fabricatorMultiplier: 1,
  fabricatorHyper: 0,
  wigMakerLevel: 0,
  wigCapMakerLevel: 0,
  powerSupply: [powerSupplyId.initial],
  powerDemand: 0,
  lowPower: false,
  boostRemaining: 0,
  buyLevel: 0,
  autoSilicon: toggleFlags.unavailable(),
  campaigns: [],
  campaignRunning: null,
  campaignUpliftIteration: 0,
  autoCampaign: toggleFlags.unavailable(),
  brand: 0,
  brandMultiplier: 1,
  orders: [0, 0, 0, 0, 0],
  bribes: 0,
  vogue: 0,
  vogueLimit: 0,
  vogueMax: 0,
  incidentId: null,
  incidentLast: null,
  incidentDue: null,
  trendStatus: trendsHidden(),
  trendIteration: null,
  trendDue: 0,
  trendProgress: 0,
  algaePoolLevel: 0,
  algaePoolSize: 0,
  algaePool: 0,
  algaeHarvest: 0,
  autoPutty: toggleFlags.unavailable(),
  puttyEnhanced: 0,
  meshIteration: 0,
  meshIterationStep: 0,
  meshNodes: 0,
  meshConnections: 0,
  meshNodeAccumulation: 0,
  dataCenters: 0,
  dataCenterProgress: 0,
  compute: 0,
  opportunity: null,
  prestige: false,
  marketForcesAltView: toggleFlags.unavailable(),
  nodeLogMessageId: null,
  autoInstall: toggleFlags.unavailable(),
}
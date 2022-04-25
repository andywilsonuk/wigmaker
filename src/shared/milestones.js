import LookupCache from "../utils/lookupCache"

export const achievedLookup = new LookupCache()

export const milestone = {
  manufacture: 100,
  notions: 101,
  autoMaker: 102,
  vogue: 104,
  bribes: 105,
  trendsVisible: 106,
  trendsEnabled: 107,
  firstCustomer: 108,
  war: 109,
  warStarted: 110,
  nylonTransfer: 111,
  fabQuantitySwitchNewLevel: 112,
  hatDrop: 113,
  inititalGridDestroyed: 114,
  nylonBuyEarly: 115,
}

export const notion = {
  wigs1: 200,
  wigCap1: 201,
  power: 202,
  marketing: 203,
  nylonWigs: 204,
  fabricator: 205,
  wiglets: 206,
  bulkBuy1: 207,
  bulkBuy2: 208,
  packaging: 209,
  fabflow: 210,
  siliconeWigs: 211,
  wigs2: 212,
  wigs3: 213,
  wigs4: 214,
  wigCap2: 215,
  wigCap3: 216,
  wigCap4: 217,
  nationwide: 218,
  operationalEfficiency: 219,
  bulkBuy3: 220,
  bulkBuy4: 221,
  research: 222,
}

export const research = {
  newMarkets: 300,
  international: 301,
  franchise: 302,
  autoSilicon: 303,
  microCompute: 304,
  mesh: 305,
  wigMakerSwitcher: 306,
  algaeIncubator: 307,
  smartWigs: 308,
  distributionNetwork: 309,
  drone: 310,
  storage: 311,
  multiLayered: 312,
  microBio: 313,
  hyperFab: 315,
  powerChaining: 316,
  voidPower: 317,
  campaignManager: 318,
  capitalize: 319,
  thinair: 323,
  subzero: 320,
  loyaltyByDesign: 321,
  droneSquadrons: 322,
  autoInstall: 314,
  demandLinking: 324,
}

export const campaign = {
  magazines: 400,
  socialMedia: 401,
  wearUpDown: 402,
  nylon: 403,
  nylonUltimateColour: 404,
  noMoreBedHead: 405,
  hairLiceScare: 406,
  socialInfluencers: 407,
  politicalInfluencers: 408,
  brandAmbassadors: 409,
  silicone: 410,
  shine: 411,
  allSeasons: 412,
  coiffeur: 413,
  dogs: 414,
  algae: 415,
  noHairToHide: 416,
  dominance: 417,
  brandLoyalty: 418,
  easyCare: 419,
  everyHead: 420,
  undermine: 421,
  salmon: 422,
  goldenWig: 423,
  basketball: 424,
  moustacheShaming: 425,
  wigMania: 426,
  game: 427,
  politicalAcumen: 428,
  smart: 429,
  hairToday: 430,
}

export const opportunity = {
  heist1: 500,
  meshMode: 501,
  // spare: 511,
  bioResearch: 502,
  hairStocks: 503,
  disruptShampoo: 504,
  eradicateMilliners: 505,
  transferDataCenter: 506,
  wipeAwayCompetitors: 507,
  doctorWaterSupply: 508,
  controlMedia: 509,
}

const checkUnique = () => {
  const values = Object.values(campaign)
    .concat(Object.values(notion))
    .concat(Object.values(milestone))
    .concat(Object.values(research))
    .concat(Object.values(opportunity))
  if (new Set(values).size === values.length) { return }
  throw new Error("Milestone IDs are not unique")
}
checkUnique()

import { IncreaseBrandMultiplier } from "../research/researchOutcomes"
import { eightHundredMillion, fiftyMillion, fiveHundredThousand, fourHundredMillion, fourMillion, oneHundredMillion, oneMillion, sixHundredMillion,
  thirtyMillion,
  threeBillion, twentyMillion } from "../shared/bigNumbers"
import { initMessage, initNews } from "../shared/logData"
import { campaign, opportunity, research } from "../shared/milestones"
import { targetNodes } from "./dataCenterMechanic"
import { Heist, WipeAwayCompetitors, MeshMode, SecureHairStocks, TransferDataCenter, TheEnd } from "./opportunities"

export default [{
  id: opportunity.meshMode,
  title: "Enable elite Mesh Mode",
  compute: 90000,
  trigger: ({ meshNodes }) => meshNodes >= 100,
  action: MeshMode,
  log: initMessage("0k", "Mesh mode enabled"),
}, {
  id: opportunity.hairStocks,
  title: "Secure global hair stocks",
  compute: 200000,
  trigger: ({ meshNodes }) => meshNodes >= 100,
  action: SecureHairStocks,
  log: initMessage("0c", "Global hair supplies transferred to stores"),
}, {
  id: opportunity.heist1,
  title: "Acquire additional funds",
  compute: oneMillion,
  trigger: ({ meshNodes }) => meshNodes >= 50000,
  action: Heist,
  log: initNews("0a", "Bank reports major security breach with an undisclosed sum stolen"),
}, {
  id: opportunity.transferDataCenter,
  title: "Data center ownership transfer",
  compute: fourMillion,
  milestones: [campaign.brandLoyalty, research.drone],
  trigger: ({ meshNodes }) => meshNodes >= oneMillion,
  action: TransferDataCenter,
  log: initMessage("0i", "Data center transfer complete"),
}, {
  id: opportunity.disruptShampoo,
  title: "Disrupt shampoo supplies",
  compute: oneMillion,
  milestones: [research.capitalize],
  trigger: ({ meshNodes }) => meshNodes >= oneHundredMillion,
  action: [IncreaseBrandMultiplier, 20],
  log: initNews("0d", "Shampoo shortage boon for wig makers"),
}, {
  id: opportunity.bioResearch,
  title: "Obtain bio research",
  compute: thirtyMillion,
  trigger: ({ meshNodes }) => meshNodes >= fourHundredMillion,
  log: initMessage("0b", "Research data obtained"),
}, {
  id: opportunity.doctorWaterSupply,
  title: "Doctor water supply",
  compute: twentyMillion,
  trigger: ({ meshNodes }) => meshNodes >= sixHundredMillion,
  log: initNews("0g", "Experts advise “baldness is now universal”"),
}, {
  id: opportunity.wipeAwayCompetitors,
  title: "Starve the competition",
  compute: fiftyMillion,
  milestones: [research.drone, campaign.politicalAcumen, research.autoInstall],
  trigger: ({ meshNodes }) => meshNodes >= eightHundredMillion,
  action: WipeAwayCompetitors,
  log: initNews("0f", "Single wig supplier remains after outmanoeuvring competition"),
}, {
  id: opportunity.controlMedia,
  title: "Control the media",
  compute: oneHundredMillion,
  milestones: [research.subzero, campaign.dominance],
  trigger: ({ meshNodes }) => meshNodes >= threeBillion,
  log: initNews("0h", "Wigs, wigs, nothing but wigs"),
}, {
  id: opportunity.eradicateMilliners,
  title: "Eradicate Milliners",
  compute: fiveHundredThousand,
  duration: 20,
  milestones: [research.droneSquadrons, campaign.everyHead],
  trigger: ({ meshNodes }) => meshNodes >= targetNodes,
  action: TheEnd,
},
].map((o) => ({
  ...o,
  duration: (o.duration ?? 150) * 1000,
  milestones: (o.milestones ?? []).concat(research.smartWigs),
}))

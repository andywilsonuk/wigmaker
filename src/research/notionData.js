import {
  AllowFabricator,
  AllowMaker,
  AllowMarketing,
  UpgradeMachineryWigCapLevel,
  UpgradeMachineryWigLevel,
  UpgradeBuyingPower,
  IncreaseBrandMultiplier,
  IncreaseFabricatorMultiplier,
  AllowResearch
} from './researchOutcomes'
import { allowed, costString } from '../utils/cost'
import { campaign, notion, milestone } from '../shared/milestones'
import { initMessage } from '../shared/logData'

const researchCenterPowerRequirement = 2000

export default [{
  id: notion.marketing,
  title: 'Market forces',
  description: 'Begin actively marketing wigs',
  duration: 10,
  milestones: [milestone.notions],
  allowCost: { cash: 110 },
  action: AllowMarketing,
  log: initMessage('1a', 'Marketing may prove to be the catalyst of ambitious desires')
}, {
  id: notion.wigCap1,
  title: 'Wig Cap Spinner',
  description: 'Purchase machine for making wig caps',
  duration: 20,
  milestones: [milestone.notions],
  trigger: ({ wigsMade }) => wigsMade >= 15,
  allowCost: { cash: 135 },
  action: AllowMaker,
  log: initMessage('1b', 'Nylon wig caps are the basis of all good wigs')
}, {
  id: notion.wigs1,
  title: 'Wig Maker 100',
  description: 'Slow but dependable wig making machinery',
  duration: 5,
  milestones: [notion.marketing],
  trigger: ({ wigsMade }) => wigsMade >= 25,
  allowCost: { cash: 45 },
  action: AllowMaker,
  log: initMessage('1c', 'Contraptions to ease the burden')
}, {
  id: notion.nylonWigs,
  title: 'Nylon-blend wigs',
  description: 'Mix hair and nylon to create a lower-cost wig',
  duration: 80,
  milestones: [notion.wigCap1, campaign.socialMedia],
  trigger: ({ wigsMade }) => wigsMade >= 80,
  allowCost: { cash: 220 },
  log: initMessage('1d', 'Nylon wigs: not glamorous but good value')
}, {
  id: notion.power,
  title: 'Flexible power supply',
  description: 'Better control over power supply and distribution',
  duration: 130,
  milestones: [notion.nylonWigs],
  trigger: ({ wigsMade }) => wigsMade >= 125,
  allowCost: { cash: 650 },
  log: initMessage('1u', 'Power supply management available')
}, {
  id: notion.wigs2,
  title: 'Wig Maker 200',
  description: 'A reasonable wig maker',
  duration: 10,
  milestones: [notion.nylonWigs],
  trigger: ({ wigsMade }) => wigsMade >= 100,
  allowCost: { cash: 300 },
  action: [UpgradeMachineryWigLevel, 1],
  log: initMessage('1e', 'Wig maker upgraded')
}, {
  id: notion.wigs3,
  title: 'Wig Maker 500',
  description: 'Better model boasting 50% faster running speed',
  duration: 10,
  milestones: [notion.wigs2],
  trigger: ({ wigsMade }) => wigsMade >= 130,
  allowCost: { cash: 490 },
  action: [UpgradeMachineryWigLevel, 2],
  log: initMessage('1f', 'Wig maker upgraded')
}, {
  id: notion.wigs4,
  title: 'Wig Maker 1000',
  description: 'Latest model with twice the performance',
  duration: 10,
  milestones: [notion.wigs3, notion.power],
  trigger: ({ wigsMade }) => wigsMade >= 300,
  allowCost: { cash: 1000 },
  action: [UpgradeMachineryWigLevel, 3],
  log: initMessage('1g', 'Wig maker upgraded')
}, {
  id: notion.wigCap2,
  title: 'Wig Cap Feeder Module v2',
  description: '200% wig cap manufacturing',
  duration: 20,
  milestones: [notion.wigCap1, notion.power],
  allowCost: { cash: 95 },
  action: [UpgradeMachineryWigCapLevel, 1],
  log: initMessage('1j', 'Wig cap manufacturing improved')
}, {
  id: notion.wigCap3,
  title: 'Wig Cap Feeder Module v3',
  description: 'Turbo charged wig cap spinning',
  duration: 25,
  milestones: [notion.wigCap2],
  allowCost: { cash: 120 },
  action: [UpgradeMachineryWigCapLevel, 2],
  log: initMessage('1n', 'Wig cap manufacturing improved')
}, {
  id: notion.wigCap4,
  title: 'Wig Cap Feeder Module v4',
  description: 'Spinners to maximum',
  duration: 35,
  milestones: [notion.wigCap3, notion.wigs4],
  trigger: ({ wigsMade }) => wigsMade >= 360,
  allowCost: { cash: 350 },
  action: [UpgradeMachineryWigCapLevel, 3],
  log: initMessage('1q', 'Wig cap manufacturing improved')
}, {
  id: notion.fabricator,
  title: 'Fabrication facility',
  description: 'Fully automated pattern-based manufacturing facility',
  duration: 80,
  milestones: [notion.wigs4, notion.wigCap4, notion.marketing],
  trigger: ({ wigsMade }) => wigsMade >= 550,
  allowCost: { cash: 1500 },
  action: AllowFabricator,
  log: initMessage('1h', 'Fabrication facility now online')
}, {
  id: notion.wiglets,
  title: 'Wiglet pattern',
  description: 'Cheap and quick to make, wiglets are accessories for wigs',
  duration: 30,
  milestones: [notion.fabricator],
  allowCost: { cash: 120 },
  log: initMessage('1i', 'The perfect counterpart to an outstanding wig')
}, {
  id: notion.bulkBuy1,
  title: 'Multi-pack purchasing',
  description: 'Better value by buying more',
  duration: 45,
  milestones: [notion.fabricator],
  trigger: ({ wigsMade }) => wigsMade >= 200,
  allowCost: { brand: 2000 },
  action: [UpgradeBuyingPower, 1],
  log: initMessage('1B', 'A better deal is struck')
}, {
  id: notion.bulkBuy2,
  title: 'Buying power',
  description: 'Negotiate bulk-buy discounts',
  duration: 60,
  milestones: [notion.bulkBuy1],
  trigger: ({ wigsMade }) => wigsMade >= 820,
  allowCost: { brand: 4400 },
  action: [UpgradeBuyingPower, 2],
  log: initMessage('1o', 'A better deal is struck')
}, {
  id: notion.packaging,
  title: 'Improved packaging',
  description: 'More pleasant unboxing experience',
  duration: 110,
  milestones: [notion.bulkBuy1],
  trigger: ({ wigsMade }) => wigsMade >= 1000,
  allowCost: { cash: 7500, brand: 10000 },
  action: [IncreaseBrandMultiplier, 1],
  log: initMessage('1x', 'Wig boxes ignite social media; brand per sale increases')
}, {
  id: notion.fabflow,
  title: 'FabrFlow',
  description: 'Optimize fabricator output efficiency',
  duration: 135,
  milestones: [notion.packaging],
  trigger: ({ wigsMade }) => wigsMade >= 1300,
  allowCost: { cash: 8500 },
  action: [IncreaseFabricatorMultiplier, 0.2],
  log: initMessage('1y', 'Fabricator performance improved')
}, {
  id: notion.nationwide,
  title: 'Nationwide presence',
  description: 'Pop-up stands throughout the country',
  duration: 120,
  milestones: [notion.fabricator, milestone.vogue],
  trigger: ({ wigsMade }) => wigsMade >= 1200,
  allowCost: { cash: 20000, brand: 15000 },
  action: [IncreaseBrandMultiplier, 2],
  log: initMessage('1k', 'The reach into the nation extends (+3 per sale)')
}, {
  id: notion.bulkBuy3,
  title: 'Aggressive negotiations',
  description: 'Ensure best price for raw materials',
  duration: 60,
  milestones: [notion.nationwide, notion.fabflow],
  trigger: ({ wigsMade }) => wigsMade >= 3200,
  allowCost: { cash: 18000 },
  action: [UpgradeBuyingPower, 3],
  log: initMessage('1A', 'A even better deal is struck')
}, {
  id: notion.bulkBuy4,
  title: 'Extreme negotiations',
  description: 'Dictate terms with suppliers',
  duration: 60,
  milestones: [notion.bulkBuy3],
  trigger: ({ wigsMade }) => wigsMade >= 20000,
  allowCost: { cash: 35000 },
  action: [UpgradeBuyingPower, 4],
  log: initMessage('8h', 'A really good deal is struck')
}, {
  id: notion.siliconeWigs,
  title: 'Silicone wig pattern',
  description: 'Charmingly realistic synthetic wigs',
  duration: 190,
  milestones: [notion.packaging, notion.nationwide, notion.bulkBuy3],
  trigger: ({ wigsMade }) => wigsMade >= 4200,
  allowCost: { cash: 38000 },
  log: initMessage('1p', 'Wigs made from silicone now available')
}, {
  id: notion.operationalEfficiency,
  title: 'Operational efficiency',
  description: 'Much more performant fabricators',
  duration: 135,
  milestones: [notion.fabflow],
  trigger: ({ wigsMade }) => wigsMade >= 4800,
  allowCost: { cash: 26000 },
  action: [IncreaseFabricatorMultiplier, 0.8],
  log: initMessage('1w', 'Fabricator performance improved')
}, {
  id: notion.research,
  title: 'Research center',
  description: 'Finding new ways',
  duration: 255,
  milestones: [notion.siliconeWigs, notion.bulkBuy3, notion.operationalEfficiency],
  trigger: ({ wigsMade, brand }) => wigsMade >= 10000 && brand >= 30000,
  allowCost: { cash: 250000, power: researchCenterPowerRequirement },
  action: [AllowResearch, researchCenterPowerRequirement],
  log: initMessage('1z', 'Research center now online')
}].map((n) => ({
  ...n,
  cost: costString(n.allowCost),
  duration: n.duration * 1000,
  description: `${n.description}.`,
  allowed: (state) => allowed(state, n.allowCost)
}))

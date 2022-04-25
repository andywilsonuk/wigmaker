/* eslint-disable no-bitwise */
import { cashString } from "../utils/humanize"
import { initMessage, initNews } from "../shared/logData"
import { campaign, notion, research, milestone, opportunity } from "../shared/milestones"
import { floorPrecision } from "../utils/math"
import { fiveHundredMillion, threeBillion, fourHundredMillion, oneBillion, oneHundredMillion, twentyMillion, twoBillion, twoHundredMillion } from "../shared/bigNumbers"
import toggleFlags from "../utils/toggleFlags"

const duration = (level) => Math.min(130, Math.floor(3 * ((level * 6) ^ level)))
const cost = (level) => Math.floor((15 * (level ** (2.6 + level / 10))) / 100) * 100
const brandIncrease = (level) => (level <= 10
  ? Math.floor(Math.log(level + 0.3) * Math.log((level + 0.3) ** 6) * 90)
  : Math.floor(Math.exp((level - 2) / 10) * (2800 * ((level - 2) ^ 5))))

export default [{
  id: campaign.magazines,
  title: "Print advertising",
  milestones: [notion.marketing],
  allowCash: 25,
}, {
  id: campaign.socialMedia,
  title: "Web shop with social media",
  milestones: [notion.marketing],
  allowCash: 250,
  log: initMessage("2a", "A small amount of discourse might improve things"),
}, {
  id: campaign.wearUpDown,
  title: "Wear it up, wear it down; two styles in one",
  milestones: [campaign.socialMedia],
  allowCash: 410,
}, {
  id: campaign.nylon,
  title: "Nylon-blend, the wig of choice",
  milestones: [campaign.socialMedia, notion.nylonWigs],
  trigger: ({ wigsMade }) => wigsMade >= 125,
  allowCash: 1400,
}, {
  id: campaign.nylonUltimateColour,
  title: "Red, yellow, green: it’s the party wig",
  milestones: [campaign.nylon],
  allowCash: 2100,
  log: initMessage("2b", "So much change; so much lost"),
}, {
  id: campaign.socialInfluencers,
  title: "Social media influencers",
  milestones: [campaign.socialMedia, milestone.vogue, notion.fabricator],
  log: initNews("2c", "Milliner conference discusses wig wearing upswing"),
}, {
  id: campaign.noMoreBedHead,
  title: "No more bed head",
  milestones: [campaign.nylonUltimateColour],
}, {
  id: campaign.hairLiceScare,
  title: "Hair lice scare",
  trigger: ({ wigsMade }) => wigsMade >= 2000,
  milestones: [campaign.noMoreBedHead],
}, {
  id: campaign.politicalInfluencers,
  title: "Political influencers",
  milestones: [campaign.socialInfluencers],
  trigger: ({ wigsMade, brand }) => wigsMade >= 4850 && brand >= 25000,
  brand: 20000,
}, {
  id: campaign.silicone,
  title: "Silicone wigs slide like silk",
  milestones: [notion.siliconeWigs],
}, {
  id: campaign.brandAmbassadors,
  title: "Brand ambassadors",
  milestones: [campaign.politicalInfluencers],
  trigger: ({ wigsMade, brand }) => wigsMade >= 10000 && brand >= 60000,
  allowCash: 54000,
  brand: 30000,
}, {
  id: campaign.shine,
  title: "Photo-realistic shine",
  milestones: [campaign.silicone, campaign.brandAmbassadors],
  brand: 35000,
  log: initNews("2f", "Silicone wigs rated “outstanding”"),
}, {
  id: campaign.allSeasons,
  title: "A wig for all seasons",
  milestones: [campaign.shine, notion.research],
  trigger: ({ wigsMade, brand, fabricators }) => wigsMade >= 70000 && brand >= 500000 && fabricators >= 50,
  brand: 40000,
}, {
  id: campaign.coiffeur,
  title: "Shun the coiffeur",
  milestones: [campaign.allSeasons],
  trigger: ({ wigsMade, brand }) => wigsMade >= 100000 && brand >= 750000,
  brand: 50000,
}, {
  id: campaign.dogs,
  title: "wigs 4 dogs",
  milestones: [campaign.allSeasons, research.newMarkets],
  trigger: ({ wigsMade }) => wigsMade >= 115000,
}, {
  id: campaign.easyCare,
  title: "Easy care (fake) hair",
  milestones: [campaign.dogs, research.international],
}, {
  id: campaign.game,
  title: "Create game with addictive qualities",
  milestones: [campaign.dogs, campaign.coiffeur, research.international, research.microCompute],
  trigger: ({ brand }) => brand >= 1200000,
}, {
  id: campaign.moustacheShaming,
  title: "Moustache shaming",
  milestones: [campaign.game],
  trigger: ({ brand }) => brand >= 2000000,
}, {
  id: campaign.undermine,
  title: "Undermine the market",
  milestones: [campaign.moustacheShaming],
  log: initNews("2d", "Wig market in turmoil as newcomer cleans up"),
}, {
  id: campaign.algae,
  title: "Go natural with plant-based wigs",
  milestones: [research.algaeIncubator],
}, {
  id: campaign.noHairToHide,
  title: "No hair to hide",
  milestones: [campaign.undermine, campaign.easyCare],
  trigger: ({ autoCampaign }) => toggleFlags.isAvailable(autoCampaign),
  log: initNews("2h", "Wigs are red hot"),
}, {
  id: campaign.basketball,
  title: "Wigs for basketball players joint venture",
  milestones: [campaign.noHairToHide, research.voidPower],
  trigger: ({ brand }) => brand >= 38000000,
  log: initNews("2e", "Wig wearing basketball players are a slam dunk"),
}, {
  id: campaign.salmon,
  title: "Salon-like not salmon-like",
  milestones: [campaign.basketball, research.drone],
  brand: twentyMillion,
}, {
  id: campaign.smart,
  title: "Be smart with AI & I",
  milestones: [research.smartWigs],
}, {
  id: campaign.brandLoyalty,
  title: "Brand loyalty scheme",
  milestones: [campaign.salmon, campaign.smart, research.drone],
  trigger: ({ brand }) => brand >= oneHundredMillion + twentyMillion,
  brand: twentyMillion,
}, {
  id: campaign.politicalAcumen,
  title: "Skew political acumen",
  milestones: [campaign.brandLoyalty],
  trigger: ({ brand }) => brand >= twoHundredMillion,
  brand: oneHundredMillion,
}, {
  id: campaign.goldenWig,
  title: "The golden wig prize",
  milestones: [campaign.brandLoyalty],
  trigger: ({ brand }) => brand >= fiveHundredMillion,
  brand: oneHundredMillion,
}, {
  id: campaign.hairToday,
  title: "Hair today, gone tomorrow",
  milestones: [opportunity.disruptShampoo],
  trigger: ({ meshNodes }) => meshNodes >= fourHundredMillion,
}, {
  id: campaign.dominance,
  title: "Market dominance",
  milestones: [campaign.politicalAcumen, campaign.goldenWig],
  trigger: ({ meshNodes }) => meshNodes >= oneBillion,
}, {
  id: campaign.wigMania,
  title: "WigMania",
  milestones: [campaign.dominance],
  trigger: ({ meshNodes }) => meshNodes >= twoBillion,
  log: initNews("2g", "Wigs more popular than a paperclip"),
}, {
  id: campaign.everyHead,
  title: "A wig on every head",
  milestones: [campaign.wigMania],
  trigger: ({ meshNodes }) => meshNodes >= threeBillion,
  duration: 60,
}].map((data, index) => ({
  ...data,
  allowCash: floorPrecision(data.allowCash ?? cost(index + 1)),
  duration: (data.duration ?? duration(index + 1)) * 1000,
  brand: data.brand ?? brandIncrease(index + 1),
})).map((data) => ({
  ...data,
  cost: cashString(data.allowCash),
}))

import { audioIds, enqueueAudio } from '../audio'
import { initNews, logTransform } from '../shared/logData'
import { cashString, labelWithCost, maxedUpgrades } from '../utils/humanize'
import { allowedCheck } from '../utils/hyperAppHelpers'
import intToChar from '../utils/intToChar'
import { floorPrecision } from '../utils/math'
import Memorization from '../utils/memorization'

export const news = [
  'Milliners adorn hardhats as safety concerns raised over hat wearing',
  'Red tape slashed for wig manufacturers',
  'Baseball caps banned in public places',
  'Trouble in Panama, hats banned',
  'Mandatory wigs for all loiterers',
  'Hairspray linked to hair loss',
  'No hair in face whilst driving',
  'Wig popularity “here to stay” says official',
  'Police give out hair clips to long haired drivers',
  'Bold parents send kids to school in wigs',
  'Politician apologises for not wearing wig during interview',
  'New research data favours wigs',
  'Airline declares wigs safe for pilots',
  'Politicians agree landmark push for wig wearing',
  'Schools told to include hair hygiene in curriculum',
  'Wig ownership rockets forward',
  'Government opens first wig recycling plant',
  'Committee formed to promote benefits of wigs',
  'Swimming pools to offer wig hooks',
  'Wig statue unveiled',
  'No where to grow; short hair mandatory across public services',
  'Hockey team iced for not wearing wigs',
  'Regulations loosen in favor of wig makers',
  'Mayor orders Wig Celebration Day',
  'Competition laws no longer a problem',
  'Border police turn away couple without wigs',
  'Health benefits of hair over wigs disproved',
  'Wow factor for wigs',
  'Chaos at shopping center as wigs become must have item',
  'Train company makes wigs mandatory part of uniform',
  'Crisis time for hat makers',
  'Prohibited: hats when driving',
  'Politician denies accepting bribe from wig manufacturer',
  'Government sues maker of “dangerous berets”',
  'Milliner files for bankruptcy',
  'Doubts over wigs brushed under the carpet',
  'Time running out for hat makers',
  'Giant inflatable wigs fly high at city festival',
  'Wigs dominate political agenda',
  'Anti-trust enquiry falls on deaf ears',
  'Wig advocate cleared of all charges',
  'Wigs now worn by 95% of politicians',
  'Hazardous waste problem washed away',
  'Wig protesting outlawed',
  'New law bans hat wearing in public'
].map((text, index) => initNews(`7${intToChar(index)}`, text))

const maxReached = (count) => count >= news.length
const brandImprovement = (bribes) => (bribes + 1) * 10000
const costFn = (level) => {
  let multiplier = 1
  if (level >= 37) {
    multiplier = 1 + (level / 5) * 39
  } else if (level >= 27) {
    multiplier = 1 + (level / 5) * 29
  } else if (level >= 20) {
    multiplier = 1 + (level / 5) * 21
  } else if (level >= 5) {
    multiplier = 1 + (level / 5) * 3.8
  }
  return floorPrecision((Math.log(level + 2) ** ((level * 0.101))) * 160000 * multiplier)
}
const costMemo = new Memorization(costFn)

export const allowed = ({ bribes, cash }) => !maxReached(bribes) && cash >= costMemo.get(bribes)

const labelFn = (bribes) => {
  if (maxReached(bribes)) { return maxedUpgrades }
  const increase = '+1'
  const increaseCost = cashString(costMemo.get(bribes))
  return labelWithCost(increase, increaseCost)
}
const labelMemo = new Memorization(labelFn)
export const buyBribeLabel = ({ bribes }) => labelMemo.get(bribes)

const BuyBribeActual = (state) => [{
  ...state,
  bribes: state.bribes + 1,
  cash: state.cash - costMemo.get(state.bribes),
  brand: state.brand + brandImprovement(state.bribes),
  ...logTransform(state, news[state.bribes])
}, enqueueAudio(audioIds.button)]

export const BuyBribe = () => allowedCheck(allowed, BuyBribeActual)

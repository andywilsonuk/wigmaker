import { sceneTempFlags } from "../../src/shared/sceneTempFlags"
import toggleFlags from "../../src/utils/toggleFlags"

export const wigStockState = (stocks) => ({
  wigs: stocks.reduce((a, b) => a + b, 0),
  wigsHair: stocks[0],
  wigsNylon: stocks[1],
  wigsSilicone: stocks[2],
  wigsAlgae: stocks[3],
  wigsSmart: stocks[4],
})

export const noIncidentState = () => ({
  incidentId: null,
  incidentDue: null,
  sceneTemp: sceneTempFlags.none,
})

export const wigOrderState = (orders = [0, 0, 0, 0, 0]) => ({ orders })
export const logState = (...messages) => ({ log: [...messages] })
export const cashState = (cash) => ({ cash })
export const brandState = (brand, brandMultiplier) => ({ brand, brandMultiplier: brandMultiplier ?? 1 })
export const demandState = (accumulation) => ({ demandAccumulation: accumulation })
export const hairState = (hair) => ({ hair })
export const nylonState = (nylon) => ({ nylon })
export const siliconState = (silicon) => ({ silicon })
export const achievedState = (...achievements) => ({ achieved: [...achievements] })
export const buyLevelState = (buyLevel = 0) => ({ buyLevel })
export const wigCapsState = (wigCaps) => ({ wigCaps })
export const autoSiliconState = (toggle) => ({ autoSilicon: toggle ? toggleFlags.toggle(toggleFlags.available()) : toggleFlags.unavailable() })
export const autoPuttyState = (toggle) => ({ autoPutty: toggle ? toggleFlags.toggle(toggleFlags.available()) : toggleFlags.unavailable() })
export const strandsState = (strands) => ({ strands })
export const vogueState = (vogue) => ({ vogue })
export const vogueLimitState = (vogueLimit, vogueMax) => ({ vogueLimit, vogueMax })
export const trendsState = ({ status, selectedDue = "0", progress = 0, iteration = 0 }) => ({
  trendStatus: status,
  trendIteration: iteration,
  trendDue: selectedDue,
  trendProgress: progress,
})
export const microState = (micro, microBio) => ({ micro, microBio })
export const algaeState = (algae) => ({ algae })
export const fabricatorState = (fabricators, fabricatorHyper) => ({ fabricators, fabricatorHyper })
export const fabricatingState = (fabricating) => ({ fabricating })
export const powerSupplyState = (...supplyIds) => ({ powerSupply: supplyIds })
export const powerDemandState = (powerDemand) => ({ powerDemand })
export const seedState = (seed = 0) => ({ randSeed: seed })
export const bribesState = (bribes) => ({ bribes })

import dataProvider from '../shared/dataProvider'
import { campaign, notion, milestone, research, opportunity } from '../shared/milestones'

export const categories = {
  notion: 'Notion',
  research: 'Res',
  campaign: 'Camp',
  triggered: 'Trig',
  opportunity: 'Opp'
}

const orderMilestones = () => {
  let unmatched = dataProvider.all
  const matchedIds = []
  let iterations = 0

  while (unmatched.length !== 0) {
    iterations += 1
    if (iterations > 100) {
      throw new Error(`Too many milestone match iterations, probably a bad occurs milestone in ${unmatched[0].id}`)
    }
    const more = unmatched.filter((x) =>
      x.milestones === undefined ||
      x.milestones.every((y) => matchedIds.includes(y) || (y === milestone.warStarted && matchedIds.includes(milestone.war))))

    matchedIds.push(...more.map((x) => x.id))
    unmatched = unmatched.filter((x) => !matchedIds.includes(x.id))
  }

  return matchedIds
}

const mapCategory = (category, pairs) => ({ category, mapped: new Map(Object.entries(pairs).map(([k, v]) => [v, k])) })
const expandOrderedMilestones = () => {
  const mappings = [
    mapCategory(categories.notion, notion),
    mapCategory(categories.research, research),
    mapCategory(categories.campaign, campaign),
    mapCategory(categories.triggered, milestone),
    mapCategory(categories.opportunity, opportunity)
  ]
  return orderMilestones()
    .map((id) => mappings
      .map((m) => ({ id, category: m.category, name: m.mapped.get(id) }))
      .find((m) => m.name !== undefined))
}

export default () => expandOrderedMilestones()

import dataProvider from '../shared/dataProvider'
import criteriaCheck from '../utils/criteriaCheck'

export default (state) => {
  const newlyVisible = dataProvider.campaigns
    .filter(({ id }) => !state.campaigns.some((n) => n.id === id))
    .filter((c) => criteriaCheck(state, c))
    .map(({ id }) => ({ id }))

  if (newlyVisible.length === 0) { return state }
  return {
    ...state,
    campaigns: state.campaigns.concat(newlyVisible)
  }
}

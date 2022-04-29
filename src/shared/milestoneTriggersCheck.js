import dataProvider from './dataProvider'
import { achievedLookup } from './milestones'
import outcomeHandler from './outcomeHandler'
import { save } from '../state/statePersister'

export default (state) => {
  const occurred = dataProvider.milestoneTriggers
    .filter(({ id }) => !achievedLookup.has(state.achieved, id))
    .filter(({ trigger }) => trigger(state))
  return occurred.length === 0 ? state : [state].concat(occurred.map(outcomeHandler)).concat([save()])
}

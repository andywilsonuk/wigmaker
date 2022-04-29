import toggleFlags from '../utils/toggleFlags'

export const ToggleMarketForcesView = (state) => ({ ...state, marketForcesAltView: toggleFlags.toggle(state.marketForcesAltView) })

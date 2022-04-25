export const effectWithPayload = (dispatch, { action, payload }) => {
  dispatch([action, payload])
}

export const effectNoPayload = (dispatch, action) => {
  dispatch(action)
}

const wrapWhenAllowed = (whenAllowed, payload) => (payload === undefined ? whenAllowed : [whenAllowed, payload])

export const allowedCheck = (condition, whenAllowed, payload) => (state) => (condition(state, payload) ? wrapWhenAllowed(whenAllowed, payload) : state)

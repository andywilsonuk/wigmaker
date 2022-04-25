/* eslint-disable no-alert */
let hasAlerted = false

export default (dispatch) =>
  (action, payload) => {
    try {
      dispatch(action, payload)
    } catch (error) {
      if (hasAlerted) { return }
      hasAlerted = true
      console.log(error)
      window.alert(error)
      throw error
    }
  }

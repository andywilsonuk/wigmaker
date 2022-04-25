export const onEvent = (dispatch, { name, action }) => {
  const listener = (event) => dispatch(action, event)

  window.addEventListener(name, listener)

  return () => window.removeEventListener(name, listener)
}
export const windowEvent = (name, action) => [onEvent, { name, action }]

const repeat = (dispatch, { action, delay }) => {
  const id = setInterval(() => dispatch(action), delay)
  return () => clearInterval(id)
}
export const repeatTimer = (action, delay) => [repeat, { action, delay }]

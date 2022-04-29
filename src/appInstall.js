let deferredPrompt
let dispatcher

const forceRender = (dispatch) => dispatch((state) => ({ ...state }))

const before = (e) => {
  e.preventDefault()
  deferredPrompt = e
  forceRender(dispatcher)
}
const initServiceWorker = () => {
  if (window.location.hostname === 'localhost') { return }
  navigator.serviceWorker.register(new URL('service-worker.js', import.meta.url), { type: 'module' })
}

export const init = (dispatch) => {
  if (!('serviceWorker' in navigator)) { return }
  dispatcher = dispatch
  window.addEventListener('beforeinstallprompt', before)
  window.addEventListener('load', initServiceWorker)
}

export const canInstall = () => deferredPrompt != null

const installPrompt = async (dispatch) => {
  deferredPrompt.prompt()
  await deferredPrompt.userChoice
  deferredPrompt = null
  forceRender(dispatch)
}
const installPrompter = () => [installPrompt]
export const InstallApp = (state) => [state, installPrompter()]

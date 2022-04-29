import { save } from '../state/statePersister'
import { repeatTimer, windowEvent } from '../utils/eventListeners'

const Save = (state) => [state, save()]
export const saveOnSchedule = () => repeatTimer(Save, 5000)

const VisibilityChanged = (state) => [state, document.visibilityState === 'hidden' && save()]
export const saveOnHidden = () => windowEvent('visibilitychange', VisibilityChanged)

import { expandLogList, logEntryType } from '../shared/logData'
import { h, text } from '../hyperapp'
import { orderedList } from './simple'

const textMessage = (uid, message) => h('li', { key: uid, class: ['logItem', 'logItemGeneral'] }, text(message))
const newsMessage = (uid, message) => h('li', { key: uid, class: ['logItem', 'logItemNews'] }, text(`News: ${message}`))
const meshMessage = (uid, message) => h('li', { key: uid, class: ['logItem', 'logItemMesh'] }, text(message))
const renderMessage = ({ type, uid, message }) => {
  switch (type) {
    case logEntryType.news: return newsMessage(uid, message)
    case logEntryType.mesh: return meshMessage(uid, message)
    default: return textMessage(uid, message)
  }
}
export default (state) => orderedList(expandLogList(state).map(renderMessage))

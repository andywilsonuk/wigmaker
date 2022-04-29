import Memorization from '../utils/memorization'

const logMaxSize = 15
const innerMap = new Map()

export const logEntryType = {
  message: 'message',
  news: 'news',
  mesh: 'mesh'
}

const initEntry = (id, text, type) => {
  if (innerMap.has(id)) { throw new Error(`Duplicate log entry id ${id}`) }
  const entry = { id, text, type }
  innerMap.set(id, entry)
  return entry
}

export const initMessage = (id, text) => initEntry(id, text, logEntryType.message)
export const initNews = (id, text) => initEntry(id, text, logEntryType.news)
export const initMesh = (id, text) => initEntry(id, text, logEntryType.mesh)

export const logTransform = ({ log }, entry) => {
  if (entry === undefined) { return undefined }
  const newLog = log.slice(0, logMaxSize)
  newLog.unshift(entry.id)
  return { log: newLog }
}

export const definedLogEntries = () => [...innerMap.values()]

const calcExpandedLogList = (log) => {
  const usage = new Map()
  const expanded = log.map((id) => {
    const { text, type } = innerMap.get(id)
    const usageCount = (usage.get(id) ?? 0) + 1
    usage.set(id, usageCount)
    return { uid: `${id}-${usageCount}`, message: text, type }
  })
  return expanded
}
const expandLogMemo = new Memorization(calcExpandedLogList)
export const expandLogList = ({ log }) => expandLogMemo.get(log)

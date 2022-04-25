/* eslint-disable no-console */
import { audioIds, enqueueAudio } from "../audio"
import dataProvider from "../shared/dataProvider"
import { definedLogEntries } from "../shared/logData"
import { repeatTimer } from "../utils/eventListeners"

export const OutputCampaigns = (state) => {
  dataProvider.campaigns.forEach((c) => console.log(c))
  return [state, enqueueAudio(audioIds.button)]
}

export const OutputLogText = (state) => {
  definedLogEntries().forEach((c) => console.log(c.text))
  return [state, enqueueAudio(audioIds.button)]
}

const greaterThan = (a, b) => {
  const aUpper = a.toUpperCase() === a
  const bUpper = b.toUpperCase() === b

  if (!aUpper && bUpper) { return true }
  if (aUpper && !bUpper) { return false }
  return b > a
}

export const OutputMaxMessageIds = (state) => {
  const highestValues = new Map()

  definedLogEntries().forEach((c) => {
    const value = c.id
    const key = value[0]
    if (!highestValues.has(key) || greaterThan(highestValues.get(key), value)) {
      highestValues.set(key, value)
    }
  })

  const orderedValues = Array.from(highestValues, ([, value]) => (value)).sort()
  console.log(orderedValues)
  return [state, enqueueAudio(audioIds.button)]
}

export const IncludeGameTime = (state) => [{
  ...state,
  gameTime: state.gameTime ?? 0,
}, enqueueAudio(audioIds.button)]

export const IncrementGameTime = (state) => (state.gameTime == null ? state : {
  ...state,
  gameTime: state.gameTime + 1000,
})

export const gameTimeCounter = () => repeatTimer(IncrementGameTime, 1000)

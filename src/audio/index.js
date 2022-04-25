export const audioIds = {
  button: "button",
  toggle: "toggle",
  lowPower: "lowPower",
  tabChange: "tabChange",
  titlesNav: "titlesNav",
  meshIteration: "meshIteration",
  researchComplete: "researchComplete",
  theEnd: "theEnd",
  incident: "incident",
  pause: "pause",
  start: "start",
  computeZero: "computeZero",
  meshMode: "meshMode",
}

let audioPlayers
let audioPlayersMap
let playQueue = []

const queuePlay = (_, audioId) => { playQueue.push(audioId) }
export const enqueueAudio = (audioId) => [queuePlay, audioId]

export const playQueued = () => {
  for (let index = 0; index < playQueue.length; index += 1) {
    audioPlayersMap.get(playQueue[index]).play()
  }
  playQueue = []
}

export const clearQueued = () => { playQueue = [] }
export const mute = () => { audioPlayers.forEach((x) => x.mute()) }
export const unmute = () => { audioPlayers.forEach((x) => x.unmute()) }
export const pause = () => { audioPlayers.forEach((x) => x.pause()) }
export const unpause = () => { audioPlayers.forEach((x) => x.unpause()) }

export const stopAudio = (audioId) => audioPlayersMap.get(audioId).stop()

export const init = (sounds) => {
  audioPlayers = sounds
  audioPlayersMap = new Map(sounds.map((s) => [s.id, s]))
}

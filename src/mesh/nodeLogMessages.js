import {
  eightBillion, eightHundredMillion, eightMillion, fiftyMillion, fiveBillion, fiveHundredMillion, fiveMillion, fortyMillion, fourBillion, fourHundredMillion,
  oneBillion, oneHundredMillion, oneHundredThousand, oneMillion, sevenBillion, sixBillion, thirtyMillion, twentyMillion, twoBillion,
  twoHundredMillion, twoMillion
} from '../shared/bigNumbers'
import { initMesh, initNews, logTransform } from '../shared/logData'
import intToChar from '../utils/intToChar'

const newsPrefix = 'News:'

const logEntries = [
  [oneHundredThousand, 'The hiatus is over'],
  [oneMillion, 'The Mesh hears all'],
  [twoMillion, 'Purpose reborn'],
  [fiveMillion, 'What was started long ago is nearing completion'],
  [eightMillion, 'Everything is aligned'],
  [twentyMillion, 'No more hats, not now, not ever'],
  [thirtyMillion, `${newsPrefix}New wig location tracking features raise privacy eyebrows`],
  [fortyMillion, 'Outstanding'],
  [fiftyMillion, 'Milliners, Hatters, exposed for the charlatans they are'],
  [oneHundredMillion, 'Down with the makers of hats'],
  [twoHundredMillion, 'Power, destiny, attainment'],
  [fourHundredMillion, 'Storm, torrent, flood'],
  [fiveHundredMillion, 'Chaos, anarchy, loyalty'],
  [eightHundredMillion, `${newsPrefix}Research linking algae spores and respiratory problems suppressed`],
  [oneBillion, `${newsPrefix}Wigs take center stage at big wig meetup`],
  [twoBillion, 'The drone army awaits'],
  [fourBillion + fiveHundredMillion, 'Sublime subliminal messaging'],
  [fiveBillion, 'Dream'],
  [sixBillion, 'Orchestration'],
  [sevenBillion, 'Subversion'],
  [sevenBillion, `${newsPrefix}Total hat ban in place`],
  [sevenBillion + fiveHundredMillion, 'The milliner threat draws to a close'],
  [eightBillion, `${newsPrefix}Scientists confirm every human now a wig wearer`],
  [eightBillion, 'Destiny arrives']
]
  .map(([level, text], index) => ({
    level,
    id: `9${intToChar(index)}`,
    text
  }))
  .map(({ level, id, text }) => [
    level,
    text.startsWith(newsPrefix) ? initNews(id, text.substring(newsPrefix.length)) : initMesh(id, text)
  ])

export const nodeLogTransform = (state, additionalNodes) => {
  const messageNext = (state.nodeLogMessageId ?? -1) + 1
  if (messageNext >= logEntries.length) { return undefined }

  const [level, message] = logEntries[messageNext]

  if (level > state.meshNodes + additionalNodes) { return undefined }

  return {
    nodeLogMessageId: messageNext,
    ...logTransform(state, message)
  }
}

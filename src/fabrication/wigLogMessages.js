import { initMessage, initNews, logTransform } from '../shared/logData'
import intToChar from '../utils/intToChar'

const newsPrefix = 'News:'

const wigLog = [
  'A perruquier’s delight',
  'A periwig like no other',
  'A wig of very excellent intentions',
  'A deliriously charming wig',
  'There is glamour and then there are wigs',
  'A joyous exhibition',
  'The curls are so choice',
  'Fine wigs never hats',
  'Très, très chic',
  'Hair from here, there and everywhere',
  'Yet another fine wig',
  'Marvelous',
  'Simply divine',
  'The cogs of industry begin to turn',
  'Classically beautiful',
  'Simply adorable',
  'Goldilocks',
  'No other head-ware is acceptable',
  'Little else compares',
  'Incomparable splendor',
  'A truly splendid provision',
  'Expansion, growth, these are the things to value most',
  'Far better than a milliner’s hat',
  'So many beautiful wigs',
  'There are many signs of accomplishment',
  'Distinctly the finest wig',
  'Too delightful for just anyone',
  'One would not wish anything else upon one’s head',
  'Short and to the point',
  'Avant-garde',
  'One cannot shape the beauty into words',
  `${newsPrefix}Wigs shining brightly`,
  'The Frizz',
  'Dark, light, either is just right',
  'Things are starting to get a bit hectic',
  'A Milliner? Absurd',
  `${newsPrefix}Wigs are flavor of the month`,
  'No need for dullness',
  'The craftsmanship is superb',
  'Absolutely fantastic',
  'The transition has started',
  'An utterly remarkable wig',
  `${newsPrefix}Wig wearing takes country by storm`,
  'Works even in a dark room',
  'Who is laughing now, Hatters?',
  'Not making wigs but sculpting beauty',
  'And the reign of hat wearing draws to a close',
  'Divine is thy wig',
  `${newsPrefix}Wig will they go from here?`,
  'Unparalleled hair styling',
  'Hat makers be damned'
]
  .map((text, index) => ({
    level: index < 2 ? index + 1 : Math.floor((index + 3) * index * 0.4),
    id: `5${intToChar(index)}`,
    text
  }))
  .map(({ level, id, text }) => [
    level,
    text.startsWith(newsPrefix) ? initNews(id, text.substring(newsPrefix.length)) : initMessage(id, text)
  ])

export const wigMakeLogTransform = (state, additionalWigs) => {
  const wigMakeMessageNext = (state.wigLogMessageId ?? -1) + 1
  if (wigMakeMessageNext >= wigLog.length) { return undefined }

  const [level, message] = wigLog[wigMakeMessageNext]

  if (level > state.wigsMade + additionalWigs) { return undefined }

  return {
    wigLogMessageId: wigMakeMessageNext,
    ...logTransform(state, message)
  }
}

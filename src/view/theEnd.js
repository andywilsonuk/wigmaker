import { h, text } from '../hyperapp'
import { EndToTitles } from '../shared/sceneHelpers'
import { button, container, styledSpan } from '../viewComponents'

const letters = 'wigmaker'.split('')

export default () => container({ class: 'theEndContainer' }, [
  container({ class: ['theEndLetters', 'logoFont'], 'aria-label': 'wigmaker' }, letters.map((letter) => h('span', { 'aria-hidden': true }, text(letter)))),
  container(styledSpan('logoFont', 'The hat makers are gone.')),
  container(button({ class: ['exitButton', 'marginTop'], onclick: EndToTitles }, text('End')))
])

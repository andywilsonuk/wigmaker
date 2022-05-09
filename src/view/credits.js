import { h, text } from '../hyperapp'
import { DialogBack } from '../shared/sceneHelpers'
import { container, dialogButton, flexRow, flexRowLastRight } from '../viewComponents'

const link = (url, label) => h('a', { href: url }, text(label))

export default () => container({ class: 'dialogOverlay' },
  container({ class: 'dialog' }, [
    container({ class: 'dialogHeader' }, text('Credits')),
    flexRow([text('Code and design by Andy Wilson (redgem.games).'), link('https://github.com/andywilsonuk/wigmaker/', 'Source code')]),
    flexRow(container([text('Audio with thanks from '), link('https://www.zapsplat.com', 'zapsplat.com')])),
    flexRow([
      dialogButton('Back', DialogBack),
      flexRowLastRight(text('Version 1.6.1'))
    ])
  ]))

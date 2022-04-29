/* eslint-disable max-len */
import { h } from '../hyperapp'
import { svg } from '../viewComponents/svg'

const defs = svg('0 0 100 100', { class: 'svgDefs' },
  h('defs', {}, [
    h('linearGradient', { id: 'progressGradient' }, [
      h('stop', { class: 'progressGradientStop1', offset: '90%' }),
      h('stop', { class: 'progressGradientStop2', offset: '100%' })
    ]),
    h('radialGradient', { id: 'meshNodeGradient' }, [
      h('stop', { class: 'meshNodeGradientStop1', offset: '60%' }),
      h('stop', { class: 'meshNodeGradientStop2', offset: '95%' })
    ]),
    h('radialGradient', { id: 'meshNodeGradientOn' }, [
      h('stop', { class: 'meshNodeGradientOnStop1', offset: '60%' }),
      h('stop', { class: 'meshNodeGradientOnStop2', offset: '95%' })
    ])
  ]))

export default () => defs

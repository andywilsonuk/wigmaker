import { h, text } from '../hyperapp'
import { container, flexRowLastRight } from './simple'

const header = (title) => h('h3', { class: 'panelHeader' }, text(title))

export default (title, children) =>
  container({ class: 'panel' }, [
    header(title),
    container({ class: 'panelBody' }, children)
  ])

export const notionsPanel = (title, children) =>
  container({ class: ['panel', 'panelNotions'] }, [
    header(title),
    container({ class: 'panelBody' }, children)
  ])

export const researchPanel = (title, lights, children) =>
  container({ class: ['panel', 'panelResearch'] }, [
    container({ class: ['panelHeader', 'flexRow'] }, [
      h('h3', {}, text(title)),
      flexRowLastRight(lights)
    ]),
    container({ class: 'panelBody' }, children)
  ])

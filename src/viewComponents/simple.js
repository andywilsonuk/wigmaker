import { h, text } from '../hyperapp'
import { labelWithCost } from '../utils/humanize'

export const separator = () => h('hr', {})
export const spanBlock = (children) => h('span', { class: 'spanBlock' }, children)
export const plainSpan = (innerText) => h('span', {}, text(innerText))
export const plainSpanWithMarginRight = (innerText) => h('span', { class: 'marginRightHalf' }, text(innerText))
export const plainSpanWithCost = (innerText, cost) => plainSpan(labelWithCost(innerText, cost))
export const plainRight = (innerText) => h('span', { class: 'alignRight' }, text(innerText))
export const styledSpan = (className, innerText) => h('span', { class: className }, text(innerText))
export const container = (props, children) => h('div', children == null ? {} : props, children == null ? props : children)
export const button = (props, children) => h('button', props, children)
export const list = (props, children) => h('ul', props ?? {}, children)
export const orderedList = (props, children) => h('ol', children == null ? {} : props, children == null ? props : children)
export const listItem = (key, children) => h('li', { key }, children)
export const flexRow = (children) => h('div', { class: 'flexRow' }, children)
export const flexRowLastRight = (children) => h('div', { class: 'flexRowLastRight' }, children)

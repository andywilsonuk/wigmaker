import { h } from '../hyperapp'

export const table = (className, rows) => h('table', { class: className }, rows)
export const tableRow = (props, cells) => h('tr', cells == null ? {} : props, cells == null ? props : cells)
export const tableCell = (props, children) => h('td', children == null ? {} : props, children == null ? props : children)
export const tableHeader = (children) => h('th', {}, children)

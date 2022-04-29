import { h } from '../hyperapp'

export const svg = (viewBox, props, children) => h('svg', { viewBox, ...props }, children)
export const line = (x1, y1, x2, y2, props) => h('line', { x1, y1, x2, y2, ...props })
export const path = (shape) => h('path', { d: shape })
export const circle = (x, y, radius, props) => h('circle', { cx: x, cy: y, r: radius, ...props })
export const rect = (x, y, width, height, props) => h('rect', { x, y, width, height, ...props })

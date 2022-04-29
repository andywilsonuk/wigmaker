import { text } from '../hyperapp'
import { button } from './simple'

export const dialogButton = (label, action, enabled = true) =>
  button({ class: 'dialogButton', onclick: action, disabled: !enabled }, text(label))

export const dialogConfirmButton = (label, action, enabled = true) =>
  button({ class: ['dialogButton', 'confirm'], onclick: action, disabled: !enabled }, text(label))

export const dialogOptionButton = (action, label, enabled = true) =>
  button({ class: 'dialogButton', onclick: action, disabled: !enabled }, text(label))

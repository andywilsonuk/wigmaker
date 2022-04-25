/* eslint-disable max-len */
import { notion } from "../shared/milestones"
import { path, svg } from "./svg"

const dollar = path("M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z")
const robot = path("M19.93,8.21l-3.6,1.68L14,7.7V6.3l2.33-2.19l3.6,1.68c0.38,0.18,0.82,0.01,1-0.36c0.18-0.38,0.01-0.82-0.36-1L16.65,2.6 c-0.38-0.18-0.83-0.1-1.13,0.2l-1.74,1.6C13.6,4.16,13.32,4,13,4c-0.55,0-1,0.45-1,1v1H8.82C8.34,4.65,6.98,3.73,5.4,4.07 C4.24,4.32,3.25,5.32,3.04,6.5C2.82,7.82,3.5,8.97,4.52,9.58L7.08,18H4v3h13v-3h-3.62L8.41,8.77C8.58,8.53,8.72,8.28,8.82,8H12v1 c0,0.55,0.45,1,1,1c0.32,0,0.6-0.16,0.78-0.4l1.74,1.6c0.3,0.3,0.75,0.38,1.13,0.2l3.92-1.83c0.38-0.18,0.54-0.62,0.36-1 C20.75,8.2,20.31,8.03,19.93,8.21z M6,8C5.45,8,5,7.55,5,7s0.45-1,1-1s1,0.45,1,1S6.55,8,6,8z")
const bolt = path("M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z")
const doubleLine = path("M20,9H4v2h16V9z M4,15h16v-2H4V15z")
const lightbulb = path("M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z")
const quadrants = path("M16,18v2H8v-2H16z M11,7.99V16h2V7.99h3L12,4L8,7.99H11z")
const token = path("M19.97,6.43L12,2L4.03,6.43L9.1,9.24C9.83,8.48,10.86,8,12,8s2.17,0.48,2.9,1.24L19.97,6.43z M10,12c0-1.1,0.9-2,2-2 s2,0.9,2,2s-0.9,2-2,2S10,13.1,10,12z M11,21.44L3,17V8.14l5.13,2.85C8.04,11.31,8,11.65,8,12c0,1.86,1.27,3.43,3,3.87V21.44z M13,21.44v-5.57c1.73-0.44,3-2.01,3-3.87c0-0.35-0.04-0.69-0.13-1.01L21,8.14L21,17L13,21.44z")
const trend = path("M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z")
const filledCircle = path("M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z")
const infinity = path("M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l7.03-6.24c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z")
const stalled = path("M 5 5L15 10L5 15z")
const viewChange = path("M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z")
const plus = path("M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z")
const minus = path("M19 13H5v-2h14v2z")
const install = path("M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z")

const notionIcons = new Map([
  [notion.marketing, dollar],
  [notion.packaging, dollar],
  [notion.wigs1, quadrants],
  [notion.wigs2, quadrants],
  [notion.wigs3, quadrants],
  [notion.wigs4, quadrants],
  [notion.wigCap1, doubleLine],
  [notion.wigCap2, doubleLine],
  [notion.wigCap3, doubleLine],
  [notion.wigCap4, doubleLine],
  [notion.fabricator, robot],
  [notion.fabflow, robot],
  [notion.operationalEfficiency, robot],
  [notion.power, bolt],
  [notion.research, lightbulb],
  [notion.nylonWigs, filledCircle],
  [notion.siliconeWigs, token],
  [notion.wiglets, token],
  [notion.bulkBuy1, trend],
  [notion.bulkBuy2, trend],
  [notion.bulkBuy3, trend],
  [notion.bulkBuy4, trend],
  [notion.nationwide, dollar],
])
const viewBox = "0 0 24 24"
export const notionIconById = (id) => svg(viewBox, { class: "notionImage", ariaHidden: true }, notionIcons.get(id))
export const infiniteIcon = (props) => svg(viewBox, props, infinity)
export const powerIcon = (props) => svg(viewBox, props, bolt)
export const stalledIcon = (props) => svg(viewBox, props, stalled)
export const viewChangeIcon = (props) => svg(viewBox, props, viewChange)
export const increaseIcon = (props) => svg(viewBox, props, plus)
export const decreaseIcon = (props) => svg(viewBox, props, minus)
export const installIcon = (props) => svg(viewBox, props, install)

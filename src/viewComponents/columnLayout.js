import { h, text } from "../hyperapp"

export const main = (children) => h("main", {}, children)
export const logArea = (children) => h("section", { class: "logArea" }, children)
export const leftArea = (children) => h("section", { class: "leftArea" }, children)
export const rightArea = (children) => h("section", { class: "rightArea" }, children)
export const flatTitle = (label) => h("h2", { class: "titleArea" }, text(label))

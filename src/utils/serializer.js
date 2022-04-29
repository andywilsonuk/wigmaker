export const dehydrate1 = (o) => Object.values(o)
export const rehydrate1 = (arr, template) => {
  const keys = Object.keys(template)
  const o = {}

  for (let index = 0; index < keys.length; index += 1) {
    o[keys[index]] = arr[index]
  }
  return o
}
export const dehydrate2 = (o) => Object.keys(o).sort().map((key) => o[key])
export const rehydrate2 = (arr, template) => {
  const keys = Object.keys(template).sort()
  const o = {}

  for (let index = 0; index < keys.length; index += 1) {
    o[keys[index]] = arr[index]
  }
  return o
}
export function textToObject (text, template) {
  switch (text[0]) {
    case '{': return JSON.parse(text)
    case 'w': return rehydrate1(JSON.parse(window.atob(text.substr(1))), template)
    case 'x': return rehydrate2(JSON.parse(window.atob(text.substr(1))), template)
    default: throw new Error('Bad state data')
  }
}
export const objectToText = (obj) => JSON.stringify(obj)
export const objectToCodedText = (obj) => `x${window.btoa(JSON.stringify(dehydrate2(obj)))}`

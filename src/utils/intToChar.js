export default (index) => {
  if (index >= 26 + 26) { throw new Error("Index is out of range") }
  return String.fromCharCode(index < 26 ? 97 + index : 65 + index - 26)
}

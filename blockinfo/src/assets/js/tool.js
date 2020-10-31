function addZero (num) {
  return ('0' + num).slice(-2)
}
function json2FormData (json) {
  return JSON.stringify(json).replace(/:/g, '=').replace(/,/g, '&').replace(/"/g, '').slice(1, -1)
}

export {
  addZero,
  json2FormData
}

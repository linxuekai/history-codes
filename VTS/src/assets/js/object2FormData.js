/**
 * Created by linxuekai on 2017/8/14.
 */
function json2FormData (json) {
  return JSON.stringify(json).replace(/:/g, '=').replace(/,/g, '&').replace(/"/g, '').slice(1, -1)
}
function arr2FormData (name, arr) {
  let str = ''
  arr.forEach(function (item) {
    str += `&${name}[]=${item}`
  })
  return str
}

export {
  json2FormData,
  arr2FormData
}

const fixNumberRegs = {}
for (let i = 1; i <= 8; i++) {
  fixNumberRegs[`fix${i}`] = new RegExp(`^\\d+\\.?\\d{0,${i}}$`)
}

const promiseBreaker = function () {
  let resolve, reject
  let promise = new Promise((s, j) => { // eslint-disable-line
    resolve = s
    reject = j
    setTimeout(reject, 60 * 1000, 'promiseBreaker pending time up')
  })
  return Object.assign(promise, {resolve, reject})
}

const transferKlineReqTime = function (timestamp, type) {
  let d = new Date(timestamp)
  let yy = d.getUTCFullYear().toString()
  let mm = ('0' + (d.getUTCMonth() + 1)).slice(-2)
  let dd = ('0' + d.getUTCDate()).slice(-2)
  let date = yy + mm + dd
  if (type === 'dateTime') {
    let hh = ('0' + d.getUTCHours()).slice(-2)
    let MM = ('0' + d.getUTCMinutes()).slice(-2)
    date += (hh + MM)
  }
  return date
}

const parseBarTime = function (barTime) {
  let str = '' + barTime
  let arr = (str.slice(0, 4) + str.slice(4).replace(/(\d{2})/g, ',$1')).split(',')
  arr[1] -= 1
  return Date.UTC.apply(null, arr)
}

function getResolutionTime (time, resolution) {
  let timeRange
  if (+resolution > 0) {
    timeRange = resolution
  } else {
    switch (resolution) {
      case 'D':
        timeRange = 24 * 60
        break
      case 'W':
        timeRange = 7 * 24 * 60
    }
  }
  return timeRange ? time - (time % (1000 * 60 * timeRange)) : time
}


const inputNumberCorector = (function () {
  function handler (prop, val, fixTo) {
    let target = this
    let targetProp = prop
    if (~prop.indexOf('.')) {
      let arr = prop.split('.')
      arr.forEach((property, i) => {
        if (i < arr.length - 1) {
          target = target[property]
        } else targetProp = property
      })
    }
    if (val && !fixNumberRegs[`fix${fixTo}`].test(val + '')) {
      if (isNaN(+val)) {
        target[targetProp] = (parseFloat(val) || '') + ''
      } else {
        let nDecimal = Math.pow(10, fixTo)
        target[targetProp] = Math.floor(val * nDecimal) / nDecimal + ''
      }
    } else {
      target[targetProp] = val
    }
  }
  return function (prop, val, fixTo = 8) {
    this.$nextTick(() => handler.call(this, prop, val, fixTo))
  }
})()


function loopRun (callback) {
  this.looping = true
  if (this.length) {
    callback(this.shift())
    return setTimeout(() => this.loopRun(callback), 0)
  } else {
    this.looping = false
  }
}

export {
  promiseBreaker,
  transferKlineReqTime,
  parseBarTime,
  getResolutionTime,
  inputNumberCorector,
  loopRun
}

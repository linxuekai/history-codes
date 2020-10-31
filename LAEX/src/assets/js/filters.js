import Vue from 'vue'
import store from '@/store'

function getTimeByObjDate (d, type) { // default datetime | date | time
  switch (type) {
    case 'date':
      return d.getFullYear() + '-' +
        ('0' + (d.getMonth() + 1)).slice(-2) + '-' +
        ('0' + d.getDate()).slice(-2)
    case 'time':
      return ('0' + d.getHours()).slice(-2) + ':' +
        ('0' + d.getMinutes()).slice(-2) + ':' +
        ('0' + d.getSeconds()).slice(-2)
    default:
      return d.getFullYear() + '-' +
        ('0' + (d.getMonth() + 1)).slice(-2) + '-' +
        ('0' + d.getDate()).slice(-2) + ' ' +
        ('0' + d.getHours()).slice(-2) + ':' +
        ('0' + d.getMinutes()).slice(-2) + ':' +
        ('0' + d.getSeconds()).slice(-2)
  }
}

Vue.filter('json', (obj) => {
  return JSON.stringify(obj)
})

Vue.filter('sliceTo', (num, n, type = 'floor') => {
  if (Number.isNaN(+num)) return '--'
  if (num < 0) return num.toFixed(n)
  let decimalHolder = Math.pow(10, n)
  let preFix = type === 'floor' ? 1e-10 : -1e-13
  return (Math[type]((num + preFix) * decimalHolder) / decimalHolder).toFixed(n)
})

Vue.filter('fixedTo', (num, n) => {
  if (Number.isNaN(+num)) return '--'
  return (+num).toFixed(n)
})

Vue.filter('signed', (n) => {
  if (n === undefined || Number.isNaN(n)) return '--'
  return n > 0
    ? '+' + n.toFixed(2)
    : '' + n.toFixed(2)
})

Vue.filter('changeClass', mkt => {
  let {close, open} = mkt
  if (close > open) return 'color-buy'
  else if (close < open) return 'color-sell'
  else return ''
})

Vue.filter('payCode', payCode => {
  return {
    bank: '银行转账',
    wechat: '微信',
    alipay: '支付宝'
  }[payCode]
})

Vue.filter('upperCase', str => str.toUpperCase())

Vue.filter('utcString', function (str, type) {
  if (!str) {
    return ''
  }
  let args = str.split(/-|\s|:/g)
  args[1]--
  let d = new Date(Date.UTC.apply(null, args))
  return getTimeByObjDate(d, type)
})

Vue.filter('utcTimeStamp', function (ts, type) {
  let d = new Date(ts * 1000)
  return getTimeByObjDate(d, type)
})

Vue.filter('tradeType', n => {
  return ['买入', '卖出'][n]
})

Vue.filter('tradeColor', n => {
  return ['color-buy', 'color-sell'][n]
})

Vue.filter('orderType', type => ({
  buy: '买入',
  sell: '卖出'
}[type]))

Vue.filter('orderTypeClass', type => ({
  buy: 'color-success',
  sell: 'color-danger'
}[type]))

Vue.filter('pricePoint', sb => store.state.pairs.pairsConf[sb].price_point)

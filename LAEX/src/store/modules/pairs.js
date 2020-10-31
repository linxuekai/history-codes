import {$get, $fetch} from '@/axios'
import {promiseBreaker} from "../../assets/js/tools";

export default {
  namespaced: true,
  state: {
    quotationBaseCoin: localStorage.getItem('quotationBaseCoin') || 'USDT',
    baseCoin: localStorage.getItem('baseCoin') || 'USDT',
    targetCoin: localStorage.getItem('targetCoin') || 'BTC',
    allPairSymbols: JSON.parse(localStorage.getItem('allPairSymbols')) || {},
    currentMkt: {},
    balance: {},
    allSymbolsReady: promiseBreaker(),
    marketDepth: {
      asks: [],
      bids: [],
    },
    tradeHistory: [
      {type: 0, price: 1, amount: 2, time: Math.floor(Date.now() / 1000)}
    ],
    hisTickReduceLen: 0,
    priceProvider: [],
    pairsConf: JSON.parse(localStorage.getItem('pairsConf')) || {}
  },
  getters: {
    klineSymbol (state) {
      return state.targetCoin + '/' + state.baseCoin
    },
    latest (state) {
      let {allPairSymbols, baseCoin, targetCoin} = state
      let pair = allPairSymbols[baseCoin]
        ? (allPairSymbols[baseCoin][targetCoin] || {})
        : {}
      return pair.close
    },
    pricePoint (state) {
      let {baseCoin, targetCoin, pairsConf} = state
      let conf = pairsConf[`${targetCoin}/${baseCoin}`]
      return conf ? conf.price_point : 4
    },
    sizePoint (state) {
      let {baseCoin, targetCoin, pairsConf} = state
      let conf = pairsConf[`${targetCoin}/${baseCoin}`]
      return conf ? conf.size_point : 6
    }
  },
  mutations: {
    updateKlineSymbol (state, {baseCoin, targetCoin}) {
      localStorage.setItem('baseCoin', state.baseCoin = baseCoin)
      localStorage.setItem('targetCoin', state.targetCoin = targetCoin)
    },
    updateGetAllSymbols (state, allSymbols) {
      state.allPairSymbols = allSymbols
      state.allSymbolsReady.resolve(allSymbols)
      localStorage.setItem('allPairSymbols', JSON.stringify(allSymbols))
    },
    marketOverview (state, obj) {
      let origin = state.allPairSymbols
      if (obj.b) {
        origin[obj.b][obj.t] = obj
      } else {
        Object.keys(obj).forEach(baseCoin => {
          let originBase = origin[baseCoin]
          if (originBase) {
            Object.keys(obj[baseCoin]).forEach(targetCoin => {
              if (originBase[targetCoin]) {
                originBase[targetCoin] = obj[baseCoin][targetCoin]
              }
            })
          }
        })
      }
    },
    updateQuotationBaseCoin (state, coin) {
      state.quotationBaseCoin = coin
      localStorage.setItem('quotationBaseCoin', coin)
    },
    updateMarketDepth (state, data) {
      state.marketDepth = data
    },
    spliceAsks (state, args) {
      let {asks} = state.marketDepth
      asks.splice(...args)
      asks.length > 20 && asks.shift()
    },
    spliceBids (state, args) {
      let {bids} = state.marketDepth
      bids.splice(...args)
      bids.length > 20 && bids.pop()
    },
    updateGetBalance (state, obj) {
      state.balance = obj
    },
    updateTradeHistory (state, {replace, add, data}) {
      if (add) {
        let arr = state.tradeHistory
        state.hisTickReduceLen++
        if (arr.unshift(data) > 300) arr.pop()
      } else if (replace) {
        state.tradeHistory = data
        state.hisTickReduceLen = data.length
      }
    },
    initPriceProvider (state) {
      let {asks, bids} = state.marketDepth
      state.priceProvider = [
        asks.length ? asks[asks.length - 1].p.toFixed(8).replace(/\.?0+$/, '') : '',
        bids.length ? bids[0].p.toFixed(8).replace(/\.?0+$/, '') : ''
      ]
    },
    updatePriceProvider (state, p) {
      state.priceProvider = p || ''
    },
    updatePairsConf (state, pairsConf) {
      state.pairsConf = pairsConf
      localStorage.setItem('pairsConf', JSON.stringify(pairsConf))
    }
  },
  actions: {
    async getAllSymbols ({commit, dispatch, state}) {
      let res = await $get('/v1/symbolList')
      if (res._statusOk) {
        let obj = {}
        let pairsConf = {}
        res.data.forEach(pairConf => {
          pairsConf[pairConf.symbol] = pairConf
          let [targetCoin, baseCoin] = pairConf.symbol.split('/')
          let baseCoinObj = obj[baseCoin] || (obj[baseCoin] = {})
          baseCoinObj[targetCoin] = {
            close: 0,
            high: 0,
            low: 0,
            open: 0,
            vol: 0,
          }
        })
        commit('updatePairsConf', pairsConf)
        commit('updateGetAllSymbols', obj)
      }
    },
    async getBalance ({commit}) {
      let res = await $fetch('/v1/account/coin')
      if (res._statusOk) {
        let obj = {}
        res.data.forEach(item => {
          obj[item.coin] = item
        })
        commit('updateGetBalance', obj)
      }
    }
  }
}

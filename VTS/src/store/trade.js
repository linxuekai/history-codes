/**
 * Created by linxuekai on 2017/8/24.
 */
import proxy from '@/signalr'
export default {
  state: {
    currentPrice: null,
    currentMarketData: {},
    buyFee: 0,
    saleFee: 0,
    keepingOrders: [],
    agencyTableData: [],
    tranTableData: [],
    marketData: [],
    marketDataReady: false,
    componySold: 0,
    buyStream: [],
    saleStream: []
  },
  getters: {
    vsBalance (state, getter, rootState) {
      let vol
      if (typeof rootState.sub.coinBanlance.some === 'function') {
        rootState.sub.coinBanlance.some(coin => {
          if (coin.CoinName === 'VS') {
            vol = coin.Balance
            return true
          }
        })
      }
      return vol || 0
    }
  },
  mutations: {
    raiseRemain (state, num) {
      state.raiseRemain = num
    },
    SystemSell (state, vol) {
      state.componySold += vol
    },
    SystemSellInit (state, cs) {
      state.componySold = cs
    },
    boughtIn (state, order) {
      state.keepingOrders.unshift(order)
    },
    newSellOrder (state, order) {
      state.keepingOrders.some(keepingOrder => {
        if (keepingOrder.o === order.OrderId) {
          keepingOrder.sa += order.Amount
          keepingOrder.av -= order.Amount
          return true
        }
      })
      state.agencyTableData.unshift(order)
    },
    infiniteGet (state, {invokeType, data}) {
      switch (invokeType) {
        case 'GetShareOrder':
          state.keepingOrders.push(...data)
          break
        case 'GetEntrustedVTS':
          state.agencyTableData.push(...data)
          break
        case 'GetClosingVTS':
          state.tranTableData.push(...data)
      }
    },
    getCurrentPrice (state, res) {
      state.currentPrice = res.p.buy
      state.currentMarketData = res
    },
    MergeShareOrder (state) {
      state.keepingOrders = []
    },
    clearAgencyList (state) {
      state.agencyTableData = []
    },
    clearClosingVTSList (state) {
      state.tranTableData = []
    },
    updateGoldenPoint (state) {
      state.keepingOrders.forEach(order => {
        let tempG = order.g
        while (order.ct !== null && tempG < state.currentPrice) {
          tempG *= 1.382
        }
        order.g = Math.ceil(tempG * 1000) / 1000
      })
    },
    OrderCallBack (state, data) {
      data.forEach(({a, d, o}) => {
        if (d === 'BUY') {
          state.keepingOrders.some(order => {
            if (order.o === o) {
              order.av += a
              setTimeout(async () => {
                let {data} = await proxy.invoke('TakeOneShare', o)
                if (data.ct !== null) {
                  order.ct = data.ct
                  order.g = data.g
                }
              }, 1000)
              return true
            }
          })
        } else if (d === 'SELL') {
          let arrData = state.agencyTableData
          arrData.some(order => {
            if (order.SellOutOrderId === o) {
              order.RemainAmount -= a
              if (order.RemainAmount === 0) {
                arrData.splice(arrData.indexOf(order), 1)
              }
              return true
            }
          })
        }
      })
    },
    getBaseMarketData (state, baseData) {
      state.marketData = baseData
      state.marketDataReady = true
      state.currentPrice = baseData[baseData.length - 1][1]
    },
    TakeMarket (state, {b, s}) {
      state.buyStream = b
      state.saleStream = s
    },
    NewBuy (state, item) {
      let buyStream = state.buyStream
      buyStream.unshift(item)
      if (buyStream.length > 15) {
        buyStream.pop()
      }
    },
    NewSell (state, item) {
      let saleStream = state.saleStream
      saleStream.push(item)
      if (saleStream.length > 15) {
        saleStream.shift()
      }
    },
    withDrowOrderSuccess (state, order) {
      state.keepingOrders.some((oldOrder, idx) => {
        if (oldOrder.o === order.o) {
          state.keepingOrders.splice(idx, 1, order)
          return true
        }
      })
      state.agencyTableData.some((oldOrder, idx) => {
        if (oldOrder.OrderId === order.o) {
          state.agencyTableData.splice(idx, 1)
          return true
        }
      })
    }
  },
  actions: {
    async buyIn ({commit, state}, {pwd, buyNum}) {
      let res = await proxy.invoke('BuyIn', pwd, buyNum)
      if (res.code === 'StatusOk') {
        commit('boughtIn', res.data)
      }
      return res
    },
    async saleOut ({commit, state}, {pwd, id, saleNum}) {
      let res = await proxy.invoke('SellOut', pwd, id, saleNum)
      if (res.code === 'StatusOk') {
        commit('newSellOrder', res.data)
      }
      return res
    },
    async infiniteGet ({commit, rootState}, {invokeType, pageIndex, Num = 10}) {
      if (rootState.isLogged === false) {
        return {code: 'requireLogged'}
      }
      let res = await proxy.invoke(invokeType, pageIndex, Num)
      let data = res.data.data
      if (res.code === 'StatusOk' && data.length) {
        commit('infiniteGet', {invokeType, data})
      }
      return res
    },
    async MergeShareOrder ({commit}, list) {
      let res = await proxy.invoke('MergeShareOrder', list)
      if (res.code === 'StatusOk') {
        commit('MergeShareOrder')
      }
      return res
    },
    async getMarketData ({commit}) {
      let baseData = await window.webStore.getItem('baseMarketData') || []
      let lastDataStamp = baseData.length === 0
        ? 0
        : baseData[baseData.length - 1][0] / 1000 || 0
      let res = await proxy.invoke('StockChart', lastDataStamp)
      if (res && res.length > 0) {
        let newMarketData = res.map(({buy, stamp}) => [stamp * 1000, buy])
        baseData.push(...newMarketData)
        window.webStore.setItem('baseMarketData', baseData)
      }
      commit('getBaseMarketData', baseData)
    },
    async currentMarketInit ({commit}) {
      let res = await proxy.invoke('TakeVTSMarket')
      commit('SystemSellInit', res.data.s.cs)
    },
    async TakeMarket ({commit}) {
      let res = await proxy.invoke('TakeMarket')
      commit('TakeMarket', res.data)
    },
    async withdrowOrder ({commit}, {pwd, order}) {
      let res = await proxy.invoke('CancelSellOrder', pwd, order.SellOutOrderId)
      return res
    },
    async withDrowOrderSuccess ({commit}, orderId) {
      let res = await proxy.invoke('TakeOneShare', orderId)
      if (res.code === 'StatusOk') {
        commit('withDrowOrderSuccess', res.data)
      }
    }
  }
}

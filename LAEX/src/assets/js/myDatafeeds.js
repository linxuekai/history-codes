import wsBus from './wsBus'
import {parseBarTime, getResolutionTime} from "./tools"
import store from '@/store'

let lastBar = null
const supportedResolutions = ['1', '5', '15', '30', '60', '240', '360', '720', 'D', 'W']

export default class {
  async onReady (callback) {
    let config = await Promise.resolve({
      supports_search: false,
      supports_group_request: false,
      supported_resolutions: supportedResolutions,
      supports_marks: false,
    })
    callback(config)
  }

  searchSymbols (userInput, exchange, symbolType, onResultReadyCallback) {
    console.log('searchSymbols =====>\n', ...arguments)
  }

  async resolveSymbol (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
    console.log('resolveSymbol =====>\n', ...arguments)
    let {pairsConf, allSymbolsReady} = store.state.pairs
    await allSymbolsReady
    onSymbolResolvedCallback({
      name: symbolName,
      ticker: symbolName,
      type: 'bitcoin',
      "timezone": 'Asia/Hong_Kong',
      "minmov": 1, // 最小波动
      "pricescale": 10 ** pairsConf[symbolName].price_point, // 价格刻度
      // "minmov2": 0.0001,
      // "pointvalue": 0.00000001,
      "session": "24x7",
      "has_intraday": true,
      // "has_no_volume":false,
      // "description":"Apple Inc.",
      "supported_resolutions": supportedResolutions,
      // "intraday_multipliers": ['5', '15', '30', '60'],
      'has_empty_bars': true
    })
  }

  async getBars (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
    console.log('getBars', ...arguments)
    if (firstDataRequest) lastBar = null
    let {
      Symbol: symbol,
      First: first,
      Nearest,
      Data: data
    } = await wsBus.reqKlinHistory(symbolInfo.name, resolution, from, to)
    let firstTime = parseBarTime(first)
    let bars = []
    let meta = {
      noData: false,
    }
    // console.log('=========================', res)
    if (symbolInfo.name !== symbol || !first || firstTime / 1000 > to) {
      onHistoryCallback([], {noData: true})
    } else {
      if (!Object.keys(data).length) {
        meta.noData = true;
        if (firstTime / 1000 < from) {
          meta.nextTime = parseBarTime(Nearest) / 1000; // 如果没有数据，应该有nextTime
        } else {
          onHistoryCallback([], {noData: true})
        }
      } else {
        bars = Object.keys(data).map(barTime => {
          let [open, high, low, close, volume] = data[barTime].split('|').map(str => +str)
          return {
            time: parseBarTime(barTime),
            open,
            high,
            low,
            close,
            volume
          }
        })
      }
    }
    if (lastBar === null) {
      bars.sort((a, b) => a.time - b.time)
      let last = bars.length ? bars[bars.length - 1] : {}
      lastBar = {
        open: last.open || 0,
        close: last.close || 0,
        high: last.high || 0,
        low: last.low || 0,
        volume: last.volume || 0,
        time: getResolutionTime(last.time || Date.now(), resolution)
      }
    }
    onHistoryCallback(bars, meta)
  }

  subscribeBars (symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
    // console.log('subscribeBars =====>\n', subscriberUID)
    wsBus.$off('newBar')
    wsBus.$on('newBar', newBar => {
      if (!lastBar) return
      let {time, close, vol} = newBar
      let resolutionTime = getResolutionTime(time, resolution)
      // console.log(new Date(lastBar.time).toTimeString(), new Date(resolutionTime).toTimeString())
      if (resolutionTime < lastBar.time) return
      else if (resolutionTime === lastBar.time) {
        lastBar.high = Math.max(close, lastBar.high)
        lastBar.low = Math.min(close, lastBar.low || close)
        lastBar.close = close
        lastBar.volume += vol
        if (lastBar.open === 0) lastBar.open = close
      } else if (resolutionTime > lastBar.time) {
        lastBar = {
          open: close,
          high: close,
          low: close,
          close: close,
          time: resolutionTime,
          volume: 0
        }
      }
      let obj = {
        open: lastBar.open,
        high: lastBar.high,
        low: lastBar.low,
        close: lastBar.close,
        volume: lastBar.volume,
        time: resolutionTime
      }
      onRealtimeCallback(obj)
    })
  }

  unsubscribeBars (subscriberUID) {
    console.log('unsubscribeBars =====>\n', ...arguments)
  }

  calculateHistoryDepth (resolution, resolutionBack, intervalBack) {
    console.log('calculateHistoryDepth =====>\n', ...arguments)
    if (+resolution > 0) {
      return {
        resolutionBack: 'D',
        intervalBack: 0.4 * resolution
      }
    } else {
      switch (resolution) {
        case 'D':
          return {
            resolutionBack: 'D',
            intervalBack: 200
          }
        case 'W':
          return {
            resolutionBack: 'M',
            intervalBack: 10
          }
      }
    }
  }

  getMarks (symbolInfo, startDate, endDate, onDataCallback, resolution) {
    console.log('getMarks =====>\n', ...arguments)
  }

  getTimescaleMarks (symbolInfo, startDate, endDate, onDataCallback, resolution) {
    console.log('getTimescaleMarks =====>\n', ...arguments)
  }

  getServerTime (callback) {
    console.log('getServerTime =====>\n', ...arguments)
  }
}

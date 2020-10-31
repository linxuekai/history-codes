function cbSnapshotFactory(data, obj) {
  return function (symbol) {
    let [targetCoin, baseCoin] = symbol.split('/')
    let [open, high, low, close, vol] = data[symbol].split('|').map(str => +str)
    obj[baseCoin] = this.allPairSymbols[baseCoin] || {}
    obj[baseCoin][targetCoin] = {
      close,
      high,
      low,
      open,
      vol,
    }
  }
}

const cbSnapshot = symbol => {

}

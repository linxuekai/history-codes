/**
 * Created by linxuekai on 2017/8/18.
 */
function add0before1Num (num) {
  if (String(num).length < 2) {
    return ('0' + num).slice(-2)
  } else {
    return num + ''
  }
}

function sellableFn (CurrentPrice, BuyInPrice, keepingAmount) {
  let AvalAmount = 0
  let EachValue = 0
  BuyInPrice *= 1.382
  while (BuyInPrice <= CurrentPrice && keepingAmount > 0.00001) {
    EachValue = keepingAmount * 0.382
    AvalAmount += EachValue
    keepingAmount -= EachValue
    BuyInPrice *= 1.382
  }
  return AvalAmount
}

export {
  add0before1Num,
  sellableFn
}

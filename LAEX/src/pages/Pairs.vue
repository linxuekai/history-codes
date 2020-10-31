<template>
  <div id="page-pairs">
    <div class="pd-10 clear-fix">
      <div class="fl w22 pr-10 border-box">
        <pairs-info-comp></pairs-info-comp>
        <news-comp></news-comp>
      </div>
      <div class="fl w78">
        <kline-comp :base-coin="baseCoin"
                    :target-coin="targetCoin" />
        <div class="clear-fix">
          <div class="w65 fl pr-10 border-box">
            <operation-comp :base-coin="baseCoin"
                            :target-coin="targetCoin" />
          </div>
          <div class="w35 fr">
            <market-depth-comp
              :base-coin="baseCoin"
              :target-coin="targetCoin" />
          </div>
        </div>
        <div>
          <pairs-orders-comp />
        </div>
        <div class="clear-fix">
          <div class="fl w60 pr-10 border-box">
            <depth-char-comp
              :base-coin="baseCoin"
              :target-coin="targetCoin" />
          </div>
          <div class="fr w40">
            <trades-list-comp
              :base-coin="baseCoin"
              :target-coin="targetCoin" />
          </div>
        </div>
        <coin-info-comp
          :target-coin="targetCoin" />
      </div>
    </div>
  </div>
</template>

<script>
import CoinInfoComp from '@c/Pairs/CoinInfoComp'
import DepthCharComp from '@c/Pairs/DepthCharComp'
import KlineComp from '@c/Pairs/KlineComp'
import MarketDepthComp from '@c/Pairs/MarketDepthComp'
import NewsComp from '@c/Pairs/NewsComp'
import OperationComp from '@c/Pairs/OperationComp'
import PairsInfoComp from '@c/Pairs/PairsInfoComp'
import TradesListComp from '@c/Pairs/TradesListComp'
import PairsOrdersComp from '@c/Pairs/PairsOrdersComp'

export default {
  name: "Pairs",
  components: {
    CoinInfoComp,
    DepthCharComp,
    KlineComp,
    MarketDepthComp,
    NewsComp,
    OperationComp,
    PairsInfoComp,
    TradesListComp,
    PairsOrdersComp
  },
  data () {
    return {
      baseCoin: 'USDT',
      targetCoin: 'BTC'
    }
  },
  created () {
    if (this.$store.getters['user/authorized']) {
      this.$store.dispatch('pairs/getBalance')
    }
  }
  // beforeRouteEnter (to, from, next) {
  //   next(_this => {
  //     _this.$alert('币币交易功能暂未开放，敬请期待！')
  //       .finally(() => {
  //         _this.$router.replace({
  //           name: 'Home'
  //         })
  //       })
  //   })
  // }
}
</script>

<style>
  #page-pairs .block-height{
    height: 400px;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .w22{
    width: 22%;
  }
  .w78{
    width: 78%;
  }
</style>

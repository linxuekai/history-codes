<template>
  <div class="cont-box relative">
    <div class="cont-title pb-0">
      <span class="link"
            @click="priceType='limit'"
            :class="{'is-active': priceType==='limit'}">限价交易</span>
      <span class="link"
            @click="priceType='market'"
            :class="{'is-active': priceType==='market'}">市价交易</span>
      <router-link class="fr color-weak" :to="{name: 'RateDescription'}">费率说明</router-link>
    </div>
    <div class="clear-fix ph-15 pt-15 block-height">
      <div class="fl w50 pr-15 border-box">
        <div class="bb lh-2">
          <span class="color-weak">可用</span>
          <span class="fr">
            <obvious-price-comp :value="baseCoinBalance.free" />
          <span class="ml-5">{{baseCoin}}</span>
          </span>
        </div>
        <limit-price-form-comp v-if="priceType==='limit'"
                          buy-or-sell="buy" />
        <market-price-form-comp v-if="priceType==='market'"
                          buy-or-sell="buy" />
      </div>
      <div class="fr w50 pl-15 border-box">
        <div class="bb lh-2">
          <span class="color-weak">可用</span>
          <span class="fr">
            <obvious-price-comp :value="targetCoinBalance.free" />
            <span class="ml-5">{{targetCoin}}</span>
          </span>
        </div>
        <limit-price-form-comp v-if="priceType==='limit'"
                          buy-or-sell="sell" />
        <market-price-form-comp v-if="priceType==='market'"
                          buy-or-sell="sell" />
      </div>
    </div>
    <require-login-comp />
  </div>
</template>

<script>
import LimitPriceFormComp from '@c/Pairs/LimitPriceFormComp'
import MarketPriceFormComp from '@c/Pairs/MarketPriceFormComp'
import {createNamespacedHelpers} from 'vuex'
const {mapState} = createNamespacedHelpers('pairs')
export default {
  name: "operation-comp",
  components: {
    LimitPriceFormComp,
    MarketPriceFormComp
  },
  data () {
    return {
      priceType: 'limit'
    }
  },
  computed: {
    ...mapState([
      'baseCoin',
      'targetCoin',
      'balance'
    ]),
    baseCoinBalance () {
      return this.balance[this.baseCoin] || {}
    },
    targetCoinBalance () {
      return this.balance[this.targetCoin] || {}
    }
  }
}
</script>

<style scoped>
.link{
  padding-bottom: 14px;
}
</style>
<style>
  /*
   * limit-order-form-comp market-order-form-comp
   */
  .pairs-order-form .el-input--suffix .el-input__inner{
    padding-right: 60px;
    background-color: #1e2235;
  }
  .bb{
    margin-bottom: 5px;
    padding-bottom: 5px;
    border-bottom: 1px solid #1f2943;
  }
</style>

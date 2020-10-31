<template>
  <div
    class="cont-box"
    @mouseenter="clearScroll"
    @mouseleave="scrollToTop">
    <div class="cont-title">实时成交<span class="pl-15 fr">{{targetCoin}} / {{baseCoin}}</span></div>
    <div
      ref="tableWrap"
      class="block-height tbody-wrap">
      <table>
        <thead>
        <tr class="color-weak">
          <th class="w15">时间</th>
          <th class="w15">方向</th>
          <th class="w20">价格({{baseCoin}})</th>
          <th class="w20">数量({{targetCoin}})</th>
        </tr>
        </thead>
        <transition-group name="list" tag="tbody">
          <tr v-for="(order, idx) in tradeHistory" :key="hisTickReduceLen - idx">
            <td>{{order.time | utcTimeStamp('time')}}</td>
            <td>
            <span :class="order.type | tradeColor">
              {{order.type | tradeType}}
            </span>
            </td>
            <td>
              <obvious-price-comp
                :value="order.price"
                :sliceTo="pricePoint"/>
            </td>
            <td>
              <obvious-price-comp
                :value="order.amount"
                :sliceTo="sizePoint"/>
            </td>
          </tr>
        </transition-group>
      </table>
    </div>
  </div>
</template>

<script>
import wsBus from '@a/js/wsBus'
import {createNamespacedHelpers} from 'vuex'
const {mapState, mapGetters} = createNamespacedHelpers('pairs')
export default {
  name: "trades-list-comp",
  data () {
    return {
      interval: null
    }
  },
  computed: {
    ...mapState([
      'baseCoin',
      'targetCoin',
      'tradeHistory',
      'hisTickReduceLen'
    ]),
    ...mapGetters([
      'klineSymbol',
      'pricePoint',
      'sizePoint'
    ])
  },
  watch: {
    klineSymbol () {
      wsBus.reqHisTick()
    }
  },
  methods: {
    scrollToTop () {
      let elm = this.$refs.tableWrap
      this.interval = setInterval(() => {
        let scrollTop = elm.scrollTop
        let scrollUp = scrollTop > 200
          ? scrollTop - 200
          : (clearInterval(this.interval), 0)
        elm.scrollTo(0, scrollUp)
      }, 30)
    },
    clearScroll () {
      clearInterval(this.interval)
    }
  },
  created () {
    wsBus.reqHisTick()
  }
}
</script>

<style scoped>
  .tbody-wrap{
    line-height: 22px;
    text-align: center;
    font-size: 12px;
    padding: 5px 0;
  }
  th{
    font-weight: normal;
  }
  .list-enter-active{
    transition: 3s;
  }
  .list-enter {
    background-color: #262a42;
  }
</style>

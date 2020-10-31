<template>
  <div class="cont-box">
    <div class="cont-title">
      最新价
      <obvious-price-comp
        :value="latest"
        :sliceTo="pricePoint"/>
      {{baseCoin}}
    </div>
    <div class="pd-5 pt-10 pr-10 block-height">
      <table class="market-depth-table"
             cellpadding="0"
             cellspacing="0">
        <colgroup>
          <col class="w10">
          <col class="w30">
          <col class="w25">
          <col class="w35">
        </colgroup>
        <thead class="color-weak">
        <tr>
          <td></td>
          <td>价格({{baseCoin}})</td>
          <td>数量({{targetCoin}})</td>
          <td>总额({{baseCoin}})</td>
        </tr>
        </thead>
        <tbody>
        <tr
          @click="updatePriceProvider(order.p)"
          v-for="(order, idx) in asksShow"
          :key="order.p">
          <td class="color-sell">卖 {{asksShow.length - idx}}</td>
          <td>
            <obvious-price-comp
              :value="order.p"
              :sliceTo="pricePoint"/>
          </td>
          <td>
            <obvious-price-comp
              :sliceTo="sizePoint"
              :value="order.a" />
          </td>
          <td>
            <obvious-price-comp
              :sliceTo="pricePoint"
              :value="order.p * order.a" />
            <span class="bar ask" :style="{width: `${(order.a/maxAmount)*100}%`}"></span>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="divider"></div>
      <table class="market-depth-table"
             cellpadding="0"
             cellspacing="0">
        <colgroup>
          <col class="w10">
          <col class="w30">
          <col class="w25">
          <col class="w35">
        </colgroup>
        <tbody>
        <tr
          @click="updatePriceProvider(order.p)"
          v-for="(order, idx) in bidsShow"
          :key="order.p">
          <td class="color-buy">买 {{idx+1}}</td>
          <td>
            <obvious-price-comp
              :value="order.p"
              :sliceTo="pricePoint"/>
          </td>
          <td>
            <obvious-price-comp
              :sliceTo="sizePoint"
              :value="order.a"/>
          </td>
          <td>
            <obvious-price-comp
              :sliceTo="pricePoint"
              :value="order.p * order.a" />
            <span class="bar bid" :style="{width: `${(order.a/maxAmount)*100}%`}"></span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import wsBus from '@a/js/wsBus'
import {createNamespacedHelpers} from 'vuex'
const {mapState, mapGetters, mapMutations} = createNamespacedHelpers('pairs')

export default {
  name: "market-depth-comp",
  data () {
    return {
      asksShow: [],
      bidsShow: [],
      maxAmount: 0
    }
  },
  computed: {
    ...mapState([
      'baseCoin',
      'targetCoin',
      'allPairSymbols',
      'marketDepth'
    ]),
    ...mapGetters([
      'klineSymbol',
      'latest',
      'pricePoint',
      'sizePoint'
    ])
  },
  watch: {
    klineSymbol (newSymbol, oldSymbol) {
      wsBus.subMarketDepth(oldSymbol)
      this.$store.commit('pairs/updateMarketDepth', {
        asks: [],
        bids: []
      })
      this.$store.commit('pairs/updatePriceProvider', '')
    },
    marketDepth: {
      deep: true,
      immediate: true,
      handler (depthData) {
        let {bids, asks} = depthData
        let aShow = this.asksShow = asks.slice(-7)
        let bShow = this.bidsShow = bids.slice(0, 7)
        let maxA = 0
        aShow.concat(bShow).forEach(o => {
          if (o.a > maxA) {
            maxA = o.a
          }
        })
        this.maxAmount = maxA
        while (aShow.length < 7) {
          aShow.unshift({})
        }
        while (bShow.length < 7) {
          bShow.push({})
        }
      }
    },
  },
  methods: {
    ...mapMutations([
      'updatePriceProvider'
    ])
  },
  created () {
    wsBus.subMarketDepth()
    let handler = isReconnect => isReconnect && wsBus.subMarketDepth()
    wsBus.$off('connect', handler)
    wsBus.$on('connect', handler)
  }
}
</script>

<style scoped>
  .market-depth-table{
    position: relative;
    width: 100%;
    text-align: right;
    font-size: 12px;
  }
  .market-depth-table td {
    line-height: 24px;
  }
  .divider {
    border-top-color: #172750;
    margin: 5px;
  }
  tbody tr{
    cursor: pointer;
  }
  tr:hover{
    background-color: #1e2235;
  }
  .bar{
    display: inline-block;
    position: absolute;
    right: 0;
    opacity: .12;
    height: 22px;
  }
  .bid{
    background-color: #589065;
  }
  .ask{
    background-color: #ae4e54;
  }
</style>

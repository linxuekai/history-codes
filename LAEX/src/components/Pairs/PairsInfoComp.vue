<template>
  <div>
    <div class="cont-box">
      <div class="cont-title">
        <div>
          <strong>市场</strong>
        </div>
        <div class="pair-symbols">
          <span v-for="(obj,bcName) in allPairSymbols" :key="bcName"
                class="link"
                @click="updateQuotationBaseCoin(bcName)"
                :class="{'is-active': quotationBaseCoin === bcName}">{{bcName}}</span>
        </div>
      </div>
      <div class="pt-15">
        <div class="ph-15">
          <table class="table-head" cellspacing="0" cellpadding="0">
            <colgroup>
              <col class="w30">
              <col class="w30">
              <col class="w30">
            </colgroup>
            <tr>
              <th>币种</th>
              <th>最新价</th>
              <th>涨跌幅</th>
            </tr>
          </table>
        </div>
        <div class="tbody-wrap">
          <table class="table-body " cellspacing="0" cellpadding="0">
            <colgroup>
              <col class="w30">
              <col class="w30">
              <col class="w30">
            </colgroup>
            <tr :class="{'bg-current': tcName === targetCoin && quotationBaseCoin === baseCoin}"
                v-for="(mkt, tcName) in allPairSymbols[quotationBaseCoin]"
                @click="updateKlineSymbol({baseCoin: quotationBaseCoin, targetCoin: tcName})"
                :key="tcName + quotationBaseCoin">
              <td>
                {{tcName}}
              </td>
              <td>
                <obvious-price-comp
                  :value="mkt.close"
                  :sliceTo="`${tcName}/${quotationBaseCoin}` | pricePoint"/>
              </td>
              <td :class="mkt | changeClass">
                {{(mkt.close / mkt.open - 1) * 100 | signed}}%
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
let {mapState, mapMutations, mapGetters} = createNamespacedHelpers('pairs')
export default {
  name: "pairs-info-comp",
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'klineSymbol'
    ]),
    ...mapState([
      'allPairSymbols',
      'quotationBaseCoin',
      'baseCoin',
      'targetCoin'
    ])
  },
  watch: {},
  methods: {
    ...mapMutations([
      'updateKlineSymbol',
      'updateQuotationBaseCoin'
    ])
  },
}
</script>

<style scoped>
  .pair-symbols{
    margin: 20px 0 -15px;
  }
  .table-head, .table-body{
    width: 100%;
    text-align: center;
    font-size: 12px;
  }
  .table-head th {
    padding-bottom: 5px;
    border-bottom: 1px solid #323546;
    font-weight: normal;
  }
  .tbody-wrap {
    padding: 0 15px 10px;
    max-height: 560px;
    overflow-y: auto;
  }
  .table-body tr {
    cursor: pointer;
    line-height: 28px;
    transition: .2s;
  }
  .table-body tr:hover, .bg-current{
    background-color: #1E2235;
  }
  .table-body td {
    border-bottom: 1px solid #1f2943;
  }
  .table-body tr:last-child td {
    border-bottom-color: transparent;
  }
</style>

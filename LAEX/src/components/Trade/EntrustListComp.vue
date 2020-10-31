<template>
  <div class="entrust-list-comp">
    <div class="entrust-table">
      <div class="head-table pv-5 pr-15">
        <table>
          <colgroup>
            <col class="w5">
            <col class="w5">
            <col class="w10">
            <col class="w10">
            <col class="w15">
            <col class="w10">
            <col class="w10">
            <col class="w5">
          </colgroup>
          <tr>
            <th class="text-center">排位</th>
            <th>价格(CNY)</th>
            <th>数量({{currentCoin}})</th>
            <th>所有金额(CNY)</th>
            <th>委托人</th>
            <th>单笔最低限额</th>
            <th class="pay-method-cell">支付方式</th>
            <th class="text-left">下单</th>
          </tr>
        </table>
      </div>
      <div class="body-table">
        <div id="asks-wrap" ref="asksWrap">
          <table ref="asksTable">
            <colgroup>
              <col class="w5">
              <col class="w5">
              <col class="w10">
              <col class="w10">
              <col class="w15">
              <col class="w10">
              <col class="w10">
              <col class="w5">
            </colgroup>
            <tr v-for="(o, idx) in asks" :key="o.id">
              <td class="color-sell text-center">{{asks.length - idx}}</td>
              <td>
                <span v-if="o.price">
                  {{o.price | sliceTo(2)}}
                </span>
              </td>
              <td>
                <span v-if="o.price">{{o.amount - o.lock_amount | sliceTo(4)}}</span>
              </td>
              <td>
                <span v-if="o.price">{{(o.amount - o.lock_amount) * o.price | sliceTo(2)}}</span>
              </td>
              <td>
                <span v-if="o.price">{{o.nickname}}</span>
              </td>
              <td>
                <span v-if="o.price">{{o.order_min || '--'}}</span>
              </td>
              <td class="pay-method-cell">
                <img
                  v-if="type"
                  v-for="type in (o.payMethods || '').split(',')"
                  :key="type"
                  :src="`/static/img/icon/${type}.png`">
              </td>
              <td class="text-left">
                <span v-if="o.price"><a
                  @click="updateCurrentOrder(o)"
                  class="btn-buy color-buy">买入</a></span>
              </td>
            </tr>
          </table>
        </div>

        <div id="bids-wrap">
          <table>
            <colgroup>
              <col class="w5">
              <col class="w5">
              <col class="w10">
              <col class="w10">
              <col class="w15">
              <col class="w10">
              <col class="w10">
              <col class="w5">
            </colgroup>
            <tr v-for="(o, idx) in bids" :key="o.id">
              <td class="color-buy text-center">{{idx + 1}}</td>
              <td>
                <span v-if="o.price">
                  {{o.price | sliceTo(2)}}
                </span>
              </td>
              <td>
                <span v-if="o.price">{{o.amount - o.lock_amount| sliceTo(4)}}</span>
              </td>
              <td>
                <span v-if="o.price">{{(o.amount - o.lock_amount) * o.price | sliceTo(2)}}</span>
              </td>
              <td>
                <span v-if="o.price">{{o.nickname}}</span>
              </td>
              <td>
                <span v-if="o.price">{{o.order_min || '--'}}</span>
              </td>
              <td class="pay-method-cell">
                <img
                  v-if="type"
                  v-for="type in (o.payMethods || '').split(',')"
                  :key="type"
                  :src="`/static/img/icon/${type}.png`">
              </td>
              <td class="text-left">
                <span v-if="o.price"><a
                  @click="updateCurrentOrder(o)"
                  class="btn-sell color-sell">卖出</a></span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <take-entrust-comp
      v-if="currentOrder"
      @close="currentOrder=null"
      :order="currentOrder" />
  </div>
</template>

<script>
import takeEntrustComp from './TakeEntrustComp'
export default {
  name: "entrust-list-comp",
  components: {
    takeEntrustComp
  },
  data () {
    return {
      asks: [],
      bids: [],
      interval: {
        getEntrustList: 0
      },
      currentOrder: null,
      needToBottom: true
    }
  },
  computed: {
    currentCoin () {
      return this.$route.params.coin
    }
  },
  watch: {
    currentCoin: {
      immediate: true,
      handler () {
        this.asks = []
        this.bids = []
        this.needToBottom = true
        this.getEntrustList()
      }
    }
  },
  methods: {
    async getEntrustList () {
      let res = await this.$post('/v1/c2c/placard/list', {
        coin: this.currentCoin
      })
      if (res._statusOk) {
        let {buy, sell} = res.data
        while (buy.length < 7) {
          buy.push({})
        }
        while (sell.length < 7) {
          sell.unshift({})
        }
        this.asks = sell.sort((a, b) => b.price - a.price)
        this.bids = buy.sort((a, b) => b.price - a.price)
        this.needToBottom && this.$nextTick(() => {
          let {asksWrap, asksTable} = this.$refs
          asksWrap.scrollTop = asksTable.offsetHeight
          this.needToBottom = false
        })
      }
    },
    updateCurrentOrder (o) {
      this.$store.getters['user/authorized']
        ? this.currentOrder = o
        : this.$router.push({name: "Login"})
    }
  },
  async created () {
    this.interval.getEntrustList = setInterval(this.getEntrustList, 10 * 1000)
  },
  beforeDestroy () {
    Object.values(this.interval).forEach(id => clearInterval(id))
  }
}
</script>

<style scoped>
.entrust-list-comp{
  font-size: 13px;
}
  .entrust-table{
    text-align: right;
  }
  .body-table{
    border: 1px solid #e9e9e9;
    border-radius: 3px;
    box-shadow: 1px 3px 10px #ddd;
  }
  #asks-wrap,#bids-wrap {
    height: 224px;
    overflow-y: scroll;
  }
  #asks-wrap{
    border-bottom: 1px solid #E0E0E0;
  }
  .head-table th {
    color: #aaaaaa;
    font-weight: normal;
  }
  .body-table tr{
    line-height: 30px;
  }
  .body-table tr:nth-child(odd) {
    background-color: #f5f5f5;
  }
  .color-buy{
    color: #4db872;
  }
  .color-sell{
    color:#ee6560;
  }
  .btn-buy,.btn-sell{
    border: 1px solid;
    border-radius: 3px;
    padding: 2px 15px;
    font-size: 12px;
  }
  .pay-method-cell{
    text-align: left;
    padding-left: 25px;
  }
  .pay-method-cell img{
    margin: 0 2px;
  }
</style>

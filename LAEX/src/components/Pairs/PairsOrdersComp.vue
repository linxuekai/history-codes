<template>
  <div class="cont-box" v-loading="loading.comp" v-if="authorized">
    <div class="cont-title pb-0">
      <span
        :class="{'is-active': isNow}"
        @click="isShow=true;listType='now'"
        class="link">当前委托</span>
      <span
        :class="{'is-active': isHistory}"
        @click="isShow=true;listType='history'"
        class="link">历史委托</span>
      <span
        @click="isShow=!isShow"
        class="font-16 link fr mr-0">
        <i :class="isShow ? 'el-icon-remove-outline' : 'el-icon-circle-plus-outline'"></i>
      </span>
    </div>
    <div class="ph-15 pt-15" v-show="isShow">
      <table class="text-center">
        <thead>
        <tr>
          <th class="w10">时间</th>
          <th class="w5">交易对</th>
          <th class="w5">方向</th>
          <th class="w10">价格</th>
          <th class="w10">委托量</th>
          <th class="w10" v-show="isNow">委托总额</th>
          <th class="w10">已成交</th>
          <th class="w10" v-show="isNow">未成交</th>
          <th class="w10" v-show="isHistory">成交均价</th>
          <th class="w10" v-show="isHistory">
            手续费
            <!--<el-popover-->
              <!--placement="top-start"-->
              <!--title="标题"-->
              <!--width="200"-->
              <!--:visible-arrow="false"-->
              <!--trigger="hover">-->
              <!--<i class="el-icon-question" slot="reference"></i>-->
            <!--</el-popover>-->
            </th>
          <th class="w5" v-show="isNow">操作</th>
          <th class="w5" v-show="isHistory">状态</th>
        </tr>
        </thead>
        <tbody>
        <tr
          :key="order.consign_id"
          v-for="order in orders">
          <td>{{order.consign_dt | utcTimeStamp}}</td>
          <td>{{order.symbol}}</td>
          <td :class="order.direction | tradeColor">{{order.direction | tradeType}}</td>
          <td>
            <span v-if="order.price">
              <!--<obvious-price-comp :value="order.price" />-->
              {{order.price | number}}
              <span class="color-weak">{{order | unitCoin('baseCoin')}}</span>
            </span>
            <span v-else>市价</span>
          </td>
          <td>
            <!--<obvious-price-comp :value="order.qty" />-->
            {{order.qty | number}}
            <span class="color-weak">{{order | unitCoin('entrustCoin')}}</span>
          </td>
          <td v-show="isNow">
            <!--<obvious-price-comp :value="order.total_amount" />-->
            {{order.total_amount | number}}
            <span class="color-weak">{{order | unitCoin('baseCoin')}}</span>
          </td>
          <td>
            <!--<obvious-price-comp :value="order.bargain" />-->
            {{order.bargain | number}}
            <span class="color-weak">{{order | unitCoin('targetCoin')}}</span>
          </td>
          <td v-show="isNow">
            <!--<obvious-price-comp :value="order.unbargain" />-->
            {{order.unbargain | number}}
            <span class="color-weak">{{order | unitCoin('entrustCoin')}}</span>
          </td>
          <td v-show="isHistory">
            <!--<obvious-price-comp :value="order.bargain_mean_price" />-->
            <span v-if="order.bargain_mean_price">
              {{order.bargain_mean_price | number}}
              <span class="color-weak">
                {{order | unitCoin('baseCoin')}}
              </span>
            </span>
            <span v-else>--</span>
          </td>
          <td v-show="isHistory">
            <!--<obvious-price-comp :value="order.fee" />-->
            <span v-if="order.fee">
              {{order.fee | number}}
              <span class="color-weak">{{order | unitCoin('feeCoin')}}</span>
            </span>
            <span v-else>--</span>
          </td>
          <td v-show="isNow">
            <el-button
              :loading="order.loading"
              type="text pv-0"
              @click="cancel(order)">撤单</el-button>
          </td>
          <td v-show="listType==='history'">{{order.status | orderStatus}}</td>
        </tr>
        </tbody>
      </table>
      <div
        class="text-center pt-20 color-weak"
        v-if="!orders.length">暂无订单</div>
      <el-pagination
        layout='->, prev, pager, next, jumper'
        @current-change="getOrders"
        :current-page.sync="page"
        :page-size="10"
        :total="orderTotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import wsBus from '../../assets/js/wsBus'
export default {
  name: "PairsOrdersComp",
  data () {
    return {
      listType: 'now', // now | history
      orders: [],
      loading: {
        comp: false
      },
      page: 1,
      orderTotal: 0,
      isShow: true
    }
  },
  computed: {
    authorized () {
      return this.$store.getters['user/authorized']
    },
    isNow () {
      return this.listType === 'now'
    },
    isHistory () {
      return this.listType === 'history'
    }
  },
  filters: {
    orderStatus (status) {
      return [
        '',
        '已提交',
        '下单成功',
        '正在撮合',
        '部分成交',
        '全部成交',
        '部分撤单',
        '全部撤单',
        '下单失败'
      ][status]
    },
    tradeType (typeCode) {
      return {
        '0': '买入',
        '1': '卖出',
        '8': '买入',
        '9': '卖出'
      }[typeCode + '']
    },
    tradeColor (typeCode) {
      return {
        '0': 'color-buy',
        '1': 'color-sell',
        '8': 'color-buy',
        '9': 'color-sell'
      }[typeCode + '']
    },
    unitCoin ({symbol, price, direction}, type) {
      let idx = symbol.indexOf('/')
      let target = symbol.slice(0, idx)
      let base = symbol.slice(idx + 1)
      switch (type) {
        case 'baseCoin':
          return base
        case 'targetCoin':
          return target
        case 'entrustCoin':
          return price || direction === 9
            ? target
            : base
        case 'feeCoin':
          return direction === 0 || direction === 8
            ? target
            : base
      }
    },
    number (n) {
      if (n && ~n.toString().indexOf('e')) {
        return n.toFixed(8).replace(/0+$/, '')
      }
      return n
    }
  },
  watch: {
    listType: {
      immediate: true,
      handler () {
        this.page = 1
        this.getOrders()
      }
    }
  },
  methods: {
    async getOrders () {
      if (this.authorized) {
        this.loading.comp = true
        let res = await this.$fetch(`/v1/trader/entrust/${this.listType}`, {
          page: this.page
        })
          .finally(() => {
            this.loading.comp = false
          })
        if (res._statusOk) {
          this.orders = res.data
          this.orderTotal = res.count
        }
      }
    },
    cancel (order) {
      this.$set(order, 'loading', true)
      this.$fetch('/v1/trade/coin/order', {
        consignType: 'cancel',
        consignId: order.consign_id
      })
        .finally(() => {
          order.loading = false
        })
    }
  },
  created () {
    wsBus.$off('pairsOrderDone')
    wsBus.$on('pairsOrderDone', msg => {
      let orderid = msg.Orderid
      let status = msg.Status
      if (status === '4' && (!this.isNow || !~this.orders.findIndex(o => o.consign_id === orderid))) return
      this.getOrders()
    })

    this.$root.$off('getPairsOrders')
    this.$root.$on('getPairsOrders', () => {
      this.isNow && this.getOrders()
    })
  }
}
</script>

<style scoped>
th, td{
  font-size: 12px;
  font-weight: normal;
  line-height: 25px;
  border-bottom: 1px solid #1f2943;
}
</style>

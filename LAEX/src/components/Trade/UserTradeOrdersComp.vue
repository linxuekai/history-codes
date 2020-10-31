<template>
  <div class="pm-25 comp-trade-orders" v-loading="loading.getOrders">
    <div class="ph-20 mb-10 border-bottom">
              <span
                @click="currentOrdersType = 'unpaid'"
                :class="{'is-active': currentOrdersType === 'unpaid'}"
                class="link">未完成订单</span>
      <span
        @click="currentOrdersType = 'completed'"
        :class="{'is-active': currentOrdersType === 'completed'}"
        class="link">已完成订单</span>
      <span
        @click="currentOrdersType = 'cancelled'"
        :class="{'is-active': currentOrdersType === 'cancelled'}"
        class="link">取消订单</span>
      <router-link class="fr" :to="{name: 'UserInfo'}">收付款设置</router-link>
    </div>
    <div
      ref="orderWrap"
      class="order-wrap minh-250">
      <div v-if="currentOrdersType === 'unpaid'">
        <uncompleted-order-comp
          v-for="uncompletedOrder in unpaidOrders"
          :order="uncompletedOrder"
          :key="uncompletedOrder.orderId"/>
        <div
          class="text-center color-888 pt-20"
          v-if="!unpaidOrders.length">
          <div>暂无未完成订单</div>
        </div>
        <div class="mt-30 text-center font-16 color-888">温馨提示：达到3笔超时未付款，将被冻结当天下单权限。</div>
      </div>
      <div v-else>
        <table class="text-center">
          <thead>
          <tr>
            <td class="w15">时间</td>
            <td class="w10">币种</td>
            <td class="w10">类别</td>
            <td class="w10">数量</td>
            <td class="w10">单价</td>
            <td class="w10">总价</td>
            <td class="w10">状态</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="order in ordersData" :key="order.OrderNo">
            <td>{{order.time | utcString}}</td>
            <td>{{order.coin}}</td>
            <td>
              <span :class="order.orderType | orderTypeClass">
                {{order.orderType | orderType}}
              </span>
            </td>
            <td>{{order.amount | sliceTo(2)}}</td>
            <td>￥{{order.price | sliceTo(2)}}</td>
            <td>￥{{order.total | sliceTo(2)}}</td>
            <td>{{order.orderStatus | orderStatus}}</td>
          </tr>
          </tbody>
        </table>
        <div
          class="text-center color-888 pt-20"
          v-if="!ordersData.length">暂无订单</div>
        <el-pagination
          layout='->, prev, pager, next, jumper'
          @current-change="getOrders"
          :current-page.sync="page"
          :page-size="10"
          :total="orderTotal">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import UncompletedOrderComp from './UncompletedOrderComp'
export default {
  name: "user-trade-orders-comp",
  components: {
    UncompletedOrderComp
  },
  data () {
    return {
      unpaidOrders: [],
      ordersData: [],
      loading: {
        getOrders: false
      },
      currentOrdersType: 'unpaid',
      page: 1,
      orderTotal: 0,
      interval: null
    }
  },
  filters: {
    orderStatus (status) {
      return {
        cancelled: '已取消',
        completed: '已完成'
      }[status]
    }
  },
  watch: {
    currentOrdersType: {
      handler () {
        this.page = 1
        this.orderTotal = 0
        this.getOrders()
      },
      immediate: true
    },
  },
  methods: {
    async getOrders (noLoading) {
      if (!noLoading) this.loading.getOrders = true
      let res = await this.$fetch('/v1/c2c/order/list', {
        page: this.page,
        orderStatus: this.currentOrdersType
      })
        .catch(() => {
          this.unpaidOrders = []
          this.ordersData = []
        })
        .finally(() => {
          this.loading.getOrders = false
        })
      if (res._statusOk) {
        this.currentOrdersType === 'unpaid'
          ? this.unpaidOrders = res.data
          : this.ordersData = res.data
        this.orderTotal = res.length || 0
      }
    }
  },
  created () {
    this.$root.$off('takeEntrust')
    this.$root.$on('takeEntrust', () => this.currentOrdersType === 'unpaid' && this.getOrders())
    this.interval = setInterval(() => {
      this.getOrders('noLoading')
      this.$getLegalBalance()
    }, 10000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>

<style scoped>
.box-head{
  border-bottom: 1px solid lightgray;
  margin-bottom: 10px;
}
  th {
    font-weight: normal;
    color: #666666;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  thead>tr{
    background-color: #f5f5f5;
    color: #262a42;
    line-height: 2;
  }
  tbody{
    line-height: 40px;
  }
  tbody td {
    border-bottom: 1px solid #e0e0e0;
  }
</style>

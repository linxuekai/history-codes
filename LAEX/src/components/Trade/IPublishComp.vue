<template>
  <div class="pb-20" v-show="orders.length">
    <div class="ph-20 pb-5 mb-10 border-bottom">
      <span class="ph-15">我的交易单</span>
    </div>
    <div>
      <div
        class="clear-fix publish-order"
        :class="o.type"
        v-for="o in orders"
        :key="o.id">
        <div
          :class="o.type | orderTypeClass"
          class="fl w10">
          委托{{o.type | orderType}} <br>
          {{o.coin}}
        </div>
        <div class="fl w10">
          委托价格 <br>
          {{o.price | sliceTo(2)}}
        </div>
        <div class="fl w20">
          委托 / 已成交 <br>
          {{o.amount}} / {{o.now_amount}}
        </div>
        <div class="fl w20">
          总金额 / 成交金额 <br>
          {{o.amount * o.price | sliceTo(2)}} / {{o.price * o.now_amount | sliceTo(2)}}
        </div>
        <div class="fl w10">
          单笔最低限额 <br>
          {{o.order_min || '--'}}
        </div>
        <div class="fl w20">
          委托时间 <br>
          {{o.create_time | utcString}}
        </div>
        <div class="fl w10">
          <el-button
            @click="cancelPublish(o)"
            type="primary mt-10"
            :loading="o.loading"
            size="mini">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IPublishComp",
  data () {
    return {
      orders: [],
      interval: null
    }
  },
  computed: {
    coin () {
      return this.$route.params.coin
    }
  },
  methods: {
    async getOrders () {
      let res = await this.$fetch('/v1/c2c/placard/myList')
      if (res._statusOk) {
        this.orders = res.data
      }
    },
    async cancelPublish (order) {
      this.$set(order, 'loading', true)
      let res = await this.$fetch('/v1/c2c/placard/operate', {
        placardId: order.id,
        status: 'cancel'
      })
        .finally(() => {
          order.loading = false
        })
      if (res._statusOk) {
        this.$showErrMsg('撤单成功')
        order.type === 'sell' && this.$getLegalBalance()
        this.getOrders()
      }
    }
  },
  created () {
    this.getOrders()
    this.interval = setInterval(this.getOrders.bind(this), 10 * 1000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>

<style scoped>
.publish-order{
  padding: 5px 20px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  border-left: 4px solid;
  margin: 20px 0;
  text-align: center;
  line-height: 1.8;
}
.bb{
  border-bottom: 1px solid #dddddd;
}
.br{
  border-right: 1px solid #dddddd;
  box-sizing: border-box;
}
</style>

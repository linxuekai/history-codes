<template>
  <div class="finance-table cont-box">
    <div class="cont-title">
      <span
        @click="currentType = 'in'"
        :class="{'is-active': currentType === 'in'}"
        class="link">充币记录</span>
      <span
        @click="currentType = 'out'"
        :class="{'is-active': currentType === 'out'}"
        class="link">提币记录</span>
    </div>
    <div class="pt-15">
      <table>
        <thead class="color-weak">
        <tr>
          <th class="w20">时间</th>
          <th class="w15">币种</th>
          <th class="w15">类型</th>
          <th class="w15">数量</th>
          <th class="w15">状态</th>
          <th class="w15">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(log,idx) in orders" :key="idx">
          <td>{{log.date | utcString}}</td>
          <td>{{log.coin}}</td>
          <td>{{log.type | logType}}</td>
          <td>{{log.amount}}</td>
          <td>{{log.status | logStatus}}</td>
          <td>
            <el-popover
              placement="top"
              trigger="click"
              :visible-arrow="false">
              <a
                v-if="log.txid"
                @click="copyText(log.txid)"
                title="点击复制">{{log.txid}}</a>
              <span v-else>暂无TxID</span>
              <el-button slot="reference" type="text">TxID</el-button>
            </el-popover>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div
      class="text-center pt-20 color-weak"
      v-if="!orders.length">暂无记录</div>
    <el-pagination
      layout='->, prev, pager, next, jumper'
      @current-change="getOrders"
      :current-page.sync="page"
      :page-size="15"
      :total="orderTotal">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "TransactionLog",
  data () {
    return {
      orders: [],
      page: 1,
      orderTotal: 0,
      currentType: 'in',
    }
  },
  computed: {},
  filters: {
    logType (type) {
      return {
        in: '充币',
        out: '提币'
      }[type.toLowerCase()]
    },
    logStatus (status) {
      return {
        WAIT: '待审核',
        PENDING: '待记账',
        WEB_PROCESSING: '处理中',
        COMPLETE: '已完成'
      }[status] || status
    }
  },
  watch: {
    currentType: {
      immediate: true,
      handler () {
        this.page = 1
        this.orderTotal = 0
        this.orders = []
        this.getOrders()
      }
    }
  },
  methods: {
    async getOrders () {
      let res = await this.$fetch('/v1/account/recharge/record', {
        type: this.currentType,
        page: this.page,
        coin: ''
      })
      if (res._statusOk) {
        this.orders = res.data
      }
    },
    copyText (txid) {
      this.$copyText(txid).then(
        () => this.$showErrMsg('TxID已复制'),
        () => this.$showErrMsg('浏览器不支持自动复制，请手动复制')
      )
    }
  },
  created () {

  }
}
</script>

<style scoped>
  .link{
    line-height: 1;
    padding-bottom: 14px;
  }
  .cont-title{
    margin: 0 -20px !important;
  }
</style>

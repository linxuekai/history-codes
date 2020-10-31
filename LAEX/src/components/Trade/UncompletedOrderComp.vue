<template>
  <div class="comp-uncompleted-order" :class="order.orderType">
    <div class="clear-fix pv-10 bb">
      <div class="fl w30">
        订单号：{{order.orderId.slice(0,-6)}}<span class="color-warn fw-bd">{{order.orderId.slice(-6)}}</span>
      </div>
      <div class="fl w70">
        {{order.orderType === 'buy' ? '卖家' : '买家'}}：{{order.orderType === 'buy' ? order.sellerNickname : order.buyerNickname}}
        <span class="ml-25">
          <i class="el-icon-phone-outline mr-5"></i> {{order.orderType === 'buy' ? order.sellerMobile : order.buyerMobile}}
        </span>
      </div>
    </div>

    <div class="pv-10 clear-fix">
      <div
        :class="order.orderType | orderTypeClass"
        class="fl w10 font-16">
        {{order.orderType | orderType}}<br>
        {{order.coin}}
      </div>

      <div class="fl w15">
        <span
          :class="order.orderType | orderTypeClass"
          class="font-16">￥{{order.total | sliceTo(2)}}</span> <br>
        价格：{{order.price | sliceTo(2)}} <br>
        数量：{{order.amount | sliceTo(2)}}
      </div>

      <div class="fl w15 text-center">
        <el-dropdown trigger="click" v-if="order.orderType === 'buy'">
          <span class="el-dropdown-link pointer">
            <img :src="`/static/img/icon/${payment.pay_code}.png`"><br>
            {{payment.pay_code | payCode}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu
            class="payments"
            slot="dropdown">
            <el-dropdown-item
              v-for="(pay,idx) in order.payMethods"
              @click.native="paymentIdx=idx"
              :key="pay.pay_code">{{pay.pay_code | payCode}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div v-if="order.orderType === 'sell'">
          我的收款方式 <br>
          <img :src="`/static/img/icon/${payment.pay_code}.png`"
               class="mr-5"
               v-for="payment in order.payMethods"
               :key="payment.pay_code">
        </div>
      </div>

      <div class="fl w35 br">
        <div v-if="order.orderType === 'buy'">
          <div>收款人：{{payment.name}}</div>
          <div v-if="payment.pay_code === 'bank'">
            <div>银行：{{payment.bankName}}</div>
            <div>支行：{{payment.bankBranchName}}</div>
            <div>银行卡号：{{payment.number}}</div>
          </div>
          <div v-else>
            <div v-if="payment.pay_code === 'alipay'">
              <div>支付宝账号：{{payment.number}}</div>
            </div>
            <div v-if="payment.pay_code === 'wechat'">
              <div>微信号：{{payment.number}}</div>
            </div>
            <div class="pv-5">
              收款码:
              <img
                class="pointer ml-15"
                @click="$preview(payment.picture)"
                :src="payment.picture" width="66" height="66">
            </div>
          </div>
          <div
            v-if="order.orderType==='buy'"
            class="color-warn fw-bd">转账时请备注订单号后6位，以便收款方对账</div>
        </div>
      </div>

      <div class="fr w25 text-right">
        <div v-if="order.orderStatus==='unpaid'">
          <div class="pb-10">
            <span>
              <i class="el-icon-time pr-5"></i>
            还剩{{order.limitTime | timeParse}}
            <span class="br ml-5 mr-10"></span>
            </span>
            <span class="font-16 fw-bd color-warn">
              {{{buy:'未支付',sell:'待支付'}[order.orderType]}}
            </span>
          </div>
          <el-button
            v-if="order.orderStatus === 'unpaid'"
            @click="paid"
            :loading="loading.paid"
            size="small"
            :type="order.orderType==='sell'&&order.orderStatus==='unpaid'?'info':'primary'">
            {{order.orderType==='buy'?'已支付':'确认收款'}}
          </el-button>
        </div>
        <div v-if="order.orderStatus==='paid' && order.orderType==='sell'">
          <div class="font-16 fw-bd color-warn pb-15">对方已付款</div>
          <el-button
            :loading="loading.paid"
            size="small"
            type="primary"
            @click="paid">
            确认收款
          </el-button>
        </div>
        <div
          v-if="order.orderStatus==='paid' && order.orderType === 'buy'"
          class="font-16 fw-bd color-success">
          待放币
        </div>
      </div>
    </div>

    <el-alert
      title=""
      v-if="order.orderStatus === 'unpaid' && order.orderType==='buy'"
      :closable="false"
      :show-icon="true"
      class="mb-15"
      type="warning">
      <div>
        1. 线下支付完成后，请务必点击【已支付】，避免订单超时自动取消造成您的财产损失。<br>
        2. 请勿备注任何比特币、BTC、以太坊、ETH以及其他数字资产名称于备注转账，防止造成您的汇款被拦截，银行卡被冻结等问题。<br>
        3. 请按照卖家收款方式完成线下汇款操作（只能本人实名银行卡、支付宝、微信支付）。<br>
        4. 大于5w以上汇款，请分批支付保证能即时到账（≤5w汇款可即时到账）。<br>
        5. 请使用即时到账的支付方式；支付宝转银行卡、2小时内汇款等支付方式造成1小时内未到账订单，卖家有权退回款项并取消订单，请周知。
      </div>
    </el-alert>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "UncompletedOrderComp",
  props: [
    'order'
  ],
  data () {
    return {
      timeInterval: null,
      loading: {
        paid: false
      },
      paymentIdx: 0
    }
  },
  computed: {
    ...mapState({
      userPayments: state => state.user.payMethods
    }),
    payment () {
      return this.order.payMethods[this.paymentIdx]
    }
  },
  filters: {
    timeParse (t) {
      let m = Math.floor(t / 60)
      let s = t % 60
      return `${m}分${s}秒`
    }
  },
  watch: {},
  methods: {
    async paid () {
      let tip = {
        buy: '是否确定已按付款方式向对方支付款项？如多次恶意提交虚假信息，将自行承担风险。',
        sell: '确认收款后，平台将自动将订单币种数量从您的冻结账户划转至对方账户，是否确定已收到对方支付的款项？'
      }[this.order.orderType]
      await this.$alert(tip, '温馨提示')
      this.loading.paid = true
      let res = await this.$fetch('/v1/c2c/pay/noptify', {
        orderId: this.order.orderId
      })
        .finally(() => {
          this.loading.paid = false
        })
      if (res._statusOk) {
        this.$parent.getOrders()
        this.order.orderType === 'sell' && this.$getLegalBalance()
      }
    },
  },
  created () {
    let {
      orderStatus,
      limitTime,
    } = this.order
    if (orderStatus === 'unpaid' && limitTime > 0) {
      this.timeInterval = setInterval(() => {
        if (--this.order.limitTime <= 0) {
          clearInterval(this.timeInterval)
          this.$parent.getOrders()
          this.order.orderType === 'sell' && this.$getLegalBalance()
        }
      }, 1000)
    }
  },
  beforeDestroy () {
    clearInterval(this.timeInterval)
  }
}
</script>

<style scoped>
  .comp-uncompleted-order{
    padding: 0 20px;
    line-height: 1.5;
    border: 1px solid #dddddd;
    border-radius: 4px;
    border-left: 4px solid;
    margin: 25px 0;
  }
.bb{
  border-bottom: 1px solid #dddddd;
}
  .br{
    border-right: 1px solid #dddddd;
    box-sizing: border-box;
  }
</style>

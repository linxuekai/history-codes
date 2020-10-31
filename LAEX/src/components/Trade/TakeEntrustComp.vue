<template>
  <div class="entrust-comp">
    <el-dialog
      @close="dialogReset"
      width="500px"
      :title="dialogTitle"
      :visible="!!order"
      :close-on-click-modal="false"
      class="dialog-box">
      <div>
        <el-form>
          <el-form-item label="价格">
            <el-input
              :value="order && order.price"
              class="not-input color-normal"
              readonly>
              <span class="ph-15" slot="suffix">CNY</span>
            </el-input>
          </el-form-item>
          <el-form-item label="数量">
            <el-input
              ref="amountIpt"
              v-model="amount"
              class="pr-150 content-box">
              <span
                class="ph-15"
                slot="suffix">
                <span class="color-weak">
                  ≤{{order.amount - order.now_amount | sliceTo(4)}}
                </span>
                {{currentCoin}}
              </span>
            </el-input>
          </el-form-item>
          <el-form-item label="总额">
            {{order && order.price * amount | sliceTo(2)}} CNY
            <span class="fr color-weak">手续费率：{{feeRates[currentCoin] && feeRates[currentCoin][`legal_${buyOrSell}_poundage`] * 100}}%</span>
          </el-form-item>
          <el-form-item class="mt-40 text-center">
            <el-button
              class="w50"
              @click="submit"
              :disabled="disableSubmit"
              :loading="loading.submit"
              v-if="buyOrSell==='buy'"
              type="success">买入</el-button>
            <el-button
              class="w50"
              @click="submit"
              :disabled="disableSubmit"
              :loading="loading.submit"
              v-if="buyOrSell==='sell'"
              type="danger">卖出</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "EntrustComp",
  props: [
    'order'
  ],
  data () {
    return {
      amount: '',
      loading: {
        submit: false,
      },
    }
  },
  computed: {
    dialogTitle () {
      return '法币下单'
    },
    disableSubmit () {
      return !(this.amount > 0)
    },
    currentCoin () {
      return this.$route.params.coin
    },
    buyOrSell () {
      return {
        buy: 'sell',
        sell: 'buy'
      }[this.order.type]
    },
    ...mapState([
      'feeRates'
    ]),
    releaseAmount () {
      let {amount, now_amount} = this.order
      return amount - now_amount
    }
  },
  filters: {
    btnFill (buyOrSell) {
      return {
        buy: '#67c23a',
        sell: '#f56c6c'
      }[buyOrSell]
    }
  },
  watch: {
    amount (val) {
      this.$nextTick(() => {
        if (+val > this.releaseAmount) {
          this.amount = this.releaseAmount + ''
        } else {
          this.$inputNumberCorector('amount', val, 4)
        }
      })
    },
  },
  methods: {
    dialogReset () {
      this.amount = ''
      this.$emit('close')
    },
    async submit () {
      this.loading.submit = true
      let {coin, id} = this.order
      let res = await this.$fetch('/v1/c2c/trade', {
        coin,
        tradeType: this.buyOrSell,
        placardId: id,
        amount: this.amount
      })
        .finally(() => {
          this.loading.submit = false
        })
      if (res._statusOk) {
        this.buyOrSell === 'sell' && this.$getLegalBalance()
        this.dialogReset()
        this.$alert({
          buy: '下单成功，请在15分钟内完成付款，否则将超时取消，超过三笔取消订单，将被冻结当天下单权限。',
          sell: '下单成功，对方将在15分钟内给您支付款项，否则订单将自动取消。',
        }[this.buyOrSell], {
          title: '法币交易',
          showClose: false
        })
        this.$root.$emit('takeEntrust')
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.amountIpt.focus()
    })
  }
}
</script>

<style scoped>
  .dialog-box{
    color: #c7cce6;
  }
</style>

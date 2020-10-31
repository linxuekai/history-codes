<template>
  <div class="entrust-comp">
    <el-dialog
      @close="dialogReset"
      width="500px"
      :title="dialogTitle"
      :visible="show"
      :close-on-click-modal="false"
      class="dialog-box">
      <div>
        <el-form>
          <el-form-item>
            <el-radio-group
              :disabled="loading.submit"
              size="small"
              class="w100"
              :border="false"
              :fill="buyOrSell | btnFill"
              v-model="buyOrSell">
              <el-radio-button
                class="w50"
                label="buy">买入{{currentCoin}}</el-radio-button>
              <el-radio-button
                class="w50"
                label="sell">卖出{{currentCoin}}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model="formData.price">
              <span class="ph-15" slot="suffix">CNY</span>
            </el-input>
          </el-form-item>
          <el-form-item label="数量">
            <el-input v-model="formData.amount">
              <span class="ph-15" slot="suffix">{{currentCoin}}</span>
            </el-input>
          </el-form-item>
          <el-form-item label="单笔最低限额（选填）">
            <el-input v-model="formData.minTotal" placeholder="--">
              <span class="ph-15" slot="suffix">CNY</span>
            </el-input>
          </el-form-item>

          <el-form-item label="总额">
            {{formData.price * formData.amount | sliceTo(2)}} CNY
            <span class="fr color-weak">手续费率：{{feeRates[currentCoin] && feeRates[currentCoin][`legal_${buyOrSell}_poundage`] * 100}}%</span>
          </el-form-item>
          <el-form-item class="mt-40 text-center">
            <el-button
              class="w50"
              v-if="buyOrSell==='buy'"
              @click="submit"
              :loading="loading.submit"
              :disabled="disableSubmit"
              type="success">发布买入</el-button>
            <el-button
              class="w50"
              v-if="buyOrSell==='sell'"
              @click="submit"
              :disabled="disableSubmit"
              :loading="loading.submit"
              type="danger">发布卖出</el-button>
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
  data () {
    return {
      show: false,
      buyOrSell: 'buy',
      formData: {
        price: '',
        amount: '',
        minTotal: ''
      },
      loading: {
        submit: false,
      }
    }
  },
  computed: {
    dialogTitle () {
      return '发布委托'
    },
    disableSubmit () {
      let {price, amount} = this.formData
      return !price || !amount
    },
    currentCoin () {
      return this.$route.params.coin
    },
    ...mapState([
      'feeRates'
    ])
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
    'formData.price' (val) {
      this.$inputNumberCorector('formData.price', val, 2)
    },
    'formData.amount' (val) {
      this.$inputNumberCorector('formData.amount', val, 4)
    },
    'formData.minTotal' (val) {
      let {price, amount} = this.formData
      let total = price * amount
      if (val > total) {
        return this.$nextTick(() => {
          this.formData.minTotal = total + ''
        })
      }
      this.$inputNumberCorector('formData.minTotal', val, 2)
    },
    buyOrSell () {
      let fd = this.formData
      fd.price = fd.amount = fd.minTotal = ''
    }
  },
  methods: {
    dialogReset () {
      let fd = this.formData
      fd.price = fd.amount = fd.minTotal = ''
      this.show = false
    },
    async submit () {
      this.loading.submit = true
      let {amount, price, minTotal} = this.formData
      let res = await this.$fetch('/v1/c2c/placard/create', {
        coin: this.currentCoin,
        amount,
        price,
        type: this.buyOrSell,
        min: minTotal || 0
      })
        .finally(() => {
          this.loading.submit = false
        })
      if (res._statusOk) {
        let {placardId} = res.data
        this.loading.submit = true
        let resPublish = await this.$fetch('/v1/c2c/placard/operate', {
          placardId,
          status: 'publish'
        })
          .finally(() => {
            this.loading.submit = false
          })
        if (resPublish._statusOk) {
          this.$showErrMsg('发布成功')
          this.buyOrSell === 'sell' && this.$getLegalBalance()
          let fd = this.formData
          fd.price = fd.amount = fd.minTotal = ''
          this.show = false
          this.$emit('successPublish')
        }
      }
    }
  },
  created () {
    window.entrustComp = this
  }
}
</script>

<style scoped>
  .dialog-box{
    color: #c7cce6;
  }
</style>

<template>
  <div class="pairs-order-form">
    <el-form size="medium">
      <el-form-item :label="formLabel.price">
        <el-input class="order-price not-input" readonly :value="`以市场上最优价格${formLabel.type}`">
          <span slot="suffix">
            <span class="color-weak pr-10">{{baseCoin}}</span>
          </span>
        </el-input>
      </el-form-item>
      <el-form-item :label="formLabel.amount">
        <el-input v-model="formData.amount">
          <span slot="suffix">
            <span class="color-weak pr-10">{{orderCoin}}</span>
          </span>
        </el-input>
      </el-form-item>
      <slider-comp
        ref="slider"
        @change="sliderChange"></slider-comp>
      <div class="mb-15">
        <div class="clear-fix font-12" v-if="buyOrSell==='buy'">
          <span class="fl">0 {{baseCoin}}</span>
          <span class="fr">
            <obvious-price-comp
              :value="baseCoinBalance.free | sliceTo(8)"/>
            {{baseCoin}}
          </span>
        </div>
        <div class="clear-fix font-12" v-else>
          <span class="fl">0 {{targetCoin}}</span>
          <span class="fr">
            <obvious-price-comp
             :value="targetCoinBalance.free | sliceTo(8)"/>
            {{targetCoin}}
          </span>
        </div>
      </div>
      <el-form-item>
        <div class="line-holder"></div>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="submit"
          :disabled="!(formData.amount > 0)"
          :loading="loading.submit"
          class="w100"
          :type="btnType">{{formLabel.type}} {{targetCoin}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import SliderComp from '@c/Pairs/SliderComp'
import {createNamespacedHelpers} from 'vuex'
const {mapState, mapGetters} = createNamespacedHelpers('pairs')

export default {
  name: "market-price-form-comp",
  components: {SliderComp},
  props: [
    'buyOrSell'
  ],
  data () {
    return {
      formData: {
        amount: ''
      },
      formLabel: null,
      loading: {
        submit: false
      }
    }
  },
  computed: {
    orderCoin () {
      switch (this.buyOrSell) {
        case 'buy':
          return this.baseCoin
        case 'sell':
          return this.targetCoin
      }
    },
    btnType () {
      return {
        buy: 'success',
        sell: 'danger'
      }[this.buyOrSell]
    },
    baseCoinBalance () {
      return this.balance[this.baseCoin] || {}
    },
    targetCoinBalance () {
      return this.balance[this.targetCoin] || {}
    },
    ...mapState([
      'baseCoin',
      'targetCoin',
      'balance'
    ]),
    ...mapGetters([
      'pricePoint',
      'sizePoint'
    ])
  },
  watch: {
    buyOrSell: {
      handler (BorS) {
        this.formLabel = {
          buy: {
            type: '买入',
            price: '买入价',
            amount: '交易额'
          },
          sell: {
            type: '卖出',
            price: '卖出价',
            amount: '卖出量'
          }
        }[BorS]
      },
      immediate: true
    },
    'formData.amount' (val) {
      let digit = this.buyOrSell === 'buy' ? this.pricePoint : this.sizePoint
      this.$inputNumberCorector('formData.amount', val, digit)
      this.$nextTick(this.amountNextTick)
    },
  },
  methods: {
    async submit () {
      this.loading.submit = true
      let payload = {
        consignType: `market_${this.buyOrSell}`,
        symbol: `${this.targetCoin}_${this.baseCoin}`,
        qty: this.formData.amount
      }
      let res = await this.$fetch('/v1/trade/coin/order', payload)
        .finally(() => {
          this.loading.submit = false
        })
      if (res._statusOk) {
        this.$store.dispatch('pairs/getBalance')
        this.$root.$emit('getPairsOrders')
        this.$showErrMsg('下单成功')
        this.formData.amount = ''
      }
    },
    sliderChange (val) {
      let amount = ''
      switch (this.buyOrSell) {
        case 'buy':
          amount = this.baseCoinBalance.free * val
          break
        case 'sell':
          amount = this.targetCoinBalance.free * val
          break
      }
      this.formData.amount = amount
    },
    amountNextTick () {
      let val = this.formData.amount
      let baseCoinFree = this.baseCoinBalance.free
      let targetCoinFree = this.targetCoinBalance.free
      let slider = this.$refs.slider
      switch (this.buyOrSell) {
        case 'buy':
          if (val > baseCoinFree) {
            this.formData.amount = baseCoinFree
          }
          slider.sliderVal = Math.min(100, val / baseCoinFree * 100)
          break
        case 'sell':
          if (val > targetCoinFree) {
            this.formData.amount = targetCoinFree
          }
          slider.sliderVal = val / targetCoinFree * 100
          break
      }
    }
  }
}
</script>

<style scoped>
.line-holder{
  height: 36px;
}
</style>

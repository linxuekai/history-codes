<template>
  <div class="pairs-order-form">
    <el-form size="medium">
      <el-form-item :label="formLabel.price">
        <el-input
          v-model="formData.price"
          class="order-price">
          <span slot="suffix">
            <span class="color-weak pr-10">{{baseCoin}}</span>
          </span>
        </el-input>
      </el-form-item>
      <el-form-item :label="formLabel.amount">
        <el-input v-model="formData.amount">
          <span slot="suffix">
            <span class="color-weak pr-10">{{targetCoin}}</span>
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
        <div>
          <span class="mr-10">交易额</span>
            <obvious-price-comp
              :value="total | sliceTo(8)"/>
          {{baseCoin}}
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="submit"
          :disabled="disableSubmit"
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
  name: "limit-price-form-comp",
  components: {SliderComp},
  props: [
    'buyOrSell'
  ],
  data () {
    return {
      formData: {
        price: '',
        amount: ''
      },
      loading: {
        submit: false
      }
    }
  },
  computed: {
    formLabel () {
      switch (this.buyOrSell) {
        case 'buy':
          return {
            type: '买入',
            price: '买入价',
            amount: '买入量'
          }
        case 'sell':
          return {
            type: '卖出',
            price: '卖出价',
            amount: '卖出量'
          }
      }
    },
    btnType () {
      return {
        buy: 'success',
        sell: 'danger'
      }[this.buyOrSell]
    },
    ...mapState([
      'baseCoin',
      'targetCoin',
      'priceProvider',
      'balance',
    ]),
    ...mapGetters([
      'latest',
      'pricePoint',
      'sizePoint'
    ]),
    total () {
      let {
        price,
        amount
      } = this.formData
      return price * amount
    },
    disableSubmit () {
      return !this.total
    },
    baseCoinBalance () {
      return this.balance[this.baseCoin] || {}
    },
    targetCoinBalance () {
      return this.balance[this.targetCoin] || {}
    }
  },
  watch: {
    priceProvider (p) {
      this.formData.price = p instanceof Array
        ? (this.buyOrSell === 'buy' ? p[0] : p[1])
        : p
    },
    'formData.amount' (val) {
      this.$inputNumberCorector('formData.amount', val, this.sizePoint)
    },
    'formData.price' (val) {
      val && this.$inputNumberCorector('formData.price', val, this.pricePoint)
    },
    total (val) {
      let {price, amount} = this.formData
      let baseCoinFree = this.baseCoinBalance.free
      let targetCoinFree = this.targetCoinBalance.free
      let slider = this.$refs.slider
      this.$nextTick(() => {
        switch (this.buyOrSell) {
          case 'buy':
            if (price * amount > baseCoinFree) {
              // this.formData.amount = (baseCoinFree / price) + ''
              this.$inputNumberCorector('formData.amount', baseCoinFree / price, this.sizePoint)
              break
            }
            slider.sliderVal = Math.min(100, val / baseCoinFree * 100)
            break
          case 'sell':
            if (amount > targetCoinFree) {
              // this.formData.amount = targetCoinFree + ''
              this.$inputNumberCorector('formData.amount', targetCoinFree, this.sizePoint)
              break
            }
            slider.sliderVal = Math.min(100, amount / targetCoinFree * 100)
            break
        }
      })
    }
  },
  methods: {
    async submit () {
      this.loading.submit = true
      let {
        price,
        amount
      } = this.formData
      let res = await this.$fetch('/v1/trade/coin/order', {
        consignType: `limit_${this.buyOrSell}`,
        price: price,
        qty: amount,
        symbol: `${this.targetCoin}_${this.baseCoin}`
      })
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
          if (this.formData.price > 0) {
            amount = this.baseCoinBalance.free * val / this.formData.price
          } else {
            this.$refs.slider.sliderVal = 0
          }
          break
        case 'sell':
          amount = this.targetCoinBalance.free * val
          break
      }
      this.formData.amount = amount || ''
    }
  },
  created () {
    this.$store.commit('pairs/initPriceProvider')
  }
}
</script>

<style scoped>
</style>

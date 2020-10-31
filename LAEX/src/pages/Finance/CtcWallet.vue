<template>
  <div class="finance-table cont-box">
    <table>
      <thead>
      <tr class="color-weak">
        <th class="w20">币种</th>
        <th class="w20">可用</th>
        <th class="w20">冻结</th>
        <th class="w10"></th>
        <th class="w30">操作</th>
      </tr>
      </thead>
      <tbody>
      <template v-for="(oCoin, coinName) in balance">
        <tr :key="coinName" :class="{'is-active': coinName===currentCoin}">
          <td>{{coinName}}</td>
          <td>
            <obvious-price-comp :value="oCoin.free" />
          </td>
          <td>
            <obvious-price-comp :value="oCoin.freeze" />
          </td>
          <td></td>
          <td class="operation">
            <a @click="showTrans(coinName, 'in')">充币</a>
            <a @click="showTrans(coinName, 'out')">提币</a>
            <router-link :to="{name: 'Pairs'}">交易</router-link>
          </td>
        </tr>
        <tr v-if="currentCoin===coinName" :key="coinName +'append'" class="trans-tr">
          <td colspan="5">
            <div
              v-loading="loading.inBox"
              class="trans-in-box"
              v-if="transDirection==='in'">
              <p class="mt-0">充币地址</p>
              <div v-show="coinAddresses[coinName]">
                <span class="coin-addr">{{coinAddresses[coinName]}}</span>
                <a
                  @click="copyCoinAddress"
                  class="mh-20">复制</a>
                <a @click="showQrcode">二维码</a>
              </div>
              <div v-show="!coinAddresses[coinName]">正在获取...</div>
              <p>查看<a>充币记录</a>跟踪状态</p>
              <p>
                温馨提示：<br>
                • 请勿向上述地址充值任何非{{coinName}}资产，否则资产将不可找回。<br>
                • 您充值至上述地址后，需要整个网络节点的确认，6次网络确认后到账。<br>
                • 最小充值金额：0.01 {{coinName}}，小于最小金额的充值将不会上账且无法退回。<br>
                • 您的充值地址不会经常改变，可以重复充值；如有更改，我们会尽量通过网站公告、短信或邮件通知您。<br>
                • 请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</p>
              <i class="angle"></i>
            </div>
            <div class="trans-out-box" v-if="transDirection==='out'">
              <div class="">
                <el-form>
                  <el-form-item label="提币地址">
                    <el-input
                      v-model.trim="formData.outAddress"></el-input>
                  </el-form-item>
                  <el-form-item label="数量">
                    <el-input v-model="formData.amount"></el-input>
                  </el-form-item>
                  <div class="clear-fix">
                    <div class="w50 fl border-box pr-15">
                      <el-form-item label="平台手续费">
                        <el-input
                          class="not-input"
                          readonly
                          :value="currentFee"></el-input>
                      </el-form-item>
                    </div>
                    <div class="w50 fl border-box pl-15">
                      <el-form-item label="转出数量（未包含矿工费）">
                        <el-input
                          class="not-input"
                          readonly
                          :value="Math.max(0, formData.amount - currentFee) | sliceTo(8)"></el-input>
                      </el-form-item>
                    </div>
                  </div>
                </el-form>
                <div class="clear-fix pt-15">
                  <div class="fl w60">
                    <p>
                      温馨提示：<br>
                      • 最小提币数量为：{{oCurrentFees.min_withdraw}} {{currentCoin}}。<br>
                      • 为保障资金安全，当您账户安全策略变更、密码修改、使用新地址提币，我们会对提币进行人工审核，请耐心等待工作人员电话或邮件联系。<br>
                      • 请务必确认电脑及浏览器安全，防止信息被篡改或泄露。
                    </p>
                  </div>
                  <div class="fr w20">
                    <el-button
                      @click="outSubmit"
                      :loading="loading.outSubmit"
                      :disabled="!formData.outAddress || !(formData.amount > 0)"
                      type="primary"
                      class="w100 pv-15 font-16 mt-20">提币</el-button>
                  </div>
                </div>
              </div>
              <i class="angle"></i>
            </div>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from 'vue'
import {mapState, mapActions} from 'vuex'
import QRCode from 'qrcode'
export default {
  name: "CtcWallet",
  data () {
    return {
      currentCoin: '',
      transDirection: '', // in | out
      formData: {
        outAddress: '',
        amount: '',
      },
      loading: {
        inBox: false,
        outSubmit: false
      },
    }
  },
  computed: {
    ...mapState({
      balance: state => state.pairs.balance,
      coinAddresses: state => state.user.coinAddresses,
      feeRates: state => state.feeRates
    }),
    oCurrentFees () {
      return this.feeRates[this.currentCoin] || {}
    },
    currentFee () {
      let {
        once_min_withdraw,
        withdraw_poundage,
      } = this.oCurrentFees
      let preFee = this.formData.amount * withdraw_poundage
      return preFee > 0
        ? Vue.filter('sliceTo')(Math.max(once_min_withdraw, preFee), 8, 'ceil')
        : ''
    }
  },
  watch: {
    currentCoin (coin) {
      this.formData.outAddress = this.formData.amount = ''
      this.$preview('')
    },
    'formData.amount' (val) {
      this.$nextTick(() => {
        let useable = this.balance[this.currentCoin].free
        if (val > useable) {
          this.formData.amount = useable + ''
          return
        }
        this.$inputNumberCorector('formData.amount', val)
      })
    }
  },
  methods: {
    showTrans (coin, direction) {
      if (this.transDirection === direction && this.currentCoin === coin) return
      this.transDirection = direction
      this.currentCoin = coin
      if (direction === 'in') this.getCoinAddr(coin)
      if (direction === 'out') this.$preview('')
    },
    copyCoinAddress () {
      let addr = this.coinAddresses[this.currentCoin]
      this.$copyText(addr)
        .then(() => this.$showErrMsg('充币地址已复制'),
          () => this.$showErrMsg('浏览器不支持复制，请手动复制'))
    },
    async showQrcode () {
      let addr = this.coinAddresses[this.currentCoin]
      let url = await QRCode.toDataURL(addr, {
        width: 300,
        margin: 2,
      })
      this.$preview(url)
    },
    async outSubmit () {
      await this.$confirm('平台手续费不包含旷工服务费，实际到账数量已网络到账为准，是否了解以上说明并确认转出？', '须知')
      this.loading.outSubmit = true
      let {outAddress, amount} = this.formData
      let res = await this.$fetch('/v1/wallet/out', {
        outAddress,
        amount,
        coin: this.currentCoin
      })
        .finally(() => {
          this.loading.outSubmit = false
        })
      if (res._statusOk) {
        this.getBalance()
        amount > this.feeRates[this.currentCoin].withdraw_check_limit
          ? this.$alert('提币数量较多需经平台审核确认，请留意审核情况', '提币提示')
          : this.$alert('提币成功，请留意网络确认和到账情况', '温馨提示')
        this.formData.outAddress = this.formData.amount = ''
      }
    },
    async getCoinAddr (coin) {
      this.loading.inBox = false
      if (!this.coinAddresses[coin]) {
        this.loading.inBox = true
        let res = await this.$fetch('/v1/wallet/getAddress', {coin})
          .finally(() => {
            this.loading.inBox = false
          })
        res._statusOk && this.$store.commit('user/updateCoinAddresses', {
          coin,
          address: res.data.inAddress
        })
      }
    },
    ...mapActions('pairs', [
      'getBalance'
    ])
  },
  async created () {
    this.getBalance()
  },
  beforeDestroy () {
    this.$preview('')
  }
}
</script>

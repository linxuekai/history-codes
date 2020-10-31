<template>
  <div id="page-trade">
    <div class="main-box clear-fix">
      <div class="fl w20 pr-30 border-box">
        <ul class="coin-list">
          <router-link
            tag="li"
            :to="{name: 'Trade', params: {coin}}"
            v-for="coin in coins"
            :key="coin">
            {{coin}}</router-link>
        </ul>
      </div>
      <div class="fr w80">
        <trade-user-info-comp :trade-coin="tradeCoin"/>
        <div class="text-right pb-5 mt-20">
          价格不合适？
          <a @click="publishEntry">发布交易单</a>
        </div>
        <div class="divider"></div>
        <entrust-list-comp
          ref="entrustList"
          class="mb-30" />
        <i-publish-comp
          ref="iPublish"
          v-if="authorized" />
        <user-trade-orders-comp v-if="authorized" />
      </div>
    </div>
    <entrust-comp
      @successPublish="() => $refs.iPublish.getOrders()"
      ref="entrustComp"/>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapState} from 'vuex'
import TradeUserInfoComp from '@c/Trade/TradeUserInfoComp'
import EntrustListComp from '@c/Trade/EntrustListComp'
import UserTradeOrdersComp from '@c/Trade/UserTradeOrdersComp'
import EntrustComp from '@c/Trade/EntrustComp'
import IPublishComp from '@c/Trade/IPublishComp'
export default {
  name: "trade",
  components: {
    TradeUserInfoComp,
    EntrustListComp,
    UserTradeOrdersComp,
    EntrustComp,
    IPublishComp
  },
  data () {
    return {
      coins: [],
    }
  },
  computed: {
    tradeCoin () {
      return this.$route.params.coin
    },
    ...mapGetters('user', [
      'authorized',
    ]),
    ...mapState('user', [
      'authStatus',
      'payMethods'
    ])
  },
  methods: {
    ...mapActions('user', [
      'getLegalBalance'
    ]),
    publishEntry () {
      if (!this.authorized) {
        localStorage.setItem('loginBack', `/Trade/${this.$route.params.coin}`)
        this.$router.push({name: 'Login'})
      } else if (!(this.authStatus >= 2)) {
        this.$alert('发布交易单需通过二级身份认证，是否前往认证？', '提示')
          .then(() => this.$router.push({name: 'UserAuth'}))
      } else if (!this.payMethods.length) {
        this.$alert('您暂未绑定收付款方式，是否前往绑定？', '提示')
          .then(() => this.$router.push({name: 'UserInfo'}))
      } else {
        this.$refs.entrustComp.show = true
      }
    }
  },
  async created () {
    if (this.authorized) {
      this.getLegalBalance()
    }
    let res = await this.$tipPost('/v1/c2c/placard/coin')
    if (res._statusOk) this.coins = res.data
  }
}
</script>

<style scoped>
  #page-trade{
    background: #fcfcfc;
    color: #262a42;
    padding: 40px 0;
  }
  .main-box{
    width: 1200px;
    margin: 0 auto;
  }
  .coin-list{
    border: 1px solid #e9e9e9;
    border-radius: 3px;
    min-height: 350px;
    box-shadow: 1px 2px 5px #ebedf0;
    color: #777777;
  }
  .coin-list>li{
    padding: 8px 20px;
    font-size: 13px;
    transition: .2s;
    cursor: pointer;
    background-color: transparent;
    border-bottom: 1px solid whitesmoke;
    border-left: 3px solid transparent;
  }
  .coin-list>.router-link-exact-active{
    border-left-color: #7a98f7;
    /*box-shadow: 2px 0 4px #7a98f7 inset;*/
    background-color: #f1f5ff;
  }
  .coin-list>li:hover{
    background-color: #f5f5f5;
  }
</style>

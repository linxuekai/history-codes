<template>
  <div>
    <div class="pocket-wrap">
      <div class="pocket-title" v-text="$t('账户资产一览')">
      </div>
      <div class="pocket-zc">
        <div class="pocket-zc-item">
          <div class="pocket-zc-col">
            <div class="pocketcol">
              <div class="pocketBanlance">
                <div class="banlanceIcon">
                  <img :src="require('@/assets/img/icon_vs.png')">
                  <span>VS</span>
                </div>
                <div class="coinNum">
                  <span>{{coinPrice.VS.Balance | toFixed2}}</span>
                </div>
                <div class="coinNum">
                  <span>{{coinPrice.VS.Balance | toFixed2}}</span>
                </div>
              </div>

              <router-link class="pocketType" to="/Transfer" tag="div">
                <span class="is-link" v-text="$t('转入转出')"></span>
              </router-link>

            </div>
          </div>
          <div class="pocket-zc-col">
            <div class="pocketcol">
              <div class="pocketBanlance">
                <div class="banlanceIcon">
                  <img :src="require('@/assets/img/icon_vt.png')">
                  <span>VT</span>
                </div>
                <div class="coinNum">
                  <span>{{coinPrice.VT.Balance | toFixed2}}</span>
                </div>
                <div class="coinNum">
                  <span>{{coinPrice.VT.Balance | toFixed2}}</span>
                </div>
              </div>
              <router-link class="pocketType" to="/Financing" tag="div" v-text="$t('兑换')">
              </router-link>

            </div>
          </div>
        </div>

        <div class="pocket-zc-item">
          <div class="pocket-zc-col">
            <div class="pocketcol">
              <div class="pocketBanlance">
                <div class="banlanceIcon m-t-16">
                  <img :src="require('@/assets/img/icon_vts.png')">
                  <span>VTS</span>
                </div>
                <div class="coinNum">
                  <span>{{coinPrice.VTS.Balance | toFixed2}}</span>
                </div>
                <!--<div class="coinNum">-->
                <!--<span v-text="coinPrice.VTS.Balance"></span> 美金-->
                <!--</div>-->
              </div>
              <router-link class="pocketType" to="/Trade" tag="div" v-text="$t('交易')">
              </router-link>

            </div>
          </div>
          <div class="pocket-zc-col">
            <div class="pocketcol">
              <div class="pocketBanlance">
                <div class="banlanceIcon">
                  <img :src="require('@/assets/img/icon_sc.png')">
                  <span>SC</span>
                </div>
                <div class="coinNum">
                  <span>{{coinPrice.SC.Balance | toFixed2}}</span>
                </div>
                <div class="coinNum">
                  <span>{{coinPrice.SC.Balance | toFixed2}}</span>
                </div>
              </div>
              <router-link class="pocketType" to="/Transfer" tag="div" v-text="$t('转入转出')">
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'pocket',
    data () {
      return {
        coinPrice: {
          'VS': {
            Balance: 0
          },
          'SC': {
            Balance: 0
          },
          'VTS': {
            Balance: 0
          },
          'VT': {
            Balance: 0
          },
          'VC': {
            Balance: 0
          }
        }
      }
    },
    computed: mapState({
      connReady: state => state.connReady,
      isLogged: state => state.isLogged
    }),
    filters: {
      toFixed2 (value) {
        value = value.toFixed(2)
        return value
      }
    },
    beforeRouteEnter: (to, from, next) => {
      next(vm => {
        if (vm.$store.state.connReady === true && vm.$store.state.isLogged === true) {
          vm.init()
        }
      })
    },
    watch: {
      isLogged (newVal, oldVal) {
        if (this.$store.state.connReady === true && newVal === true) {
          this.init()
        }
      }
    },
    methods: {
      async init () {
        var _this = this
        let res = await this.$store.dispatch('GetBalance')
        if (res.data instanceof Array) {
          res.data.forEach((item) => {
            _this.coinPrice[item.CoinName] = item
          })
        }
      }
    }
  }
</script>

<style scoped>
  .pocket-wrap{
    font-family: MicrosoftYaHei, sans-serif;
    text-align: left;
    color: #ffffff;
    width: 921px;
    box-sizing: border-box;
    margin: 100px auto 20px;
  }
  .pocket-title{
    font-size: 24px;
    text-align: center;
  }
  .pocket-zc{
    margin-top: 70px;
  }
  .pocket-zc-item{
    height: 110px;
    margin-top: 50px;
  }
  .pocket-zc-col{
    float: left;
    margin-right: 184px;
    box-sizing: border-box;
  }
  .pocket-zc-col:nth-of-type(2n){
    margin-right: 0;
  }
  .pocket-zc-col .pocketcol{
    width: 366px;
    height: 110px;
    border-radius: 4px;
    box-shadow: 0px 1px 10px 0 rgba(0, 0, 0, 0.07);
    border: solid 1px #ffffff;
  }
  .pocketcol .pocketBanlance{
    width: 183px;
    height: 110px;
    float: left;
    text-align: center;
    padding: 10px 0 0 0;
  }
  .pocketcol .pocketType{
    width: 183px;
    height: 110px;
    line-height: 110px;
    text-align: center;
    background-color: rgba(255,255,255,.2);
    float: left;
    font-size: 20px;
    cursor: pointer;
  }
  .banlanceIcon span{
    font-size: 20px;
  }
  .banlanceIcon img{
    margin-right: 10px;
    width: 24px;
    height: 24px;
  }
  .banlanceIcon img:nth-of-type(1){
    width: 28px;
    height: 26px;
  }
  .coinNum{
    font-size: 12px;
    margin-top: 10px;
  }
  .m-t-16{
    margin-top: 16px
  }
</style>

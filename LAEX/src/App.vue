<template>
  <div id="app">
    <navbar-comp :class="navbarClass"></navbar-comp>
    <div id="page-main">
      <router-view/>
    </div>
    <footer-comp></footer-comp>
    <transition name="fade">
      <div id="err-tip"
           @mouseenter="errMsgMouseIn"
           @mouseout="errMsgMouseOut"
           v-show="errMsg"
           v-text="errMsg"></div>
    </transition>
    <div class="center-fixed" v-show="!!previewImgUrl">
      <div class="text-right bg-aaa">
        <div class="close-btn" @click="$preview(null)">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <img :src="previewImgUrl">
    </div>
    <img
      v-show="showLoading"
      src="/static/img/loading.svg"
      class="center-fixed"
      width="88"
      height="88">
  </div>
</template>

<script>
import {mapState} from 'vuex'
import NavbarComp from '@c/NavbarComp'
import FooterComp from '@c/FooterComp'

export default {
  name: 'App',
  components: {
    NavbarComp,
    FooterComp
  },
  data () {
    return {
    }
  },
  computed: {
    navbarClass () {
      return this.$route.name === 'Home'
        ? 'home-navbar'
        : ''
    },
    ...mapState([
      'errMsg',
      'previewImgUrl',
      'showLoading'
    ]),
    authorized () {
      return this.$store.getters['user/authorized']
    }
  },
  watch: {
    $route () {
      window.scrollTo(0, 0)
    }
  },
  methods: {
    errMsgMouseIn () {
      // this.$store.commit('updateErrMsgTimeout', null, true)
    },
    errMsgMouseOut () {
      // this.$store.commit('updateErrMsgTimeout', setTimeout(() => {
      //   this.$store.commit('updateErrMsg', '')
      // }, 3000))
    }
  },
  async created () {
    window.app = this
    if (!window.WebSocket) {
      let tip = () => {
        this.$alert('当前浏览器不支持WebSocket，无法获取行情推送，请更换浏览器使用！', '温馨提示')
          .finally(() => setTimeout(tip, 10000))
      }
      tip()
    }
    this.$store.dispatch('pairs/getAllSymbols')
    this.$store.dispatch('getFeeRates')
    this.authorized && this.$getUserInfo()
    // test
    // ;(function () {
    // let tick = 1
    // let start = Date.now()
    //
    // function timeoutTest () {
    //   setTimeout(function () {
    //     if (Date.now() - start < 1000) {
    //       console.log(tick++)
    //       timeoutTest()
    //     }
    //   }, 0)
    // }
    // timeoutTest() // 110+
    //
    // let interval = setInterval(function () {
    //   if (new Date() - start >= 1000) {
    //     clearInterval(interval)
    //   }
    //   console.log(tick++)
    // }, 0) // 160+
    //
    // function vueNextTick () {
    //   app.$nextTick(function () {
    //     if (Date.now() - start < 1000) {
    //       console.log(tick++)
    //       vueNextTick()
    //     }
    //   })
    // }
    // vueNextTick() // 490+
    //
    // let p = Promise.resolve(1)
    // function promise () {
    //   p.then(function () {
    //     if (Date.now() - start < 10000) {
    //       console.log(tick++)
    //       promise()
    //     }
    //   })
    // }
    // promise() // 1200+
    //
    // function nextTick () {
    //   process.nextTick(function () {
    //     if (Date.now() - start < 1000) {
    //       console.log(tick++)
    //       nextTick()
    //     }
    //   })
    // }
    // nextTick() // 1900+
    //
    // while (Date.now() - start < 1000) {
    //   console.log(tick++)
    // } // 2500+
    //
    // console.log(1)
    // process.nextTick(function () {
    //   console.log(2)
    // })
    // console.log(3) // 1,3,2
    // })()
  }
}
</script>

<style>
  .home-navbar{
    position: absolute;
    z-index: 5;
    top: 0;
    background-color: rgba(0, 0, 0, .2) !important;
  }
  #err-tip{
    min-width: 300px;
    border-radius: 10px;
    background: rgba(0,0,0,.6);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    padding: 30px 20px;
    color: #fff;
    text-align: center;
    font-size: 18px;
    line-height: 30px;
    z-index: 9999;
    box-shadow: 0 0 5px #000;
  }
  .service{
    width: 60px;
    height: 60px;
    transition: .5s;
    position: fixed;
    bottom: 10px;
    right: 10px;
  }
  .service:hover{
    bottom: 15px;
  }
  #page-main {
    min-height: 70vh;
  }
</style>

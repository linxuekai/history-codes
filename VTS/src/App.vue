<template>
  <div id="app">
    <navbar></navbar>
    <div class="page-content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <update-account :dialog-show="updateShow"
                    @closeDialog="updateShow = false"
    ></update-account>
  </div>
</template>

<script>
  import checkLogin from '@/assets/js/checkLogin'
  import UpdateAccount from '@/components/UpdateAccount.vue'
  import {Input, Button, Loading} from 'element-ui'
  import Vue from 'vue'
  import axios from '@/axios'
  Vue.use(Input)
  Vue.use(Button)
  Vue.use(Loading)

  const Navbar = r => require.ensure([], () => r(require('./components/Navbar.vue')), 'jsGroup-Navbar')
  export default {
    name: 'app',
    data () {
      return {
        updateShow: false
      }
    },
    components: {
      Navbar,
      UpdateAccount
    },
    async beforeCreate () {
      let appLoading = Loading.service({
        fullsreen: true,
        customClass: 'loading',
        text: '正在初始化 ...'
      })
      await checkLogin()
      appLoading.close()
      let {data: {code, data: {RequriedSync, RequiredUpgrade}}} = await axios.post('/Account/IsSync')
      if (code === 'StatusOk') {
        if (RequiredUpgrade) {
          this.updateShow = true
          return
        }
        if (RequriedSync) {
          this.$router.push('/Settings/Backup')
          alert('危险！您已更改了此账号密码并未进行备份，请先下载账户备份文件，才可访问并操作其他页面！')
        }
      }
    }
  }
</script>

<style>
  @import '../static/css/blue.css';
  html{
    height: 100%;
    box-sizing: border-box;
  }
  body {
    box-sizing: border-box;
    height: 100%;
    margin: 0;
    color: #2c3e50;
    /*background: #143d5f;*/
  }

  #app {
    box-sizing: border-box;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .page-content {
    box-sizing: border-box;
    padding-top: 50px;
    color: #fff;
    font-size: 14px;
  }
  .loading{
    width: 25%;
    height: 25%;
    position: fixed;
    left:50% !important;
    top:50% !important;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    background: #222 !important;
    opacity:0.8;
    border-radius: 20px;
  }
</style>

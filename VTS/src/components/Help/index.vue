<template>
  <div>
    <div class="settings-nav">
      <div class="settings-nav-side">
        <div class="settings-nav-set">帮助中心</div>
        <div class="settings-item" v-for="(value,index) in settingsNavOption" @click="transUrl(index)">
          <router-link :to="value.path" tag="a" v-text="value.text" :class="{active:value.active===true}"></router-link>
        </div>
      </div>
      <div class="settings-nav-content">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        settingsNavOption: [
          {text: '注册和登录', path: '/Help/Register', active: false},
          {text: '买卖交易', path: '/Help/Trade', active: false},
          {text: '充值和提现', path: '/Help/Transfer', active: false},
          {text: '修改密码和创建备份', path: '/Help/Password', active: false}
        ]
      }
    },
    mounted () {
      this.curPage()
    },
    watch: {
      '$route': function () {
        this.curPage()
      }
    },
    methods: {
      transUrl (index) {
        this.settingsNavOption.forEach(function (item) {
          item.active = false
        })
        this.settingsNavOption[index].active = true
      },
      curPage () {
        var url = window.location.hash
        url = url.substring(1, url.length)
        this.settingsNavOption.forEach(function (item) {
          item.active = false
          if (item.path === url) {
            item.active = true
          }
        })
      }
    }
  }
</script>

<style scoped>
  .settings-nav{
    width: 80%;
    min-width: 800px;
    margin: 100px auto 20px;
    font-family: "Microsoft YaHei";
    font-size: 14px;
    color: #ffffff;
    overflow: visible;
  }
  .settings-nav-side{
    width: 190px;
    float: left;
    box-sizing: border-box;
  }
  .settings-nav-content{
    width: 610px;
    float: left;
    box-sizing: border-box;
  }
  .settings-nav-set{
    font-size: 20px;
    padding-bottom: 14px;
    border-bottom: 1px solid rgba(255,255,255,.5);
    width: 100px;
    padding-left: 20px;
    box-sizing: border-box;
  }
  .settings-item{
    width: 120px;
    margin-top: 26px;
    padding-left: 20px;
    box-sizing: border-box;
  }
  .settings-item a.active{
    color: #1da1f3;
  }
  .settings-item a{
    text-decoration: none;
    color: #fff;
    cursor: pointer;
  }
</style>

<style>
  .helpRegister{
    width: 1200px;
  }
  .HelpTitle{
    font-size: 20px;
    color: #ffffff;
  }
  .f-s-16{
    font-size: 16px;
  }
  .m-t-20{
    margin-top: 20px;
  }
</style>


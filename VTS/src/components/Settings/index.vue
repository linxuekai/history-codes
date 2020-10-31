<template>
  <div>
    <div class="settings-nav">
      <div class="settings-nav-side">
        <div class="settings-nav-set">设置</div>
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
          {text: '通用设置', path: '/Settings/General', active: false},
          {text: '子账号', path: '/Settings/SubAccount', active: false},
          {text: '账号列表', path: '/Settings/Account', active: false},
          {text: '备份 / 导入', path: '/Settings/Backup', active: false}
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
  .p-lr-10{
    padding: 0 10px;
  }
  .setting-subTitle{
    margin: 20px 0 40px 0;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255,255,255,.5);
  }
  .f-s-20{
    font-size: 20px;
  }
  .m-t-18{
    margin-top: 18px;
  }
  .m-t-40{
    margin-top: 40px;
  }
  .dropDownBox{
    font-size: 20px;
    background-color: #143d5f;
    border: solid 1px #fff;
    position: absolute;
    top: 38px;
    z-index: 999;
    width: 100%;
    box-sizing: border-box;
  }
  .dropDownItem:nth-of-type(1){
    padding-top: 10px;
  }
  .dropDownItem:nth-last-of-type(1){
    padding-bottom: 10px;
  }
  .dropDownItem{
    cursor: pointer;
    padding: 4px 10px;
  }
  .dropDownItem:hover{
    background: rgba(255,255,255,.1);
  }
  .rotateClose {
    animation-name: rotateShou;
  }
  @keyframes rotateShou {
    from {
      transform-origin: center;
    }
    to {
      transform-origin: center;
      transform: rotate3d(0, 0, 1, -180deg);
    }
  }
  .rotateOpen {
    animation-name: rotateOpen;
    animation-duration: 3s;
  }
  @keyframes rotateOpen {
    from {
      transform-origin: center;
    }
    to {
      transform-origin: center;
      transform: rotate3d(0, 0, 1, 180deg);
    }
  }
  .settings-item{
    width: 100px;
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
  .cursor-pointer{
    cursor: pointer;
  }
</style>



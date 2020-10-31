<template>
  <div>
    <div class="generalBox">
      <div class="f-s-20 p-lr-10">通用设置</div>

      <div class="setting-subTitle p-lr-10">调整基本参数</div>

      <div class="p-lr-10">语言选择</div>
      <div class="ps-relative">
        <div class="m-t-18 borderBottom p-lr-10 cursor-pointer">
          <div @click="toggleDropDownList('lang')">
            <span class="f-s-20" v-text="curLang"></span>
            <img :src="require('@/assets/img/dropDownArrow.png')" class="setting-dropDownArrow">
          </div>
        </div>
        <div class="dropDownBox" :style="{ background: theme.color}" v-show="dropDownList.lang.isShow === true">
          <div class="dropDownItem" v-for="(value,index) in langList" v-text="value.lang" @click="chooseItem(value)"></div>
        </div>
      </div>

      <div class="p-lr-10 m-t-40">子账号自动锁定时间</div>
      <div class="ps-relative">
        <div class="m-t-18 borderBottom p-lr-10 cursor-pointer">
          <div @click="toggleDropDownList('autoLock')">
            <span class="f-s-20" v-text="curTime"></span>
            <img :src="require('@/assets/img/dropDownArrow.png')" class="setting-dropDownArrow">
          </div>
        </div>
        <div class="dropDownBox" :style="{ background: theme.color}" v-show="dropDownList.autoLock.isShow === true">
          <div class="dropDownItem" v-for="(value,index) in autoLockTimeList" v-text="value.times" @click="chooseAutoLockTime(value)"></div>
        </div>
      </div>

      <div class="m-t-40 p-lr-10">主题</div>
      <div class="ps-relative">
        <div class="m-t-18 borderBottom p-lr-10 cursor-pointer">
          <div @click="toggleDropDownList('theme')">
            <span class="f-s-20" v-text="theme.theme"></span>
            <img :src="require('@/assets/img/dropDownArrow.png')" class="setting-dropDownArrow">
          </div>
        </div>
        <div class="dropDownBox" :style="{ background: theme.color}" v-show="dropDownList.theme.isShow === true">
          <div class="dropDownItem" v-for="(value,index) in themeList" v-text="value.theme" @click="chooseTheme(value)"></div>
        </div>
      </div>

      <!--<div class="m-t-40 p-lr-10 text-right" @click="clearCache">-->
      <!--清除数据缓存-->
      <!--</div>-->

    </div>

  </div>
</template>

<script>
  import {Message, MessageBox} from 'element-ui'
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        curLang: '简体中文',
        dropDownList: {
          lang: {isShow: false},
          autoLock: {isShow: false},
          theme: {isShow: false}
        },
        langList: [
          {lang: '简体中文'},
          {lang: 'English'}
        ],
        autoLockTimeList: [
          {times: '10分钟', second: 60 * 10},
          {times: '30分钟', second: 60 * 30},
          {times: '1小时', second: 60 * 60},
          {times: '3小时', second: 60 * 60 * 3},
          {times: '24小时', second: 60 * 60 * 24}
        ],
        themeList: [
          {theme: '蓝色', navColor: '#0e244d', color: '#143d5f'},
          {theme: '黑色', navColor: '#4d4d4d', color: '#333333'}
        ]
      }
    },
    computed: {
      ...mapState({
        curTime: state => state.UnLockOption.times,
        theme: state => state.theme
      })
    },
    methods: {
      clearCache () {
        MessageBox.confirm('此操作将清除K线图数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Message.success('清除成功!')
          this.webStore.removeItem('baseMarketData', () => { window.location.reload() })
        }).catch(() => {
          // Message.warning('已取消删除')
        })
      },
      toggleDropDownList (tar) {
        this.dropDownList[tar].isShow = !this.dropDownList[tar].isShow
      },
      chooseItem (value) {
        this.curLang = value.lang
        this.dropDownList.lang.isShow = false
      },
      chooseAutoLockTime (value) {
        this.$store.commit('unlockTimeOption', value)
        this.dropDownList.autoLock.isShow = false
        window.webStore.setItem('UnlockOption', value)
      },
      chooseTheme (value) {
        this.curTheme = value.theme
        this.dropDownList.theme.isShow = false
        document.getElementsByClassName('el-menu--dark')[0].style.backgroundColor = value.navColor
        document.getElementsByClassName('navbar-wrap')[0].style.backgroundColor = value.navColor
        document.getElementsByTagName('body')[0].style.backgroundColor = value.color
        if (document.getElementById('account-nav')) {
          document.getElementById('account-nav').style.backgroundColor = this.theme.navColor
        }
        this.$store.commit('upDateTheme', value)
        window.localStorage.VTSTheme = JSON.stringify(value)
      }
    }
  }
</script>

<style scoped>
  .text-right{
    text-align: right;
    cursor: pointer;
  }
  .text-right:hover{
    color: #1da1f3;
  }
  .generalBox{
    width: 610px;
    margin: 0 auto 100px;
    font-size: 14px;
    color: #ffffff;
    box-sizing: border-box;
  }
  .ps-relative{
    position: relative;
  }
  .setting-dropDownArrow{
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .borderBottom{
    border-bottom: 1px solid rgba(255,255,255,.5);
    padding-bottom: 12px;
  }
</style>

<template>
  <div>
    <div class="navbar-wrap">
      <el-menu router
               mode="horizontal"
               :default-active="defaultActivedTab"
               theme="dark"
               id="navbar">
        <el-menu-item class="navbar-item" index="/">
          <img height="30" :src="require('@/assets/img/logo.png')" alt="" class="navbar-logo">
        </el-menu-item>
        <el-menu-item :index="item.path"
                      v-for="item in navOptions"
                      :key="item.path"
                      v-text="item.name"
                      class="navbar-item"
        ></el-menu-item>
      </el-menu>
      <div class="user-info">
        <div class="user-info-item" v-if="isLogged === true">
          <el-popover popper-class="pop-user"
                      trigger="hover"
                      ref="userPop">
            <el-button type="text" slot="reference" class="uname-btn">
              <span class="uname-wrap" v-text="userName"></span>
              <i class="el-icon-caret-bottom" style="color: #bfcbd9;margin-left: 5px;"></i>
            </el-button>
            <router-link to="/Settings/General" tag="div">
              <div class="pop-user-item">设置</div>
            </router-link>
            <router-link to="/Help/Register" tag="div">
              <div class="pop-user-item">帮助</div>
            </router-link>
          </el-popover>
        </div>
        <div class="user-info-item" v-if="isLogged === false" @click="redirectToRegister">
          <el-button type="text" class="uname-btn"><span class="uname-wrap">注册</span></el-button>
        </div>
        <div class="user-info-item">
          <el-popover popper-class="pop-lang" ref="langPop">
            <el-button type="text" slot="reference">
              <img height="16" :src="langIcon[currentLangIndex].url" alt="language" class="img-icon">
            </el-button>
            <div class="pop-lang-item"
                 @click="changeLang(item.value,idx)"
                 :key="idx"
                 v-for="(item,idx) in langIcon">
              <img width="18" :src="item.url">
              <span v-text="item.text"></span>
            </div>
          </el-popover>
        </div>
        <div class="user-info-item">
          <el-button type="text" class="notice">
            <router-link to="/News/Notice" tag="div">
              <div>
                <i class="isNewNotice" v-show="isNewNotice"></i>
                <img :src="require('@/assets/img/icon-inform.png')">
              </div>
            </router-link>
          </el-button>
        </div>
        <div class="user-info-item">
          <pwd-comp title="账号解锁"
                    v-if="accountLocking"
                    @getPwd="unlockAccount"
                    text="您正在解锁账号，解锁后任何操作将不再需要验证密码，您可在用户设置中设置解锁时长。">
            <img height="16" :src="lockIcon" alt="解锁" class="img-icon">
          </pwd-comp>
          <div v-else @click="lockAccount">
            <img height="16" :src="unlockIcon" alt="锁定" class="img-icon">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Menu, MenuItem, Popover, Button, Message} from 'element-ui'
  import Vue from 'vue'
  [Menu, MenuItem, Popover, Button].forEach(comp => { Vue.use(comp) })
  import PwdComp from '@/components/RedoPwdComp.vue'
  import {mapState, mapGetters} from 'vuex'
  import resCodeTip from '@/assets/js/resCodeMap'

  export default {
    name: 'navBar',
    data () {
      return {
        navOptions: [
          {name: '账户', path: '/Account'},
          {name: '转账', path: '/Transfer'},
          {name: '交易', path: '/Trade'},
          {name: '提现 / 兑换', path: '/Financing'},
          {name: '资讯', path: '/News/Information'}
        ],
        langIcon: [
          {
            url: require('@/assets/img/us.png'),
            text: 'English',
            value: 'en-US'
          }, {
            url: require('@/assets/img/cn.png'),
            text: '中文',
            value: 'zh-CN'
          }, {
            url: require('@/assets/img/id.png'),
            text: 'Indonesian',
            value: 'id-ID'
          }
        ],
        currentLangIndex: 1,
        lockIcon: require('@/assets/img/look.png'),
        unlockIcon: require('@/assets/img/unlock.png'),
        isNewNotice: true
      }
    },
    components: {
      PwdComp
    },
    computed: {
      defaultActivedTab () {
        switch (this.$route.name) {
          case 'Home':
            return '/'
          case 'Summary':
          case 'PwdModify':
          case 'Security':
          case 'Pocket':
          case 'sshSetting':
            return '/Account'
          case 'Transfer':
            return '/Transfer'
          case 'Trade':
            return '/Trade'
          case 'Financing':
            return '/Financing'
        }
      },
      ...mapState({
        isLogged: state => state.isLogged,
        accountLocking: state => state.accountLocking,
        UnLockOption: state => state.UnLockOption,
        theme: state => state.theme
      }),
      ...mapGetters([
        'userName'
      ])
    },
    methods: {
      changeLang (lang, idx) {
        console.log(this.$i18n)
        this.currentLangIndex = idx
        this.$i18n.locale = lang
        this.$refs.langPop.showPopper = false
      },
      changeTheme (theme, idx) {
        this.$i18n.locale = theme
        this.$refs.langPop.showPopper = false
      },
      redirectToRegister () {
        this.$router.push('/Register')
      },
      async unlockAccount (pwd) {
        let {code} = await this.$store.dispatch('unlockAccount', pwd)
        if (code === 'StatusOk') {
          Message.success(`已解锁账号，自动锁定时间为${this.UnLockOption.times || '1小时'}`)
        } else {
          Message.warning(resCodeTip[code] || '操作失败')
        }
      },
      async lockAccount () {
        let {code} = await this.$store.dispatch('lockAccount')
        if (code === 'StatusOk') {
          Message.success(`已锁定账号`)
        } else {
          Message.warning(resCodeTip[code] || '操作失败')
        }
      }
    }
  }
</script>

<style>
  .isNewNotice{
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #f00;
    position: absolute;
    right: 6px;
  }
  .notice ,.notice span{
    width: 18px;
    height: 16px;
    display: inline-block;
  }
  .notice img{
    position: absolute;
    top: 16px;
    right: 0;
    margin: 0 10px;
    width: 18px;
    height: 16px;
  }
  .navbar-wrap {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    /*box-shadow: 0 1px 2px #0e244d;*/
    /*background-color: #0e244d;*/
    box-sizing: border-box;
    z-index: 1;
  }

  #navbar {
    float: left;
  }

  #navbar .navbar-item {
    height: 50px;
    line-height: 50px;
    transition: .3s;
  }

  .navbar-logo {
    position: relative;
    bottom:2px;
  }

  #navbar .navbar-item.is-active {
    color: #ddd;
    box-shadow: 0 0 10px #000;
    font-weight: bold;
    z-index:1;
  }

  .user-info {
    float: right;
    color: #bfcbd9;
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
  }

  .user-info-item {
    position: relative;
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    transition: .2s;
    bottom: 0;
    text-shadow: none;
  }

  .user-info-item:hover {
    bottom: 3px;
  }
  .uname-wrap{
    color: #bfcbd9;
    font-size: 16px;
  }

  .img-icon {
    position: relative;
    top: 2px;
  }

  .pop-user{
    min-width: 55px;
    height:65px;
    text-align: center;
  }
  .pop-user-item{
    font-size: 14px;
    line-height: 20px;
    padding:6px 0;
    cursor: pointer;
    transition: .1s;
  }
  .pop-user-item:hover{
    color: dodgerblue;
    font-size: 16px;
  }
  .pop-lang{
    min-width:80px;
    text-align: left;
  }
  .pop-lang-item{
    cursor: pointer;
    line-height: 20px;
    vertical-align: middle;
    padding:5px 0;
  }
  .pop-lang-item img{
    position: relative;
    top:4px;
    margin-right:2px;
  }
  .pop-lang-item:hover{
    color: dodgerblue;
  }
</style>

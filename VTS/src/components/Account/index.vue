<template>
  <div>
    <div id="account-nav">
      <div class="avatar">
        <img width="100" height="100" src="/static/img/avatar.png" alt="" class="avatar-img">
        <div class="uname" v-text="userName"></div>
        <div class="transfer-btn">
          <router-link  to="/Transfer" tag="span">
            <span class="trasfer-link">转账</span>
          </router-link>
        </div>
      </div>

      <div class="account-nav-item" v-for="(item,idx) in accountNavOption" @click="transUrl(idx)">
        <router-link :to="item.path" tag="div" v-text="item.text" class="account-item-text"  :class="{active:item.active===true}">
        </router-link>
      </div>

      <div class="high-set">
        <div class="transfer-btn" @click="toggleHighSet">
          高级设定&nbsp;&nbsp;|&nbsp;&nbsp;<i class="el-icon-caret-bottom append-icon"></i>
        </div>
      </div>
      <div v-show="highSetShow">
        <div class="account-nav-item" @click="transUrl('sshSetting')">
          <router-link to="/Account/sshSetting" tag="div" class="account-item-text" :class="{isSshSetting: isSshSetting === true}">
            备注密匙
          </router-link>
        </div>
      </div>
    </div>
    <div id="account-page-content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        accountNavOption: [
          {
            text: '资产',
            path: '/Account',
            active: false
          }, {
            text: '密码',
            path: '/Account/PwdModify',
            active: false
          }, {
            text: '安全',
            path: '/Account/Security',
            active: false
          }
        ],
        highSetShow: true,
        isSshSetting: false
      }
    },
    computed: {
      ...mapGetters([
        'userName'
      ])
    },
    watch: {
      '$route' (newVal, oldVal) {
        if (newVal.path === '/Account') {
          this.curPage()
        }
      }
    },
    beforeRouteEnter: (to, from, next) => {
      next(vm => {
        vm.$store.dispatch('changeTheme', ' ')
      })
    },
    methods: {
      toggleHighSet () {
        this.highSetShow = !this.highSetShow
      },
      transUrl (index) {
        this.accountNavOption.forEach(function (item) {
          item.active = false
        })
        if (index === 'sshSetting') {
          this.isSshSetting = true
        } else {
          this.isSshSetting = false
          this.accountNavOption[index].active = true
        }
      },
      curPage () {
        let url = this.$route.path
        this.isSshSetting = false
        this.accountNavOption.forEach(function (item) {
          item.active = false
        })
        if (url === '/Account/sshSetting') {
          this.isSshSetting = true
          this.highSetShow = true
        } else {
          this.accountNavOption.forEach(function (item) {
            if (item.path === url) {
              item.active = true
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  #account-nav {
    /*background-color: #0e244d;*/
    width: 190px;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    padding: 60px 20px 0;
    overflow-y: auto;
    box-sizing: border-box;
  }

  #account-page-content {
    padding-left: 190px;
    box-sizing: border-box;
  }

  .account-nav-item {
    padding: 10px 0 8px;
    border-bottom: 1px solid gray;
    color: #ddd;
  }

  .account-item-text {
    padding: 0 15px;
    cursor: pointer;
  }
  .account-item-text:hover{
    color: tan;
  }
  .account-item-text.active, .account-item-text.isSshSetting{
    color:#000;
    background-color: tan !important;
  }
  .is-link{
    cursor: pointer;
  }
  .is-link:active{
    color:#000;
    background-color: tan !important;
  }
  .avatar {
    text-align: center;
    margin:15px 0 30px;
  }
  .avatar-img{
    border-radius: 50%;
  }

  .transfer-btn {
    display: block;
    cursor: pointer;
    margin: 0 15px;
    padding: 5px 0;
    color: #ddd;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .transfer-btn:hover {
    color: tan;
    border-color: tan;
  }

  .uname {
    margin: 12px 0;
    height: 18px;
  }

  .high-set {
    text-align: center;
    margin: 50px 0 15px;
  }

  .append-icon {
    position: relative;
    top: 3px;
  }

  .trasfer-link{
    display: block;
    color: #ffffff;
    text-decoration: none;
    cursor: pointer;
  }
  .trasfer-link:hover{
    color: tan;
  }
</style>

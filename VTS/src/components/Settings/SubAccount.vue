<template>
  <div>
    <div class="generalBox">
      <div class="f-s-20 p-lr-10">子账号</div>
      <div class="setting-subTitle p-lr-10">账号切换 / 创建</div>
<div v-if="true">
  <div class="p-lr-10">
    <span v-if="!currentSelectProfileName || currentSelectProfileName === currentProfileName">当前账号使用中</span>
    <span v-else-if="currentSelectProfileName !== 'VTS_Default'">切换到子账号</span>
    <span v-else>切换到主账号</span>
  </div>
  <div class="ps-relative">
    <div class="m-t-18 borderBottom p-lr-10 cursor-pointer">
      <div @click="toggleDropDownList">
        <span class="f-s-20" v-text="selectedText"></span>
        <img :src="require('@/assets/img/dropDownArrow.png')" class="setting-dropDownArrow">
      </div>
    </div>
    <div class="dropDownBox" :style="{ background: theme.color}" v-show="dropdownShow">
      <div class="dropDownItem"
           v-for="filename in subAccountList"
           v-text="filename === 'VTS_Default'?'主账号':filename"
           @click="toggleSelect(filename)">
      </div>
    </div>
  </div>
  <div class="subAccount">
    <pwd-comp @getPwd="switchSub" :require-input="true" title="切换子账号">
      <button v-show="currentSelectProfileName && currentSelectProfileName !== currentProfileName"
              style="margin-right: 15px;"
              v-loading="loading.switchSub">确认切换</button>
    </pwd-comp>

    <button @click="toggleDialog"
            v-if="currentProfileName === 'VTS_Default'"
            class="create-btn">创建子账户</button>
  </div>
</div>
      <div v-else>
        此功能模块正在加紧筹划和建设，暂不能使用。给您造成了不便，请谅解。
      </div>

      <el-dialog title="创建子账号"
                 :close-on-click-modal="false"
                 :visible.sync="dialogTableVisible">
        <div v-loading="loading.createSub">
          <el-input type="text" placeholder="创建昵称" v-model="createProfilename"></el-input>
          <div class="input-divider"></div>
          <el-input type="password" placeholder="创建密码" v-model="createPwd"></el-input>
          <div class="input-divider"></div>
          <el-input type="password" placeholder="确认密码" v-model="checkPwd"></el-input>
          <div class="input-divider"></div>
          <el-button type="primary" plain @click="createSub">创建子账号</el-button>
        </div>
      </el-dialog>
    </div>
    </div>

</template>

<script>
  import PwdComp from '../RedoPwdComp.vue'
  import {mapState, mapGetters} from 'vuex'
  import axios from '@/axios'
  import Vue from 'vue'
  import {Message, Input, Dialog, Notification} from 'element-ui'
  [Input, Dialog].forEach(comp => {
    Vue.use(comp)
  })
  export default {
    components: {
      PwdComp
    },
    data () {
      return {
        createProfilename: '',
        createPwd: '',
        checkPwd: '',
        dialogTableVisible: false,
        currentSelectProfileName: '',
        dropdownShow: false,
        parentAccountList: [],
        loading: {
          createSub: false,
          swhichsub: false
        }
      }
    },
    computed: {
      subAccountList () {
        return Object.keys(this.bigAccount)
      },
      selectedText () {
        if (!this.currentSelectProfileName) {
          return this.currentProfileName === 'VTS_Default'
            ? '主账号'
            : this.currentProfileName
        } else {
          return this.currentSelectProfileName === 'VTS_Default'
            ? '主账号'
            : this.currentSelectProfileName
        }
      },
      ...mapState({
        bigAccount: state => state.bigAccount,
        theme: state => state.theme
      }),
      ...mapGetters([
        'currentCid',
        'currentProfileName'
      ])
    },
    watch: {
      currentProfileName (newVal) {
        this.currentSelectProfileName = newVal
      }
    },
    methods: {
      toggleDialog () {
        this.dialogTableVisible = !this.dialogTableVisible
      },
      toggleDropDownList () {
        this.dropdownShow = !this.dropdownShow
      },
      toggleSelect (filename) {
        this.currentSelectProfileName = filename
        this.dropdownShow = false
      },
      async createSub () {
        if (this.checkPwd !== this.createPwd) {
          Message.warning('两次密码输入不同，请检查重试。')
          return false
        } else if (this.createProfilename.indexOf('/') !== -1) {
          Message.warning('昵称不可包含‘/’字符，请重新设置。')
          return false
        }
        this.loading.createSub = true
        let res = await axios.post('/Account/Register', `Password=${this.createPwd}&ProfileName=${this.createProfilename}&Username=''`)
        if (res.data.code === 'StatusOk') {
          let account = res.data.data
          let bigAccount = this.bigAccount
          bigAccount[this.createProfilename] = account
          await Promise.all([
            window.webStore.setItem(this.currentCid, bigAccount),
            window.webStore.setItem('currentProfile', `${this.currentCid}/${this.createProfilename}`)
          ])
          this.$store.dispatch('getAccountData')
          let _this = this
          Notification.warning({
            title: '需备份子账号',
            message: `已为您成功创建子账号${this.createProfilename}。
            本平台由于分布式与去中心化设定，主账号与子账号分别独立，恢复主账号时不会一同恢复子账号，需单独导入备份文件。
            为确保你的资金安全，请您及时下载此子账号备份文件并妥善保管。`,
            duration: 0,
            onClose () {
              _this.$router.push('/Settings/Backup')
              setTimeout(() => { window.location.reload() }, 100)
//              window.location.reload()
            }
          })
        } else {
          let tipMsg
          switch (res.data.code) {
            case 'PermissionRequired':
              tipMsg = `当前账号${this.currentSelectProfileName}非主账号，不可创建子账号，请切换到主账号再创建。`
              break
            case 'ProfileCountLimited':
              tipMsg = `您的子账号数量已达到上限，不可再创建。`
              break
            default:
              tipMsg = '创建失败，请您稍后再试。'
              break
          }
          Message.error(tipMsg)
        }
        this.createPwd = ''
        this.createProfilename = ''
        this.checkPwd = ''
        this.loading.createSub = false
        this.dialogTableVisible = false
      },
      async switchSub (pwd) {
        if (this.currentSelectProfileName === this.currentProfileName) {
          return false
        }
        let profilename = this.currentSelectProfileName
        let account = this.bigAccount[profilename]
        this.loading.switchSub = true
//        SwithProfile(string Password,string SaltKey,string UnuniqueCid, string ProfileName)
        let res = await axios.post('/Account/SwithProfile', `Password=${pwd}&SaltKey=${account.SaltKey}&UnuniqueCid=${account.UnuniqueCid}&ProfileName=${profilename}`)
        if (res.data.code === 'StatusOk') {
          await window.webStore.setItem('currentProfile', `${this.currentCid}/${profilename}`)
          profilename === 'VTS_Default'
            ? Message.success('已切换到主账号')
            : Message.success('已切换到子账号' + profilename)
          setTimeout(() => { window.location.reload() }, 2000)
        } else if (res.data.code === 'PasswordNotMath') {
          Message.error(`${this.currentSelectProfileName}账户密码不正确。`)
        } else {
          Message.error(`${this.currentSelectProfileName}账号切换不成功，请您稍后再试。`)
        }
        this.loading.switchSub = false
      }
    }
  }
</script>

<style scoped>
  .generalBox{
    width: 610px;
    margin: 0 auto 20px;
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
  .subAccount{
    margin: 60px 0 0 10px;
  }
  .subAccount button{
    width: 130px;
    height: 44px;
    border-radius: 4px;
    background: transparent;
    border: 1px solid #fff;
    color: #fff;
    cursor: pointer;
  }
  .create-btn{
    background-color: #ffffff !important;
    color: #143d5f !important;
  }
  .input-divider{
    margin:20px 0;
  }
</style>

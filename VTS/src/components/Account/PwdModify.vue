<template>
  <div class="padModify">
      <div class="title_split">
        <span v-text="$t('修改密码')"></span>
        <span class="f-s-12">（修改后之前备份的钱包文件将全部失效，请务必重新备份保存！）</span>
      </div>
      <div class="padItem">
        <div class="padItem-itemType" v-text="$t('旧密码')"></div>
        <div class="m-t-10">
          <input type="password" autofocus :class="{'border-red':passwordBoxTips.oldPasswordTips}" v-model="postData.OldPassword" :placeholder="$t('旧密码')" @keyup="checkValue('OldPassword')">
        </div>
        <div class="m-t-4 c-6eebf3 f-s-10" v-show="passwordBoxTips.oldPasswordTips">请输入旧密码</div>
      </div>
      <div class="padItem">
        <div class="padItem-itemType" v-text="$t('新密码')"></div>
        <div class="m-t-10">
          <input type="password" :class="{'border-red':passwordBoxTips.newPasswordTips}" :placeholder="$t('新密码')" v-model="postData.NewPassword" @keyup="checkValue('NewPassword')">
        </div>
        <div class="padModify-pwdLevel" v-show="postData.NewPassword">
          <div class="pwdLevel-weak" v-show="pwdLevel.lev==='weak'">weak</div>
          <div class="pwdLevel-normal" v-show="pwdLevel.lev==='normal'">normal</div>
          <div class="pwdLevel-strong" v-show="pwdLevel.lev==='strong'">strong</div>
        </div>
        <div class="m-t-4 c-6eebf3 f-s-10" v-show="passwordBoxTips.newPasswordTips">请输入新密码</div>
      </div>
      <div class="padItem">
        <div class="padItem-itemType" v-text="$t('确认新密码')"></div>
        <div class="m-t-10">
          <input type="password" :class="{'border-red':passwordBoxTips.confirmPasswordTips}" v-model="postData.ConfirmPassword" :placeholder="$t('确认新密码')" @keyup="checkValue('ConfirmPassword')">
        </div>
        <div class="m-t-4 c-6eebf3 f-s-10" v-show="passwordBoxTips.confirmPasswordTips">请确认新密码</div>
      </div>
      <div class="padItem">
        <el-button class="padModify-btn"
                @click="changePassword"
                :loading="loading.pwdModify"
                v-text="$t('修改密码')"></el-button>
      </div>

    <div class="padModifyMessageWrap" v-show="isShowMessage">
      <div class="padModifyMessageBox">
        <!--<i class="el-icon-close" @click="closeMessageBox"></i>-->
        <div class="padModifyMessageTitle">《免责声明》</div>
        <div class="padModifyMessageContent">
          <div>威特金融帝国是全球首创用户数据分布式存储，资产去中心化的金融游戏系统，密码一经修改即视为认可和接受本声明所有条款。</div>
          <div class="c-333">一、修改密码声明</div>
          <div>为了保障您账户资产的安全，请设置8位数以上的英文+数字作为您账户的新密码，同时不要把您的密码透露给任何人，以免造成损失。
            如因个人原因忘记或泄露密码导致的损失，由用户自身承担所有责任！</div>
          <div class="c-333">二、秘钥下载声明</div>
          <div>由于所有用户数据都是属于分布式储存，用户修改密码的同时秘钥被重新定义，资产默认转移至新秘钥上储存，
            您需要重新下载备份您的新秘钥（设置--备份/导入--为账户:
            <router-link to="/Settings/Backup" tag="a" class="c-1da1f3">
              创建备份
            </router-link>）并使用新秘钥和新密码登录，请不要把您的秘钥泄露给任何人，以免造成损失。
            如因个人原因忘记下载备份或泄露新秘钥导致的损失，由用户自身承担所有的责任！</div>
          <div class="c-333">三、修改流程</div>
          <div>请参考：帮助中心--
            <router-link to="/Account/PwdModify" tag="a" class="c-1da1f3">
              修改密码
            </router-link>和
            <router-link to="/Settings/Backup" tag="a" class="c-1da1f3">
              创建备份
            </router-link>。
          </div>
          <div class="c-333">四、声明修改</div>
          <div>威特金融帝国具有该声明修订、更新、补充的权利。</div>
        </div>
        <div class="padModifyMessageBottom">
          <el-checkbox v-model="isAccept">我已同意《免责声明》并接受此认定书</el-checkbox>
        </div>
        <div class="padModifyMessageBtnBox">
          <button @click="acctpt" :class="{noAcctpt:isAccept === false}">接受</button>
          <button @click="closeMessageBox">放弃</button>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  import {Message, Notification, Button, Checkbox} from 'element-ui'
  import axios from 'axios'
  import {mapState, mapGetters} from 'vuex'
  import Vue from 'vue'
  [Button, Checkbox].forEach(comp => { Vue.use(comp) })
  export default {
    name: 'pwdModify',
    data () {
      return {
        postData: {
          OldPassword: '',
          NewPassword: '',
          ConfirmPassword: ''
        },
        passwordBoxTips: {
          oldPasswordTips: false,
          newPasswordTips: false,
          confirmPasswordTips: false
        },
        pwdLevel: {
          lev: ''
        },
        regArray: {
          strongPassword: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,}$/,
          normalPassword: /^(?![^a-zA-Z]+$)(?!\D+$)/
        },
        isAccept: false,
        isShowMessage: true,
        loading: {
          pwdModify: false
        }
      }
    },
    beforeRouteEnter: (to, from, next) => {
      next(vm => {
        vm.open()
        vm.$store.dispatch('changeTheme', ' ')
      })
    },
    computed: {
      ...mapState({
        bigAccount: state => state.bigAccount,
        currentAccountData: state => state.currentAccountData
      }),
      ...mapGetters([
        'currentCid',
        'currentProfileName'
      ])
    },
    methods: {
      validateValue (check, value) {
        return this.regArray[check].test(value)
      },
      checkValue (obj) {
        switch (obj) {
          case 'OldPassword':
            this.passwordBoxTips.oldPasswordTips = false
            break
          case 'NewPassword':
            this.passwordBoxTips.newPasswordTips = false
            if (this.postData.NewPassword) {
              if (this.validateValue('strongPassword', this.postData.NewPassword) === true) {
                this.pwdLevel.lev = 'strong'
              } else {
                if (this.validateValue('normalPassword', this.postData.NewPassword) === true) {
                  this.pwdLevel.lev = 'normal'
                } else {
                  this.pwdLevel.lev = 'weak'
                }
              }
            }
            break
          case 'ConfirmPassword':
            this.passwordBoxTips.confirmPasswordTips = false
            break
        }
      },
      async changePassword () {
        var _this = this
        if (!this.postData.OldPassword) {
          this.passwordBoxTips.oldPasswordTips = true
        }
        if (!this.postData.NewPassword) {
          this.passwordBoxTips.newPasswordTips = true
        }
        if (!this.postData.ConfirmPassword) {
          this.passwordBoxTips.confirmPasswordTips = true
          return
        }
        if (this.postData.NewPassword !== this.postData.ConfirmPassword) {
          Message.warning('两次输入的密码不一致')
          return
        }
        if (this.postData.NewPassword === this.postData.OldPassword) {
          Message.warning('新密码和旧密码不能相同')
          return
        }
        if (this.pwdLevel.lev === 'weak') {
          Message.warning('密码长度最低8位且包含英文字母和数字')
          return
        }
        this.loading.pwdModify = true
        await axios.post('/Account/ChangePassword', {
          OldPassword: this.postData.OldPassword,
          NewPassword: this.postData.NewPassword
        }).then(async response => {
          switch (response.data.code) {
            case 'StatusOk':
              this.bigAccount[this.currentProfileName].SaltKey = response.data.data
              window.$.connection.hub.stop()
              await Promise.all([
                window.webStore.setItem(this.currentCid, this.bigAccount),
                window.webStore.setItem('currentProfile', `${this.currentCid}/${this.currentProfileName}`),
                axios.post('/Account/SignIn'),
                window.$.connection.hub.start()
              ])
              Message({
                type: 'success',
                message: '修改密码成功'
              })
              _this.postData = {
                OldPassword: '',
                NewPassword: '',
                ConfirmPassword: ''
              }
              // let profilename = this.currentProfileName === 'VTS_Default' ? '主账号' : this.currentProfileName
              Notification.warning({
                title: '需要重新备份钱包文件',
                message: `您已成功修改账户密码，钱包文件已自动更新，请下载保存新的钱包文件！旧钱包文件已失效，建议删除！`,
                duration: 0,
                onClose () {
                 // _this.$router.push('/Settings/Backup')
                }
              })
              _this.$router.push('/Settings/Backup')
              break
            case 'PasswordNotMath':
              Message({
                type: 'warning',
                message: '旧密码输入错误'
              })
              break
            default:
              Message({
                type: 'error',
                message: '修改密码失败'
              })
          }
          this.loading.pwdModify = false
        }, response => {
          // error callback
        })
      },
      closeMessageBox () {
        this.isShowMessage = false
        this.$router.push('/Account')
      },
      open () {
        this.isShowMessage = true
        this.isAccept = false
      },
      acctpt () {
        if (this.isAccept) {
          this.isShowMessage = false
        }
      }
    }
  }
</script>

<style scoped>
  .noAcctpt{
    background-color: #ccc !important;
    cursor: default !important;
  }
  .el-icon-close{
    position: absolute;
    top: 22px;
    right: 34px;
    font-size: 18px;
    color: #999;
    cursor: pointer;
  }
  .letter-spacing-12 {
    letter-spacing: 12px;
  }
  .c-6eebf3{
    color: #6eebf3;
  }
  .padModify {
    font-size: 14px;
    color: #fff;
    width: 80%;
    max-width: 845px;
    min-width: 500px;
    margin: 100px auto 20px;
  }
  .m-t-4{
    margin-top: 4px;
  }
  .m-t-10 {
    margin-top: 10px;
  }
  .f-s-12{
    font-size: 12px !important;
  }
  .title_split {
    width: 100%;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, .3);
  }

  .title_split span {
    font-size: 20px;
  }

  .padItem {
    margin-top: 30px;
  }

  .padItem-itemType {
    font-size: 12px;
  }

  .padModify-pwdLevel {
    margin-top: 10px;
  }

  .padItem input {
    width: 400px;
    height: 40px;
    background-color: #ffffff;
    box-sizing: border-box;
    font-size: 12px;
    padding-left: 10px;
    border-radius: 4px;
    border: none;
  }

  .padModify-btn {
    width: 160px;
    height: 52px;
    border-radius: 3px;
    background-color: #ffffff;
    font-size: 16px;
    color: #143d5f;
    border: none;
    cursor: pointer;
  }

  .padModify-pwdLevel {
    width: 400px;
    position: relative;
    height: 18px;
    background-color: #bfcbd9;
  }

  .padModify-pwdLevel div {
    position: absolute;
    height: 100%;
    text-align: center;
    font-size: 12px;
    color: #fff;
    box-sizing: border-box;
    line-height: 18px;
  }

  .pwdLevel-weak {
    width: 33%;
    background: red;
  }

  .pwdLevel-normal {
    width: 50%;
    background-color: #1da1f3;
  }

  .pwdLevel-strong {
    width: 66%;
    background: green;
  }
  .padModifyMessageWrap{
    z-index: 999;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    box-sizing: border-box;
  }
  .padModifyMessageBox {
    background-color: #fff;
    width: 874px;
    height: 400px;
    border-radius: 8px;
    box-sizing: border-box;
    position: absolute;
    top:50%;
    left:50%;
    margin: -200px 0 0 -390px;
    padding: 0 24px;
    box-shadow: 2px 2px 6px #fff
  }
  .padModifyMessageTitle{
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    color: #1da1f3;
    margin: 34px 0 10px 0;
  }
  .padModifyMessageContent {
    padding: 14px 10px;
    color: #333333;
    font-size: 14px;
    width: 834px;
    height: 241px;
    border: solid 1px #999999;
    box-sizing: border-box;
    overflow-y: scroll;
    text-align: left;
  }
  .c-333{
    color: #333;
    margin: 18px 0 8px 0;
    font-size: 16px;
    font-weight: bold;
  }
  .c-1da1f3{
    color: #1da1f3;
    text-decoration: none;
  }
  .padModifyMessageBottom{
    color: #666;
    font-size: 12px;
    text-align: left;
    margin-top: 10px;
  }
  .padModifyMessageBtnBox{
    margin-top: 14px;
  }
  .padModifyMessageBtnBox button{
    width: 100px;
    height: 30px;
    border-radius: 3px;
    background-color: #1da1f3;
    border: none;
    color: #fff;
    cursor: pointer;
  }
  .padModifyMessageBtnBox button:nth-of-type(1){
    margin-right: 30px;
  }
</style>

<style>
  .padModifyMessageBtnBox .el-checkbox__inner::after{
    height: 4px;
    left: 1px;
  }
  .padModifyMessageBtnBox .el-checkbox__inner{
    width: 10px;
    height: 10px;
    border-radius: 2px;
  }
</style>

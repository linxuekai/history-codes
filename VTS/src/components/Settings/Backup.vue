<template>
  <div>
    <div class="generalBox">
      <div class="f-s-20 p-lr-10">备份 / 导入</div>
      <div class="setting-subTitle p-lr-10 of-auto">
        创建子账号备份、导入恢复子账号
      </div>

      <div class="h-40 p-l-10">
        <div class="tit">
          创建子账号备份
        </div>
        <div class="poketBackup">
          <div @click="toggleDropDown" class="h-40">
            <span class="selTxt" v-text="curItem==='VTS_Default'?'主账号':curItem"></span>
            <i class="el-icon-caret-bottom"></i>
          </div>
          <div class="generalBoxDropDown" v-show="isShowItem===true">
            <div class="ddItem" v-for="profile in itemData" @click="chooseItm(profile)" v-text="profile==='VTS_Default'?'主账号':profile"></div>
          </div>
        </div>
      </div>

      <div class="backupTips p-l-10">
        <pre>备份文件储存账户所有数据和资产，方便您在不同浏览器或者设备上进行
导入登录（其作用相当于账号作用）；如您更改密码，该备份文件也被重
新定义，需要重新下载备份文件。</pre>
      </div>

      <div class="backupBtn p-l-10">
        <pwd-comp :require-input="true"
                  title="备份钱包"
                  @getPwd="backup"
                  text="下载钱包备份文件后请妥善保管，如有更改账号密码等资料，此备份文件将失效，须重新备份！">
          <button class="backup-btn">为子账号(<span v-text="curItem==='VTS_Default'?'主账号':curItem"></span>)创建备份</button>
        </pwd-comp>
      </div>
      <div class="recover-btn-wrap">
        <recover-button>
          <el-button type="info" size="large">恢复备份 / 导入账号</el-button>
        </recover-button>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from '@/axios'
  import RecoverButton from '../RecoveryButton.vue'
  import PwdComp from '../RedoPwdComp.vue'
  import '@/assets/js/FileSaver'
  import {add0before1Num} from '@/assets/js/toolsFun'
  import {json2FormData} from '@/assets/js/object2FormData'
  import {Message} from 'element-ui'
  import {mapState, mapGetters} from 'vuex'
  export default {
    components: {
      RecoverButton,
      PwdComp
    },
    async beforeRouteLeave (to, from, next) {
      let {data: {code, data: {RequriedSync}}} = await axios.post('/Account/IsSync')
      if (code === 'StatusOk' && RequriedSync === true) {
        alert('危险！您已更改了此账号密码并未进行备份，请先下载账户备份文件，才可访问并操作其他页面！')
      } else {
        next()
      }
    },
    data () {
      return {
        curItem: '',
        isShowItem: false
      }
    },
    computed: {
      itemData () {
        return Object.keys(this.bigAccount)
      },
      ...mapState({
        connReady: state => state.connReady,
        bigAccount: state => state.bigAccount
      }),
      ...mapGetters([
        'currentProfileName'
      ])
    },
    watch: {
      currentProfileName (newVal) {
        this.curItem = newVal
      }
    },
    methods: {
      toggleDropDown () {
        this.isShowItem = !this.isShowItem
      },
      chooseItm (profile) {
        this.curItem = profile
        this.isShowItem = false
      },
      async backup (pwd) {
        let res = await axios.post('/Account/TakeBackUp', json2FormData({
          Password: pwd,
          SaltKey: this.bigAccount[this.curItem].SaltKey,
          UnuniqueCid: this.bigAccount[this.curItem].UnuniqueCid,
          ProfileName: this.curItem
        }))
        if (res.data.code === 'StatusOk') {
          let Content = res.data.data.Content
          let FileName = `vts_backup_${this.curItem}`
          let date = new Date()
          FileName += date.getFullYear() +
            add0before1Num(date.getMonth() + 1) +
            add0before1Num(date.getDate()) +
            add0before1Num(date.getHours()) +
            add0before1Num(date.getMinutes()) +
            add0before1Num(date.getSeconds()) +
            '.txt'
          window.saveTextAs(Content, FileName, 'utf-8')
          Message.success(`已为您下载 ${this.curItem} 备份文件，请妥善保管。`)
        } else if (res.data.code === 'PasswordNotMath') {
          Message.error(`${this.curItem}子账户密码不正确。`)
        } else {
          Message.error(`很抱歉，备份失败，请您稍后再试。`)
        }
      }
    },
    created () {
      this.curItem = this.currentProfileName
    }
  }
</script>

<style scoped>
  .recover-btn-wrap{
    margin-top: 40px;
    display: inline-block;
    float: right;
    line-height: 28px;
  }
  .generalBox{
    width: 610px;
    margin: 0 auto 100px;
    font-family: "Microsoft YaHei", sans-serif !important;
    font-size: 14px;
    color: #ffffff;
    box-sizing: border-box;
  }
  .of-auto{
    overflow: auto;
  }
  .p-l-10{
    padding-left: 10px;
  }
  .h-40{
    height: 40px;
  }
 .poketBackup{
   float: left;
   width: 60%;
   height: 40px;
   border-radius: 3px;
   background-color: #ffffff;
   margin-left: 20px;
   position: relative;
 }
  .tit{
    float: left;
    height: 40px;
    line-height: 40px;
  }
  .selTxt{
    font-size: 20px;
    color: #143d5f;
    position: absolute;
    top:5px;
    left: 18px;
  }
  .el-icon-caret-bottom{
    font-size: 12px;
    color: #143d5f;
    position: absolute;
    top:16px;
    right: 18px;
  }
  .generalBoxDropDown{
    color: #fff;
    position: absolute;
    background: #fff;
    top: 41px;
    width:100%;
    box-sizing: border-box;
    padding-bottom: 4px;
  }
  .ddItem{
    font-size: 18px;
    color: #143d5f;
    cursor: pointer;
    padding: 4px 18px 0 18px;
  }
  .ddItem:hover{
    background: #d9d9d9;
  }
  .backupTips{
    clear: both;
    margin-top: 44px !important;
    line-height: 1.5;
    letter-spacing: 1px;
  }
  .backupBtn{
    margin-top: 28px;
  }
  .backup-btn:hover{
    color: dodgerblue;
    border:dodgerblue;
    box-shadow: 0 0 10px gray;
  }
  .backupBtn button{
    padding: 0 16px;
    height: 40px;
    border-radius: 3px;
    background-color: #ffffff;
    color: #143d5f;
    border: none;
    cursor: pointer;
  }
</style>



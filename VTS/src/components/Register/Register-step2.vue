<template>
  <div>
    <div class="register-form">
      <div class="register-step" v-text="$t('第二步：创建备份')"></div>
      <div v-if="!backupReady">
        <el-button class="btn-backup" @click="backupEnter" v-text="$t('为钱包（VC钱包）创建备份')"></el-button>
        <div class="backup-tip" v-text="$t('钱包尚未备份')"></div>
      </div>
      <div v-else>
        <div class="file-desc" v-text="backupFileName"></div>
        <el-button class="btn-dl" @click="backupSave" v-text="$t('下载')"></el-button>
      </div>
    </div>
    <div class="register-desc">
      <h3 v-text="$t('需要备份')"></h3>
      <p v-text="$t('rgisterStep2p1')"></p>
      <p v-text="$t('rgisterStep2p2')"></p>
      <p v-text="$t('rgisterStep2p3')"></p>
    </div>
  </div>
</template>

<script>
  import '@/assets/js/FileSaver'
  import {add0before1Num} from '@/assets/js/toolsFun'
  import {json2FormData} from '@/assets/js/object2FormData'
  import axios from '@/axios'

  import {Button} from 'element-ui'
  import Vue from 'vue'
  [Button].forEach(comp => {
    Vue.use(comp)
  })

  export default {
    beforeRouteLeave (to, from, next) {
      this.$store.commit('storeTempPwd', '')
      next()
    },
    data () {
      return {
        backupReady: false,
        backupFileName: 'vts_backup.txt'
      }
    },
    methods: {
      backupEnter () {
        this.backupReady = true
        let FileName = 'vts_backup_'
        let date = new Date()
        FileName += date.getFullYear() +
          add0before1Num(date.getMonth() + 1) +
          add0before1Num(date.getDate()) +
          add0before1Num(date.getHours()) +
          add0before1Num(date.getMinutes()) +
          add0before1Num(date.getSeconds()) +
          '.txt'
        this.backupFileName = FileName
      },
      async backupSave () {
        let {SaltKey, UnuniqueCid, profilename} = this.$store.state.currentAccountData
        let res = await axios.post('/Account/TakeBackUp', json2FormData({
          Password: this.$store.state.tempPwd,
          SaltKey,
          UnuniqueCid,
          ProfileName: profilename
        }))
        let Content = res.data.data.Content
        if (Content) {
          window.saveTextAs(Content, this.backupFileName, 'utf-8')
          this.$router.push('/Register/Already')
        }
      }
    }
  }
</script>

<style scoped>
  .register-form {
    float: left;
    width: 320px;
    padding-left: 80px;
  }

  .register-desc {
    float: right;
    width: 300px;
    text-align: justify;
    position: relative;
    top: -10px;
  }

  .register-step {
    font-weight: bold;
    font-size: 16px;
    line-height: 36px;
  }

  .btn-backup {
    margin: 22px 0;
  }

  .backup-tip {
    color: orange;
  }

  .file-desc {
    margin: 20px 0;
  }

  .btn-dl {
    width: 100px;
  }
</style>

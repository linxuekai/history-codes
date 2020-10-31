<template>
  <div>
    <el-dialog
      title="账号需要升级"
      :visible="dialogShow"
      :show-close="false">
      <h3>
        系统检测到您当前账户需要升级，为了您的账户安全，请尽快完成升级。
        <br>
        <br>
        请输入账户密码并点击右下角按钮进行升级。
        <br>
      </h3>
      <div class="pwd-ipt">
        <el-input
          placeholder="请输入账户密码"
          v-model="pwd"
          type="password">
        </el-input>
      </div>
      <span slot="footer">
        <el-button type="primary" @click="updateAccount">升级账户</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import resCodeMap from '../assets/js/resCodeMap'
  import axios from '@/axios'
  import { Dialog, Input, Message } from 'element-ui'
  import Vue from 'vue'
  import Pocket from './Account/Pocket.vue'

  [Input, Dialog].forEach(comp => {
    Vue.use(comp)
  })

  export default {
    components: {Pocket},
    props: ['dialog-show'],
    data () {
      return {
        pwd: ''
      }
    },
    methods: {
      async updateAccount () {
        let {data: {code}} = await axios.post('/Account/UpgradeAccount', {Password: this.pwd})
        if (code === 'StatusOk') {
          this.pwd = ''
          this.$emit('closeDialog')
          Message.warning('当前账户已升级，请重新备份，旧备份文件已失效。')
          this.$router.push('/Settings/Backup')
        } else {
          Message.error(resCodeMap[code] || '操作失败')
        }
      }
    }
  }
</script>

<style scope>
  .pwd-ipt{
    width:50%;
  }
</style>

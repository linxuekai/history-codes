<template>
  <div @click="activeRecover">
    <slot></slot>
  </div>
</template>

<script>
  import {json2FormData} from '@/assets/js/object2FormData'
  import axios from '@/axios'
  import checkIn from '@/assets/js/checkInAccount'

  import {Upload, Button, Input, Loading, MessageBox, Message} from 'element-ui'
  import Vue from 'vue'
  [Upload, Button, Input, Loading].forEach(comp => { Vue.use(comp) })

  export default {
    components: {
      'recover-pocket': require('./RecoverPocket.vue')
    },
    methods: {
      async activeRecover () {
        let h = this.$createElement
        let _this = this
        let refId = 'recover' + Date.now()
        await MessageBox({
          title: '请导入已备份的钱包文件',
          message: h('recover-pocket', {ref: refId}),
          confirmButtonText: '导入账户',
          closeOnClickModal: false,
          async beforeClose (action, instance, done) {
            let $recover = _this.$refs[refId]
            if ($recover && $recover.isUploading) {
              return
            }
            if (action === 'confirm') {
              let content
              if (window.Blob && window.FileReader) {
                let arrFiles = $recover.$refs.upload.uploadFiles
                if (arrFiles.length === 0 || arrFiles[0].name.slice(-4) !== '.txt') {
                  Message.warning('请导入您已备份的.txt钱包文件。')
                  return
                } else if (!$recover.recoverPwd) {
                  Message.warning('请输入被导入的钱包密码。')
                  return
                } else {
                  $recover.isUploading = true
                  content = await new Promise((resolve, reject) => {
                    let reader = new FileReader()
                    reader.readAsText(arrFiles[0].raw, 'utf-8')
                    reader.onload = function (e) {
                      resolve(e.target.result)
                    }
                  })
                }
              } else {
                content = $recover.contentByCopy
              }
              let recoverPwd = $recover.recoverPwd
              let res = await axios.post('/Account/Import', json2FormData({
                Password: recoverPwd,
                Profile: content
              }))
              let data = res.data
              if (data.code === 'StatusOk') {
                Message.success('已成功导入账号。')
                // 处理成功引入账号
                await checkIn(res, _this)
                // 刷新页面
                $recover.reset()
                done()
                _this.$router.replace('/Account')
                window.location.reload()
              } else {
                $recover.isUploading = false
                Message.warning('钱包文件或密码错误，请检查后重试。')
              }
            } else {
              $recover.reset()
              done()
            }
          }
        }).catch(() => {})
      }
    }
  }
</script>

<style>

</style>

<template>
  <div>
    <div class="register-form">
      <el-form label-width="94px" :model="formVal" :rules="registerDataRules" ref="registerForm">
        <el-form-item>
          <div class="register-step" v-text="$t('第一步：注册账户')"></div>
        </el-form-item>
        <div>
          <el-form-item :label="$t('用户名')" prop="userName">
            <el-input v-model="formVal.userName" :placeholder="$t('创建用户名')" autofocus></el-input>
          </el-form-item>
          <el-form-item :label="$t('密码')" prop="password">
            <el-input v-model="formVal.password"
                      :placeholder="$t('创建交易密码')"
                      type="password"></el-input>
          </el-form-item>
          <el-form-item :label="$t('确认密码')" prop="confirmPassword">
            <el-input v-model="formVal.confirmPassword"
                      :placeholder="$t('确认交易密码')"
                      type="password"
                      @keyup.enter.native="keyEnter"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="btn-submit"
                       @click="registerSubmit"
                       id="btn-submit"
                       v-loading="loading.btnSubmit"
                       v-text="$t('确认创建')">
            </el-button>
          </el-form-item>
          <div class="login-recovery">
            <recovery-button>
              <el-button @click="recoverMode" type="text" v-text="$t('或恢复已有钱包')"></el-button>
            </recovery-button>
          </div>
        </div>
      </el-form>
    </div>
    <div class="register-desc">
      <h3 v-text="$t('你的浏览器即你的钱包')"></h3>
      <p v-text="$t('当你创建账户时，一个钱包也同时被创建，并保存在你的浏览器中。')"></p>
      <h3 v-text="$t('用户名')"></h3>
      <p v-text="$t('设置您期望的用户名，这个用户名只作为您区块上的身份标识，不作登录使用。')"></p>
      <h3 v-text="$t('创建账户')"></h3>
      <p v-text="$t('创建新账户的同时完成钱包创建，请务必保存好您的钱包文件，方便您在不同浏览器或不同设备上导入登录。')"></p>
      <h3 v-text="$t('区块说明')"></h3>
      <p v-text="$t('当前注册服务为您在区块链上免费创建支付钱包。')"></p>
    </div>
  </div>
</template>

<script>
  import checkInAccount from '@/assets/js/checkInAccount'
  import axios from '@/axios'
  import {json2FormData} from '@/assets/js/object2FormData'
  import {Button, Form, FormItem, Input, Select, Option, MessageBox, Message} from 'element-ui'
  import Vue from 'vue'
  [Button, Form, FormItem, Input, Select, Option].forEach(comp => {
    Vue.use(comp)
  })

  export default {
    components: {
      'recovery-button': require('../RecoveryButton.vue')
    },
    name: 'RegisterStep1',
    data () {
      return {
        formVal: {
          userName: '',
          password: '',
          confirmPassword: ''
        },
        loading: {
          btnSubmit: false
        }
      }
    },
    computed: {
      registerDataRules () {
        return {
          userName: [
            {required: true, message: this.$t('请输入用户名'), trigger: 'blur'}
          ],
          password: [
            {required: true, message: this.$t('请输入密码'), trigger: 'blur'},
            {pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,})$/, message: this.$t('密码须 8 位以上包含字母和数字'), trigger: 'blur'}
          ],
          confirmPassword: [
            {required: true, message: this.$t('请再次输入密码'), trigger: 'blur'},
            {validator: this.validateConfirmPwd, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      validateConfirmPwd (rule, value, callback) {
        if (value !== this.formVal.password) {
          callback(new Error(this.$t('两次密码输入不一致')))
        } else {
          callback()
        }
      },
      registerSubmit () {
        if (this.loading.btnSubmit) {
          return false
        }
        this.$refs.registerForm.validate(async valid => {
          if (valid) {
            this.loading.btnSubmit = true
            let res = await axios.post('/Account/Register', json2FormData({
              UserName: this.formVal.userName,
              Password: this.formVal.password
            })).catch(
              () => {
                if (!!window.ActiveXObject || 'ActiveXObject' in window) {
                  MessageBox.alert(this.$t('registerStep1IETip'), this.$t('注册失败'), {
                    type: 'error',
                    callback: () => {
                      window.location.reload()
                    }
                  })
                } else {
                  Message.warning(this.$t('netError'))
                }
              }
            )
            await checkInAccount(res, this)
            if (res.data && res.data.code === 'StatusOk') {
              this.$store.commit('storeTempPwd', this.formVal.password)
              this.$refs.registerForm.resetFields()
              this.$router.push('/Register/Backup')
            } else if (res.data && res.data.code === 'ProfileNameRepeat') {
              MessageBox.alert(this.$t('此浏览器已注册过，不可重复注册。'))
            } else {
              Message.warning(this.$t('很抱歉，注册不成功，请您稍后刷新再试。'))
            }
            this.loading.btnSubmit = false
          }
        })
      },
      keyEnter () {
        if (!this.loading.btnSubmit) {
          document.getElementById('btn-submit').focus()
          this.registerSubmit()
        }
      },
      recoverMode () {
        this.$refs.registerForm.resetFields()
      }
    }
  }
</script>

<style scoped>
  .register-form {
    float: left;
    width: 320px;
  }

  .register-desc {
    float: right;
    width: 300px;
    text-align: justify;
    position: relative;
    top: -10px;
  }

  .btn-submit {
    width: 100%;
  }

  .login-recovery {
    text-align: right;
  }

  .register-step {
    font-weight: bold;
    font-size: 16px;
  }
</style>

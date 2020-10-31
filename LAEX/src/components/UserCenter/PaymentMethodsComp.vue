<template>
  <div class="cont-box">
    <div class="cont-title">
      收付款方式
    </div>
    <div>
      <div class="item">
        <div class="item-label">
          <img src="/static/img/icon/bank.png" class="mr-5" alt="">
          银行卡
        </div>
        <div class="item-info">
          {{oPayMethods.bank && oPayMethods.bank.number || '未添加'}}
        </div>
        <div class="item-right">
          <div v-if="oPayMethods.bank">
            <el-switch
              v-model="oPayMethods.bank.activate"
              @change="switchPayment('bank')"
              class="mr-10"></el-switch>
            <a @click="modify('bank')">修改</a>
            <a @click="del('bank')">删除</a>
          </div>
          <div v-else>
            <a @click="modify('bank')">添加</a>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="item-label">
          <img src="/static/img/icon/alipay.png" class="mr-5" alt="">
          支付宝
        </div>
        <div class="item-info">
          {{oPayMethods.alipay && oPayMethods.alipay.number || '未添加'}}
        </div>
        <div class="item-right">
          <div v-if="oPayMethods.alipay">
            <el-switch
              v-model="oPayMethods.alipay.activate"
              @change="switchPayment('alipay')"
              class="mr-10"></el-switch>
            <a @click="modify('alipay')">修改</a>
            <a @click="del('alipay')">删除</a>
          </div>
          <div v-else>
            <a @click="modify('alipay')">添加</a>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="item-label">
          <img src="/static/img/icon/wechat.png" class="mr-5" alt="">
          微信
        </div>
        <div class="item-info">
          {{oPayMethods.wechat && oPayMethods.wechat.number || '未添加'}}
        </div>
        <div class="item-right">
          <div v-if="oPayMethods.wechat">
            <el-switch
              v-model="oPayMethods.wechat.activate"
              @change="switchPayment('wechat')"
              class="mr-10"></el-switch>
            <a @click="modify('wechat')">修改</a>
            <a @click="del('wechat')">删除</a>
          </div>
          <div v-else>
            <a @click="modify('wechat')">添加</a>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      width="500px"
      :show-close="false"
      :title="dialogTitle"
      :visible="!!paymentType"
      :close-on-click-modal="false"
      custom-class="dialog-box">
      <div>
        <el-form
          ref="form"
          :rules="rules"
          :model="formData">
          <el-form-item label="本人真实姓名" prop="name">
            <el-input
              v-model.trim="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="账号" prop="account">
            <el-input
              v-model.trim="formData.account"></el-input>
          </el-form-item>
          <!--bank-->
          <div v-show="paymentType==='bank'">
            <el-form-item label="银行名称" prop="bankName">
              <el-input
                v-model.trim="formData.bankName"></el-input>
            </el-form-item>
            <el-form-item
              prop="bankBranch"
              label="开户支行">
              <el-input v-model.trim="formData.bankBranch"></el-input>
            </el-form-item>
          </div>
          <!--alipay | wechat-->
          <template v-if="paymentType==='alipay' || paymentType==='wechat'">
            <el-form-item label="收款码">
              <br>
              <el-upload
                ref="upload"
                action=""
                :auto-upload="false"
                :on-change="imgChange"
                :show-file-list="false">
                <img
                  v-if="img.clientURL || img.serverURL"
                  :src="img.clientURL || img.serverURL"
                  class="avatar">
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="须知">
              <div>
                <span>请上传清晰, 识别度高的收款二维码图片(png/jpg), 不超过3MB</span><br>
              </div>
            </el-form-item>
          </template>
        </el-form>
        <div class="text-right pt-15">
          <el-button
            @click="dialogReset"
            class="mar0">取消</el-button>
          <el-button
            type="primary"
            @click="submit"
            :disabled="disableSubmit"
            :loading="loading.submit"
            class="mar0">提交</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  isImg,
  isSizeFit
} from "../../assets/js/validators";
export default {
  name: "PaymentMethodsComp",
  data () {
    return {
      paymentType: '', // wechat / alipay / bank
      formData: {
        name: '',
        account: '',
        bankName: '',
        bankBranch: '',
      },
      rules: {},
      img: {
        file: null,
        clientURL: '',
        serverURL: ''
      },
      loading: {
        submit: false
      }
    }
  },
  computed: {
    dialogTitle () {
      return `添加/修改 ${this.paymentType || ''} 收款方式`
    },
    disableSubmit () {
      let {
        name,
        account,
        bankName,
      } = this.formData
      if (!name || !account) return true
      if (this.paymentType === 'bank') {
        return !bankName
      } else {
        return !this.img.serverURL && !this.img.file
      }
    },
    oPayMethods () {
      let obj = {}
      this.$store.state.user.payMethods.forEach(method => {
        obj[method.pay_code] = method
      })
      return obj
    },
  },
  watch: {},
  methods: {
    dialogReset () {
      this.$refs.form.resetFields()
      this.loading.submit = false
      this.paymentType = ''
      this.img = {
        file: null,
        clientURL: '',
        serverURL: ''
      }
    },
    imgChange (file) {
      if (!isImg(file)) return this.$showErrMsg('请上传png或jpg图片')
      if (!isSizeFit(file, 3)) return this.$showErrMsg('图片太大')
      this.img.file = file
      this.img.clientURL = file.url
    },
    modify (type) {
      if (!this.$store.state.user.hasTradePwd) {
        return this.$alert('为了您的资金安全, 请先设置资金密码', '提示')
          .finally(() => {
            this.$router.push({name: 'SetTradePassword'})
          })
      }
      this.paymentType = type
      this.$nextTick(() => {
        let {
          name = '',
          number = '',
          bankName = '',
          bankBranchName = '',
          picture = ''
        } = this.oPayMethods[type] || {}
        let formData = this.formData
        formData.name = name
        formData.account = number
        formData.bankName = bankName
        formData.bankBranch = bankBranchName
        this.img.serverURL = picture
      })
    },
    async del (type) {
      let {value: tradePassword} = await this.$tradePassword('正在删除收款方式,')
      let res = await this.$fetch('/v1/pay/method/delete', {
        payCode: type,
        tradePassword
      })
      if (res._statusOk) {
        this.$getUserInfo()
        this.$showErrMsg('收款方式删除成功')
      }
    },
    async submit () {
      let {value: tradePassword} = await this.$tradePassword('您正在设置收款方式,')
      this.loading.submit = true
      if (this.img.file) {
        let fd = new FormData()
        fd.append('file', this.img.file.raw)
        let resUpload = await this.$fetch('/v1/upload', fd, {
          headers: {'Content-Type': 'multipart/form-data'}
        })
          .catch(() => {
            this.loading.submit = false
          })
        if (resUpload._statusOk) {
          this.img.serverURL = resUpload.data.imgUrl
        }
      }
      let {
        name,
        account,
        bankName,
        bankBranch
      } = this.formData
      let res = await this.$fetch('/v1/pay/method/add', {
        payCode: this.paymentType,
        name,
        number: account,
        bankName,
        bankBranchName: bankBranch,
        fileUrl: this.img.serverURL,
        tradePassword
      })
        .finally(() => {
          this.loading.submit = false
        })
      if (res._statusOk) {
        this.$getUserInfo()
        this.dialogReset()
        this.$showErrMsg('提交成功')
      }
    },
    async switchPayment (type) {
      let payment = this.oPayMethods[type]
      let {value: tradePassword} = await this.$tradePassword('您正在设置收款方式,')
        .catch(() => {
          payment.activate = !payment.activate
          return {}
        })
      if (!tradePassword) return
      this.$fetch('/v1/pay/method/activate', {
        payCode: type,
        status: payment.activate,
        tradePassword
      })
        .finally(this.$getUserInfo)
    }
  }
}
</script>

<style scoped>
</style>

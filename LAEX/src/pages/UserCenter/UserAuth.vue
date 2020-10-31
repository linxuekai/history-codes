<template>
  <div class="cont-box">
    <div class="cont-title">身份认证</div>
    <div class="pv-30">
      <div v-if="authStatus===0" class="w45 mh-auto">
        <el-form>
          <el-form-item
            label="真实姓名">
            <el-input
              v-model.trim="form1.realName"></el-input>
          </el-form-item>
          <el-form-item
            label="证件类型">
            <br>
            <el-select v-model="form1.idType" class="w100">
              <el-option label="身份证" value="身份证"></el-option>
              <el-option label="护照" value="护照"></el-option>
              <el-option label="台胞证" value="台胞证"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="证件号码">
            <el-input
              :disabled="!form1.idType"
              v-model.trim="form1.idNumber"></el-input>
          </el-form-item>
          <p class="color-weak">请务必填写提交本人真实身份信息，提交后将无法修改，若身份信息不实或有误，将影响后续高级身份认证。</p>
          <el-form-item>
            <el-checkbox v-model="agree">
              我已同意并接受 <a>《用户服务协议》</a>
            </el-checkbox>
          </el-form-item>
          <el-form-item class="pv-20">
            <el-button
              :disabled="disableSubmit1"
              :loading="loading.submit1"
              @click="submit1"
              class="w40 font-16 pv-15"
              type="primary">提交一级认证
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <div v-if="authStatus > 0" class="w60 mh-auto">
        <h2 class="mb-30 text-center">
          <i class="el-icon-success color-success mr-10"></i>
          您的一级身份认证已提交成功
        </h2>
        <div v-if="verifyData.twoAuthVerify.checkStatus === ''">
          <el-form>
            <el-form-item label="真实姓名">
              <span class="ml-30">{{verifyData.oneAuthVerify.realName}}</span>
            </el-form-item>
            <el-form-item label="证件类型">
              <span class="ml-30">{{verifyData.oneAuthVerify.idType}}</span>
            </el-form-item>
            <el-form-item
              label="证件号码">
              <span class="ml-30">{{verifyData.oneAuthVerify.idCard}}</span>
            </el-form-item>
            <el-form-item>
              <div class="clear-fix text-center pb-20 pt-30">
                <div class="fl w33">
                  <el-upload
                    class="avatar-uploader"
                    action=""
                    :auto-upload="false"
                    :on-change="idInfImgChange"
                    :show-file-list="false">
                    <img v-if="idInfront" :src="idInfront.url" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon">
                      添加图片
                    </i>
                  </el-upload>
                  <div class="papers">
                    证件正面照
                    <a
                      @click="$preview('/static/img/eg/inf.jpg')"
                      class="ml-15">
                      <i class="el-icon-search"></i> 查看示例
                    </a>
                  </div>
                </div>
                <div class="fl w33">
                  <el-upload
                    class="avatar-uploader"
                    action=""
                    :auto-upload="false"
                    :on-change="idRevImgChange"
                    :show-file-list="false">
                    <img v-if="idReverse" :src="idReverse.url" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon">
                      添加图片
                    </i>
                  </el-upload>
                  <div class="papers">
                    证件背面照
                    <a
                      @click="$preview('/static/img/eg/rev.jpg')"
                      class="ml-15">
                      <i class="el-icon-search"></i> 查看示例
                    </a>
                  </div>
                </div>
                <div class="fl w33">
                  <el-upload
                    class="avatar-uploader"
                    action=""
                    :auto-upload="false"
                    :on-change="handIdImgChange"
                    :show-file-list="false">
                    <img v-if="handId" :src="handId.url" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon">
                      添加图片
                    </i>
                  </el-upload>
                  <div class="papers">
                    手持证件照
                    <a
                      @click="$preview('/static/img/eg/holdIDCard3.jpg')"
                      class="ml-15">
                      <i class="el-icon-search"></i> 查看示例
                    </a>
                  </div>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="color-weak">
                为了避免重复操作, 请提交真是清晰的身份信息（png/jpg图片格式, 不超过3MB）<br>
                平台承诺, 本次认证仅用于确认您的真实信息, 您提交的资料我们将严格保密 !
              </div>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="agree">
                我已同意并接受 <a>《用户服务协议》</a>
              </el-checkbox>
            </el-form-item>
            <el-form-item class="pv-20">
              <el-button
                type="primary"
                class="pv-15 font-16 w40"
                @click="submit2"
                :loading="loading.submit2"
                :disabled="disableSubmit2">提交二级实名认证
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="text-center w50 mh-auto">
          <h2 class="mb-30" v-if="verifyData.twoAuthVerify.checkStatus === 'wait'">
            <i class="el-icon-warning color-warn mr-10"></i>
            您的二级身份认证已提交审核
          </h2>
          <h2 class="mb-30" v-if="verifyData.twoAuthVerify.checkStatus === 'pass'">
            <i class="el-icon-success color-success mr-10"></i>
            您的二级身份认证已通过认证
          </h2>
          <div  v-if="verifyData.twoAuthVerify.checkStatus === 'reject'">
            <h2 class="mb-30">
              <i class="el-icon-error color-danger mr-10"></i>
              您的二级身份认证审核不通过
            </h2>
            <p class="lh-2 color-warn">
              拒绝原因：<br>
              <span class="font-16">
                {{verifyData.twoAuthVerify.remark || '（后台审核人员暂未说明拒绝原因，请按照示例提示尝试重新提交认证。）'}}
              </span>
            </p>
            <div class="pv-30">
              <el-button type="primary" @click="verifyData.twoAuthVerify.checkStatus = ''">重新提交二级身份认证</el-button>
            </div>
          </div>
          <el-form class="pv-30" v-if="verifyData.twoAuthVerify.checkStatus !== ''">
            <el-form-item label="真实姓名">
              <span class="ml-30">{{verifyData.oneAuthVerify.realName}}</span>
            </el-form-item>
            <el-form-item label="证件类型">
              <span class="ml-30">{{verifyData.oneAuthVerify.idType}}</span>
            </el-form-item>
            <el-form-item
              label="证件号码">
              <span class="ml-30">{{verifyData.oneAuthVerify.idCard}}</span>
            </el-form-item>
          </el-form>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

import {
  isImg,
  isSizeFit
} from "../../assets/js/validators";

export default {
  name: "user-auth",
  data () {
    return {
      form1: {
        idType: '身份证',
        realName: '',
        idNumber: '',
      },
      idInfront: null,
      idReverse: null,
      handId: null,
      agree: false,
      loading: {
        submit1: false,
        submit2: false
      },
      verifyData: {
        oneAuthVerify: {},
        twoAuthVerify: {}
      }
    }
  },
  computed: {
    disableSubmit1 () {
      let {
        idType,
        realName,
        idNumber,
      } = this.form1
      return !idType || !realName || !idNumber || !this.agree
    },
    disableSubmit2 () {
      return !this.idInfront ||
        !this.idReverse ||
        !this.handId ||
        !this.agree
    },
    ...mapState('user', [
      'authStatus'
    ])
  },
  watch: {},
  methods: {
    checkImg (fileRaw) {
      if (!isImg(fileRaw)) {
        this.$showErrMsg('请上传jpg/png图片')
        return false
      }
      if (!isSizeFit(fileRaw, 3)) {
        this.$showErrMsg('图片太大, 无法添加')
        return false
      }
      return true
    },
    idInfImgChange (file) {
      if (this.checkImg(file.raw)) this.idInfront = file
    },
    idRevImgChange (file) {
      if (this.checkImg(file.raw)) this.idReverse = file
    },
    handIdImgChange (file) {
      if (this.checkImg(file.raw)) this.handId = file
    },
    async submit2 () {
      this.loading.submit2 = true
      let fd = new FormData()
      fd.append('cardFront', this.idInfront.raw)
      fd.append('cardReverse', this.idReverse.raw)
      fd.append('cardInHand', this.handId.raw)
      let res = await this.$fetch('/v1/user/authentic/2', fd, {
        headers: {'Content-Type': 'multipart/form-data'}
      })
        .finally(() => {
          this.loading.submit2 = false
        })
      if (res._statusOk) {
        this.$getUserInfo()
        this.getVerifyData()
      }
    },
    async submit1 () {
      this.loading.submit1 = true
      let {
        idType,
        realName,
        idNumber,
      } = this.form1
      let res = await this.$fetch('/v1/user/authentic/1', {
        idCard: idNumber,
        realName,
        idType
      })
        .finally(() => {
          this.loading.submit1 = false
        })
      if (res._statusOk) {
        this.$getUserInfo()
        this.getVerifyData()
      }
    },
    async getVerifyData () {
      let res = await this.$fetch('/v1/user/authenticInfo')
      if (res._statusOk) this.verifyData = res.data
    }
  },
  async created () {
    this.getVerifyData()
  }
}
</script>

<style scoped>
.w33{
  width: 33%;
}
.avatar-uploader-icon{
  font-size: 18px;
}
</style>

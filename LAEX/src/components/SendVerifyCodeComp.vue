<template>
  <div class="comp-send-verify">
    <el-button
      @click="$emit('click')"
      type="text"
      v-if="!(readingTime>0)"
      :loading="loading"
      :disabled="disabled">发送验证码
    </el-button>
    <span v-else>{{`${readingTime}s 后重新获取`}}</span>
  </div>
</template>

<script>
export default {
  name: "SendVerifyCodeComp",
  props: [
    'disabled',
    'type',
    'areaCode',
    'mobile',
    'email'
  ],
  data () {
    return {
      readingTime: 0,
      loading: false,
      ticker: null
    }
  },
  methods: {
    async wrapRequest (req) {
      this.loading = true
      let res = await req
        .finally(() => {
          this.loading = false
        })
      if (res._statusOk) {
        this.$showErrMsg('验证码已发送，请注意查收')
        // 读秒2分钟重新获取验证码
        this.readingTime = 120
        this.ticker = setInterval(() => {
          if (--this.readingTime <= 0) {
            clearInterval(this.ticker)
          }
        }, 1000)
      }
    },
    async send () {
      if (!this.disabled) {
        let req
        switch (this.type) {
          case 'register':
          {
            let {imgKey, imgCode} = await this.imgCode()
            if (this.mobile) {
              req = this.$tipPost('/v1/sendsms/register', {
                mobile: this.mobile,
                areaCode: this.areaCode,
                imgKey,
                imgCode
              })
            } else if (this.email) {
              req = this.$tipPost('/v1/sendmail', {
                email: this.email,
                emailType: 'register',
                imgKey,
                imgCode
              })
            }
            break
          }
          case 'bindMobile':
            req = this.$fetch('/v1/sendsms/bindMobile', {
              areaCode: this.areaCode,
              mobile: this.mobile
            })
            break
          case 'bindEmail':
            req = this.$fetch('/v1/sendmail', {
              emailType: 'bindEmail',
              email: this.email
            })
            break
          case 'setTradePassword':
            req = this.$fetch('/v1/sendsms/setTradePassword')
            break
          case 'forgetPassword':
          {
            let {imgKey, imgCode} = await this.imgCode()
            if (this.mobile) {
              req = this.$tipPost('/v1/sendsms/forgetPassword', {
                mobile: this.mobile,
                areaCode: this.areaCode,
                imgKey,
                imgCode
              })
            } else {
              req = this.$tipPost('/v1/sendmail', {
                email: this.email,
                emailType: 'forgetPassword',
                imgKey,
                imgCode
              })
            }
            break
          }
        }
        req && this.wrapRequest(req)
      }
    },
    async imgCode () {
      let h = this.$createElement
      let imgKey = Date.now()
      let {value: imgCode} = await this.$prompt(h('img', {
        attrs: {
          src: '/v1/imgCode/' + imgKey
        },
        class: 'pointer',
        style: {transition: '.2s'},
        on: {
          click (ev) {
            let img = ev.target
            img.style.opacity = '0.4'
            img.src = '/v1/imgCode/' + (imgKey = Date.now())
          },
          load (ev) {
            ev.target.style.opacity = '1'
          }
        }
      }), {
        title: '请输入图片验证码',
        closeOnClickModal: false
      })
      return {imgKey, imgCode}
    },
    init () {
      this.readingTime = 0
      this.loading = false
      clearTimeout(this.ticker)
      this.ticker = null
    }
  }
}
</script>

<style scoped>
  .comp-send-verify{
    display: inline-block;
  }
  .el-button--text.is-disabled{
    color: #61688a;
  }
</style>

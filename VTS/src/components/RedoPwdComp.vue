<template>
  <div @click="requirePwd" style="display: inline-block;cursor: pointer;">
    <slot></slot>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {MessageBox, Message} from 'element-ui'
  [].forEach(comp => Vue.use(comp))
//  import {mapState} from 'vuex'
  export default {
    props: ['title', 'text', 'disabled', 'requireInput'],
    components: {
      PwdCompInner: require('./PwdCompInner.vue')
    },
//    compouted: {
//      ...mapState({
//        accountLocking: state => state.accountLocking
//      })
//    },
    methods: {
      requirePwd () {
        if (this.disabled) {
          return
        }
        let _this = this
        let h = this.$createElement
        let refId = 'pwdCompInner' + Date.now()
        MessageBox({
          title: _this.title,
          message: h('pwd-comp-inner', {
            ref: refId,
            props: {
              text: _this.text,
              requireInput: _this.requireInput
            }
          }),
          showCancelButton: true,
          lockScroll: false,
          beforeClose (action, instance, done) {
            let $pwdCompInner = _this.$refs[refId]
            if (action === 'confirm') {
              let pwd = $pwdCompInner.pwdVal
              if (!_this.$store.state.accountLocking || pwd) {
                _this.$emit('getPwd', pwd)
                $pwdCompInner.reset()
                done()
              } else {
                Message.warning('请输入密码')
              }
            } else {
              $pwdCompInner.reset()
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

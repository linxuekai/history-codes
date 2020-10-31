<template>
  <div>
    <p v-text="text"></p>
    <div v-if="accountLocking || requireInput">
      <h4>请输入密码</h4>
      <el-input type="password" v-model="pwdVal" autofocus></el-input>
    </div>
    <div v-else>
      <h3 class="unlock-tip">当前账号已解锁，请确认操作。</h3>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Input} from 'element-ui'
  [Input].forEach(comp => {
    Vue.use(comp)
  })
  import {mapState} from 'vuex'
  export default {
    props: ['text', 'requireInput'],
    data () {
      return {
        pwdVal: ''
      }
    },
    computed: {
      ...mapState({
        accountLocking: state => state.accountLocking
      })
    },
    methods: {
      reset () {
        this.pwdVal = ''
      }
    }
  }
</script>

<style scoped>
  .unlock-tip {
    margin: 15px 0;
  }
</style>
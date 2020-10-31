<template>
  <div class="text-center pv-50 comp-entry">
    <h1 class="pv-20 fw-nm">
      一键触达
      <span class="ml-15">轻松交易</span>
    </h1>
    <p class="text-center font-18 opacity-8">
      纵享全球卓越型加密数字资产交易服务
    </p>
    <div class="mt-30 pv-30">
      <div v-if="!authorized">
        <router-link :to="{name: 'Login'}" class="entry-login">登录</router-link>
        <router-link :to="{name: 'Register'}" class="entry-register">注册</router-link>
      </div>
      <router-link
        v-else
        :to="{name: 'Pairs'}"
        class="entry-register">马上交易</router-link>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "entry-comp",
  data () {
    return {}
  },
  computed: {
    ...mapGetters('user', [
      'authorized'
    ])
  },
}
</script>

<style scoped>
  .entry-login, .entry-register {
    display: inline-block;
    border: 1px solid;
    border-radius: 5px;
    padding: 12px 75px;
    color: #c7cce6;
    font-size: 16px;
    cursor: pointer;
    transition: .3s;
  }
  .entry-login{
    border-color: #c7cce6;
    margin-right: 40px;
  }
  .entry-register {
    border-color: #7a98f7;
    background-color: #7a98f7;
    color: #ffffff;
  }
  .entry-login:hover {
    background-color: rgba(0,0,0,.3);
  }
  .entry-register:hover {
    background-color: rgba(122,152,247,.7);
  }
</style>

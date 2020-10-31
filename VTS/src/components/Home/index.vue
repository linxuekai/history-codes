<template>
  <div>
    <div class="home-content">
      <div class="text-content">
        <p class="fist-line-text"><img :src="require('@/assets/img/logo.png')" alt=""><span v-text="$t('Home_title')"></span></p>
        <p v-text="$t('Home_p1')"></p>
        <p v-text="$t('Home_p2')"></p>
        <p v-text="$t('Home_p3')"></p>
        <p v-text="$t('Home_p4')"></p>
        <div class="btn-wrap"><el-button class="btn-create" type="primary" @click="startCreate" v-text="$t('创建账户')"></el-button></div>
        <div class="btn-wrap">
          <recover-button>
            <el-button class="btn-create" v-text="$t('从备份恢复钱包')"></el-button>
          </recover-button></div>
      </div>
      <div class="img-content">
        <img width="350" height="275" src="/static/img/image.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import RecoverButton from '../RecoveryButton.vue'
  import {Button} from 'element-ui'
  import Vue from 'vue'
  [Button].forEach(comp => { Vue.use(comp) })

  export default {
    name: 'Home',
    components: {
      RecoverButton
    },
    async beforeRouteEnter (to, from, next) {
      let checkLogin = await window.webStore.getItem('currentProfile')
      checkLogin !== null
        ? next('/Account')
        : next()
    },
    methods: {
      startCreate () {
        this.$router.push('/Register')
      }
    }
  }
</script>

<style scoped="">
  .home-content{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-60%);
    -ms-transform: translate(-50%,-60%);
    width: 750px;
  }
  .text-content{
    float: left;
    width: 365px;
    text-align: justify;
    line-height: 22px;
  }
  .img-content{
    float: right;
    width: 350px;
    position: relative;
    top:40px;
  }
  .fist-line-text{
    text-align: center;
  }
  .btn-wrap{
    width: 100%;
    text-align: center;
    padding-top: 14px;
  }
  .btn-create{
    width: 200px;
  }
</style>

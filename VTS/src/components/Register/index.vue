<template>
  <div>
    <div class="register-title">
      <h2 v-text="$t('新账户')"></h2>
      <p>{{stepTip}}</p>
    </div>
    <div class="register-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data () {
      return {}
    },
    computed: {
      stepTip () {
        switch (this.$route.name) {
          case 'RegisterStep1':
            return this.$t('创建一个钱包和一个账户')
          case 'RegisterStep2':
            return this.$t('钱包创建成功')
          case 'RegisterStep3':
            return this.$t('准备完成！')
        }
      }
    }
  }
</script>

<style scoped>
  .register-title {
    text-align: center;
    margin: 50px 0;
  }

  .register-content {
    width: 750px;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    -ms-transform: translate(-50%);
  }
</style>

<style>
  .register-content .el-form-item__label {
    color: #fff;
  }
</style>
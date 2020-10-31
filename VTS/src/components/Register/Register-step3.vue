<template>
  <div>
    <div class="register-form">
      <div class="register-step" v-text="$t('第三步：开始')"></div>
      <div class="nav-block">
        <div class="nav-block-item" v-for="item in navBlockOption" :key="item.path">
          <div class="nav-desc" v-text="$t(item.navDesc)"></div>
          <div class="nav-link" @click="redirectTo(item.linkTo)"><span v-text="$t(item.linkText)"></span> <i
            class="el-icon-arrow-right link-caret"></i></div>
          <div class="clearfix"></div>
        </div>
      </div>
    </div>
    <div class="register-desc">
      <h3 v-text="$t('恭喜，准备就绪！')"></h3>
      <p v-text="$t('registerStep3p1')"></p>
      <p v-text="$t('registerStep3p2')"></p>
      <p v-text="$t('registerStep3p3')"></p>
    </div>
  </div>
</template>

<script>
  import {Button} from 'element-ui'
  import Vue from 'vue'
  [Button].forEach(comp => {
    Vue.use(comp)
  })

  export default {
    data () {
      return {
        navBlockOption: [
          {
            navDesc: '查看仪表盘：',
            linkText: '概况',
            linkTo: '/Account'
          }, {
            navDesc: '查看你的新账户：',
            linkText: '账户',
            linkTo: '/Account/Pocket'
          }, {
            navDesc: '进行充值：',
            linkText: '充值',
            linkTo: '/Financing'
          }, {
            navDesc: '发起转账：',
            linkText: '转账',
            linkTo: '/Transfer'
          }, {
            navDesc: '修改设置：',
            linkText: '设置',
            linkTo: '/Settings/General'
          }
        ]
      }
    },
    methods: {
      redirectTo (url) {
        this.$router.push(url)
      }
    }
  }
</script>

<style scoped>
  .register-form {
    float: left;
    width: 320px;
    padding-left: 80px;
  }

  .register-desc {
    float: right;
    width: 300px;
    text-align: justify;
    position: relative;
    top: -10px;
  }

  .register-step {
    font-weight: bold;
    font-size: 16px;
    line-height: 36px;
  }

  .nav-block-item {
    width: 250px;
    margin: 10px 0;
  }

  .nav-desc {
    float: left;
  }

  .nav-link {
    float: right;
    cursor: pointer;
  }

  .nav-link:hover {
    color: tan;
  }

  .link-caret {
    padding: 0 5px;
    font-size: 12px;
  }

  .clearfix {
    clear: both;
  }
</style>
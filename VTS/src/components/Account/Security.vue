<template>
  <div>
    <div class="security">
      <div class="title_split">
        <span class="f-s-20">安全</span>
      </div>
      <div class="security-tips">
        <span>请不要将任何私密信息透露给任何人。</span>
      </div>
      <div class="security-pwdLogin border-box">
        <div class="isPassVer">
          <img :src="require('@/assets/img/security-right.png')" >
          <span>密码登录</span>
        </div>
        <div class="isPassVer-content">
          <div>
            <span class="c-143d5f">安全等级：</span>
            <span class="security-level ps-relative">
              <span class="ps-absolute l-18" v-show="pwdLevel.lev===1">低</span>
            </span>
            <span class="security-level ps-relative">
              <span class="ps-absolute l-18" v-show="pwdLevel.lev===2">中</span>
            </span>
            <span class="security-level ps-relative">
              <span class="ps-absolute l-18" v-show="pwdLevel.lev===3">高</span>
            </span>
          </div>
          <div>
            <a href="javascript:" @click="$router.push('/Account/PwdModify')" class="f-s-12 c-1da1f3">修改密码</a>
          </div>
        </div>
      </div>
      <div class="security-pwdLogin border-box m-t-10">
        <div class="isPassVer-content">
          <div class="c-143d5f m-t-10">
            <span>登录时输入登录密码：</span>
            <label class="security-radio">
              <input name="pwdType" type="radio" checked="checked">
              <span> 每次输入</span>
            </label>
            <label class="security-radio">
              <input name="pwdType" type="radio">
              <span> 每两小时输入</span>
            </label>
            <label class="security-radio">
              <input name="pwdType" type="radio">
              <span> 不输入</span>
            </label>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'security',
    data () {
      return {
        pwdLevel: {
          lev: 3
        }
      }
    },
    beforeRouteEnter: (to, from, next) => {
      next(vm => {
        vm.$store.dispatch('changeTheme', ' ')
      })
    }
  }
</script>

<style scoped>
  .ps-relative{
    position: relative;
  }
  .ps-absolute{
    position: absolute;
  }
  .security{
    font-size: 14px;
    color:#fff;
    font-family: "Microsoft YaHei", sans-serif;
    width: 80%;
    max-width: 845px;
    min-width: 700px;
    margin: 100px auto 20px;
  }
  .m-t-10{
    margin-top: 10px !important;
  }
  .l-18{
    left: 18px;
  }
  .f-s-12{
    font-size: 12px;
  }
  .f-s-20{
    font-size: 20px;
  }
  .c-1da1f3{
    color:#1da1f3
  }
  .c-143d5f{
    color: #143d5f;
  }
  .border-box{
    box-sizing: border-box;
  }
  .title_split{
    width: 100%;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255,255,255,.3);
  }
  .security-tips{
    color: #ffffff;
    margin-top: 10px;
  }
  .security-pwdLogin{
    width: 98%;
    height: 82px;
    background-color: #bfcbd9;
    margin-top: 20px;
    padding: 20px 25px 0 25px;
  }
  .security-pwdLogin .isPassVer{
    margin-top: 6px;
    float: left;
    width: 156px;
  }
  .isPassVer span{
    color: #143d5f;
    position: relative;
    top: -12px;
  }
  .isPassVer img{
    width: 33px;
    height: 33px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .security-level{
    display: inline-block;
    margin-right: 2px;
    width: 50px;
    height: 16px;
    background-color: #f06332;
    font-size: 12px;
    text-align: center;
  }
  .security-radio{
    margin-right: 60px;
    cursor: pointer;
  }
  .security-radio:nth-of-type(1){
    margin-left: 28px;
  }
  .security-radio:nth-last-child(1){
    margin-right: 0;
  }
</style>

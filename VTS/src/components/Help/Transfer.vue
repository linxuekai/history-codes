<template>
  <div class="helpRegister">
    <div class="HelpTitle">如何进行充值？</div>
    <div class="f-s-16 m-t-20">登录成功后选择进入提现和兑换页面</div>
    <div class="row1">
      <div class="img-with-desc">
        <img src="/static/img/help_transfer%20(11).png" alt="">
        <p class="img-desc">点击创建账户进入充值/提现页面</p>
      </div>
      <div class="arrow-icon">
        <img class="ico_arrow" :src="require('@/assets/img/ico_arrow.png')">
      </div>
      <div class="img-with-desc">
        <img src="/static/img/help_transfer%20(22).png" alt="">
        <p class="img-desc">点击“提现”，输入金额地址</p>
      </div>
      <div class="help-desc">
        A：填写您所需要提现币种的数量 <br><br>
        B：输入您的接收地址 <br><br>
        C：填写您本次提现的备注 <br><br>
        D：点击确定，正确输入您的密码后完成提现操作 <br>
      </div>
    </div>

    <div class="HelpTitle m-t-68">如何进行提现/兑换？</div>
    <div class="row1">
      <div class="img-with-desc">
        <img src="/static/img/help_transfer%20(33).png" alt="">
        <p class="img-desc">点击创建账户进入充值/提现页面</p>
      </div>
      <div class="arrow-icon">
        <img class="ico_arrow" :src="require('@/assets/img/ico_arrow.png')">
      </div>
      <div class="img-with-desc">
        <img src="/static/img/help_transfer%20(44).png" alt="">
        <p class="img-desc">点击“兑换”，输入金额地址</p>
      </div>
      <div class="help-desc">
        A：输入您所需要兑换的金额 <br><br>
        B：选择您需要兑换的类型（注：SC大于10可提现） <br><br>
        C：输入您正确的密码 <br><br>
        D：点击确定兑换 <br>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'helpRegister'
  }
</script>

<style scoped>
  .m-t-68{
    margin-top: 40px !important;
  }
  .arrow-icon{
    position: relative;
    bottom: 110px;
    margin: 0 10px;
    display: inline-block;
  }
  .row1{
    position: relative;
    margin:15px 0;
  }
  .help-desc{
    margin:0 10px;
    display: inline-block;
    position: relative;
    bottom:40px;
  }
  .img-with-desc{
    display: inline-block;
  }
  .img-desc{
    text-align: center;
  }
</style>

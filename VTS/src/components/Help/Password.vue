<template>
  <div class="helpRegister">
    <div class="HelpTitle">1、如何修改密码？</div>
    <div class="f-s-16 m-t-20">登录成功后选择进入账户-密码页面</div>
    <div class="m-t-20">
      <div class="helpTrade">
        <img class="helpTradeImg" src="/static/img/pic-11.jpg">
        <div class="tip">
          <p>A：输入您账户的原密码</p>
          <p>B：输入您账户的新密码（请设置8位以上的英文+数字作为您的密码）</p>
          <p>C：再次输入您的新密码</p>
        </div>
      </div>
    </div>

    <div class="HelpTitle m-t-76">2,如何为子账号创建备份？</div>
    <div class="m-t-20">
      <div class="helpTrade">
        <img class="helpTradeImg" src="/static/img/pic-12.jpg">
        <div class="tip">
          <p>A：点击“为账号创建备份”，下载您的新钱包</p>
          <p>B：输入您的新密码开始下载</p>
        </div>
      </div>
    </div>

    <div class="m-t-20 c-red">注：请务必保存好您的“新钱包文件”，旧钱包资产已在修改密码时全部转移至新钱包，<br>下次登录需用“新钱包文件”和新密码登录</div>

  </div>
</template>

<script>
  export default {
    name: 'HelpPassword'
  }
</script>

<style scoped>
  .c-red{
    color: red;
  }
  .helpTrade{
    width: 296px;
    height: 209px;
    margin: 0 40px 0 0;
    position: relative;
  }
  .tip{
    font-size: 14px;
    margin-top: 16px;
    left: 346px;
    width: 500px;
    position: absolute;
    bottom: 0;
  }
  .m-t-76{
    margin-top: 76px;
  }
</style>

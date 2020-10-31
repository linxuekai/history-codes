<template>
  <div class="helpRegister">
    <div class="HelpTitle">如何创建账户？</div>
    <div class="f-s-16 m-t-20">请使用谷歌或火狐浏览器打开www.stockblock.com</div>
    <div class="m-t-20">
      <div class="helpRegisterImgBox">
        <img class="helpRegisterImg" src="/static/img/pic_01.jpg">
        <div class="tip">点击创建账户进入注册登录页面</div>
      </div>
      <div class="helpRegisterArrowBox">
        <img class="ico_arrow" :src="require('@/assets/img/ico_arrow.png')">
      </div>
      <div class="helpRegisterImgBox">
        <img class="helpRegisterImg" src="/static/img/pic_02.jpg">
        <div class="tip">选择恢复已有钱包导入您的账户资产</div>
      </div>
      <div class="helpRegisterArrowBox">
        <img class="ico_arrow" :src="require('@/assets/img/ico_arrow.png')">
      </div>
      <div class="helpRegisterImgBox">
        <img class="helpRegisterImg" src="/static/img/pci_03.jpg">
        <div class="tip">选择上传您的钱包文件</div>
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
  .tip{
    font-size: 14px;
    margin-top: 16px;
    text-align: center;
  }
  .helpRegisterImgBox{
    width: 272px;
    height: 210px;
    float: left;
  }
  .helpRegisterImg{
    width: 100%;
    height: 100%;
  }
  .helpRegisterArrowBox{
    margin: 90px 30px 0;
    float: left;
  }
</style>

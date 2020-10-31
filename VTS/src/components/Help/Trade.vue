<template>
  <div class="helpRegister">
    <div class="HelpTitle">1、如何买入交易？</div>
    <div class="f-s-16 m-t-20">登录成功后选择进入交易页面</div>
    <div class="m-t-20">
      <div class="helpTrade">
        <img class="helpTradeImg" src="/static/img/pic_04.jpg">
        <div class="tip">
          <p>A：填写您要购买的总金额（请不要输入大于您账户的VS余额）</p>
          <p>B：确认购买金额无误后点击买入</p>
          <p>C：买入后订单显示在您的持仓订单中则已经成功买入</p>
        </div>
      </div>
    </div>

    <div class="HelpTitle m-t-76">2,如何卖出交易？</div>
    <div class="m-t-20">
      <div class="helpTrade">
        <img class="helpTradeImg" src="/static/img/pic_04.jpg">
        <div class="tip">
          <p>A：卖出VTS时请在持仓订单中选择您所要卖出的某一订单</p>
          <p>B：输入您所要卖出的数量（数量不可超过该订单总VTS数量）</p>
          <p>C：确认卖出数量后点击确定卖出</p>
          <p>D：卖出后订单显示在您的卖出委托中则已经挂单成功</p>
          <p>E：成功卖出后订单交易记录显示在“卖出成交”中</p>
        </div>
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

<template>
  <div id="comp-footer">
    <div class="clear-fix">
      <div class="fl w30">
        <img src="/static/img/laex-logo.png" alt="" height="50" width="176">
        <p class="mt-30">互联网创新模式与技术服务解决方案提供商</p>
        <p class="color-weak">Copyright©2018 LAEX.PRO</p>
      </div>

      <div class="fr w10">
        <dl>
          <dt>条款</dt>
          <dd>
            <router-link
              :to="{name: 'UserAgreement'}"
            >用户协议</router-link>
          </dd>
          <dd>
            <router-link
              :to="{name: 'PrivacyPolicy'}"
            >隐私条款</router-link>
          </dd>
          <dd>
            <router-link
              :to="{name: 'Disclaimer'}"
            >免责声明</router-link>
          </dd>
          <dd>
            <router-link
              :to="{name: 'LegalNotices'}"
            >法律声明</router-link>
          </dd>
        </dl>
      </div>

      <div class="fr w10">
        <dl>
          <dt>关于</dt>
          <dd>
            <router-link
              :to="{name: 'AboutLAEX'}"
            >关于LAEX</router-link>
          </dd>
          <dd>
            <router-link
              :to="{name: 'ContactUs'}"
            >联系我们</router-link>
          </dd>
          <dd>
            <router-link
              :to="{name: 'CoinApplication'}"
            >上币申请</router-link>
          </dd>
          <dd>
            <router-link
              :to="{name: 'RateDescription'}"
            >费率说明</router-link>
          </dd>
        </dl>
      </div>

      <div class="fr w10">
        <dl>
          <dt>指南</dt>
          <!--<dd>-->
            <!--<router-link-->
              <!--:to="{name: 'UserAgreement'}"-->
            <!--&gt;公告中心</router-link>-->
          <!--</dd>-->
          <dd>
            <router-link
              :to="{name: 'BeginnersGuide'}"
            >新手指南</router-link>
          </dd>
          <!--<dd>-->
            <!--<router-link-->
              <!--:to="{name: 'Disclaimer'}"-->
            <!--&gt;帮助中心</router-link>-->
          <!--</dd>-->
          <!--<dd>-->
            <!--<router-link-->
              <!--:to="{name: 'LegalNotices'}"-->
            <!--&gt;行业资讯</router-link>-->
          <!--</dd>-->
          <dd>
            <router-link
              :to="{name: 'DigitalCurrencyIntroduction'}"
            >数字资产介绍</router-link>
          </dd>
        </dl>
      </div>

      <div class="fr w10">
        <dl>
          <dt>活动</dt>
          <dd>
            <router-link
              :to="{name: 'RegisterReward'}"
            >注册送币</router-link>
          </dd>
          <dd>
            <router-link
              :to="{name: 'DepositInterest'}"
            >存币生息</router-link>
          </dd>
          <dd>
            <router-link
              :to="{name: 'LevelPrivilege'}"
            >升级优惠</router-link>
          </dd>
        </dl>
      </div>

      <div class="fr w20">
        <dl>
          <dt>服务热线</dt>
          <dd>
            <a
              target="_blank"
              href="http://chat56.live800.com/live800/chatClient/chatbox.jsp?companyID=1019891&configID=176606&jid=8419989680&skillId=6657">
              <span class="color-primary font-16"><i class="el-icon-service"></i> 在线客服</span>
            </a>
          </dd>
          <dd>
            工作时间 ( 09:00 - 18:00 )
          </dd>
          <dd>
            官方QQ群：782220336
          </dd>
        </dl>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "footer-comp",
  data () {
    return {}
  },
}
</script>

<style scoped>
#comp-footer {
  padding: 30px 50px 20px;
  background-color: #181b2a;
}
dl {
  margin: 0;
}
dt{
  margin-bottom: 15px;
  font-size: 16px;
}
  dd{
    margin: 0;
    padding: 5px 0;
    color: #61688a;
  }
</style>

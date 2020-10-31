<template>
  <div class="cont-box">
    <div class="cont-title">
      <strong>公告</strong>
    </div>
    <div class="ph-15 font-12">
      <div class="news-item"
           v-for="(news,idx) in newsList"
           :key="idx">
        <div class="pb-5">
          <div class="link mr-0" @click="currentNews = currentNews === idx ? -1 : idx">{{news.title}}</div>
          <div
            v-if="currentNews === idx"
            class="news-content"
            v-html="news.content"></div>
        </div>
        <div class="news-time">{{news.time}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "news-comp",
  data () {
    return {
      newsList: [
        {
          title: 'LAEX老挝数字资产交易全球正式启动公告',
          content: `
<p>尊敬的LAEX会员:</p>
<p>LAEX交易所定于北京时间2018年7月29日00:00正式在全球启动上线。</p>
<p>考虑到币种的流通性、可靠性等因素、确保每一位用户的切身利益和最佳体验，我们严选了以下6大主流币种，作为平台第一批上线币种：BTC（比特币）ETH（以太坊）LTC（莱特币）EOS（柚子）ONT（本体）和AE。
同时还有多重千万豪礼等你拿，详情请见活动公告！</p>
<p>【风险提示】<br>
鉴于各国监管政策的可能变化，包括美国、中国、新加坡等国家与地区的用户，请在参与交易之前详细咨询本国律师，以便严格遵守本扩法律法规，并避免造成不必要的损失。LAEX保留随时终止向可能违反所在国相关法律的用户提供服务的全力。<br>
数字资产交易具有极高的风险，LAEX交易所仅为区块链爱好者提供自由的网上交易平台，对其的投资价值不承担任何审查、担保、赔偿的责任。投资数字资产可能面临价格操纵、项目团队解散、商业价值无法实现、资产丢失、产品开发失败、交易被终止等风险。请您注意控制风险，根据自身风险承受能力决定是否参与。</p>
          `,
          time: '2018-07-27 08:00'
        },
        {
          title: '币币交易区上线公告',
          content: `
<p>亲爱的LAEX用户：</p>
<p>币币交易功能，即将于2018年8月6日震撼上线，敬请期待！</p>
<p>币币交易：主要针对虚拟币和虚拟币之间的交易，以其中一种币作为计价单位去购买其他币种 。币币交易规则是按照价格优先时间优先顺序完成撮合交易。</p>
          `,
          time: '2018-08-04 19:30'
        },
        {
          title: 'OTC法币交易区上线公告',
          content: `
<p>亲爱的LAEX用户：</p>
<p>OTC法币交易功能，即将于2018年8月16日下午14:00正式上线，敬请期待！</p>
<p>OTC法币交易：又叫做场外交易。如果您尚未持有任何数字资产，想将现金兑换成数字货币。在法币交易区，选择合适报价的买家或卖家，通过绑定银行卡/支付宝账号/微信账号支付渠道购买即可获得数字货币。</p>
          `,
          time: '2018-08-16 12:00'
        },
        {
          title: '9月免收交易手续费公告',
          content: `
<p>亲爱的LAEX用户：</p>
<p>LAEX公测活动现已圆满结束，并正式开放所有交易业务。</p>
<p>感谢您一个月以来的陪伴，为此我们决定自今日起至2018年9月30日，所有LAEX实名认证用户可继续享受手续费全免活动。</p>
<p>LAEX还有许多地方需要成长，感谢您对LAEX的支持，期待您的宝贵意见。</p>
`,
          time: '2018-08-31 22:00'
        },
        {
          title: '注册奖励公告',
          content: `
<p>亲爱的LAEX用户：</p>
<p>LAEX交易所注册活动获奖名单已在官网及微信公众平台（微信搜索：LAEX）公布，奖励已经在奔向你们的路上～</p>
<p>凡2018年7月29日—2018年8月31日期间，参与LAEX交易所【会员注册/推荐活动】的实名认证用户，最高可获得300EOS奖励。经LAEX平台核实，已将奖励发放至各位满足条件的账户中，请大家注意查看自己LAEX平台的个人资产（最终数据以LAEX平台统计为准，奖励咨询微信号：LAEX011）。</p>
<p>近期LAEX还会举办中秋、国庆线上惊喜豪礼大派送，详情请持续关注官网或微信公众平台。</p>
`,
          time: '2018-09-13 14:00'
        },

      ].reverse(),
      currentNews: 0
    }
  },
  computed: {},
  watch: {},
  methods: {},
  created () {
  }
}
</script>

<style scoped>
  .news-item{
    padding: 18px 0 5px;
    border-bottom: 1px solid #1e2235;
  }
  .news-time{
    padding-top: 5px;
    text-align: right;
    color: #61688a;
  }
  .news-content{
    margin: -5px -10px;
    padding: 5px 10px;
    /*background-color: #262a42;*/
  }
</style>

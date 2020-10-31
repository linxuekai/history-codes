<template>
  <div>
    <div class="container-box">
      <div class="desc-part clear-fix mt-100">
        <div class="w50 fl text-center mt-60">
          <img src="/static/img/Home/home-img1.png" alt="" class="w50">
        </div>
        <div class="w50 fr">
          <div class="desc-block">
            <h1 class="fw-nm">国家级数字资产交易所</h1>
            <p class="desc-text">
              LAEX平台由老挝国家区块链研究院、老挝国家数字经济特区、<br>
              老挝人民银行共同发起、老挝国家政府批准成立，<br>
              以老挝国家主体作为信誉保障，拥有独立专业的区块链资产研究评估体系。
            </p>
          </div>
        </div>
      </div>

      <div class="desc-part clear-fix mt-50 pv-80 bg-dark">
        <div class="w50 fl">
          <div class="desc-block">
            <h1 class="fw-nm">全球综合性数字资产配置及交易服务</h1>
            <p class="desc-text">
              • 资深的期货、股票交易所以及数字交易平台等领域技术人才<br>
              • 具有丰富的运营管理经验及先进的管理理念的国际化专业运营团队<br>
              • 世界顶尖级安全风控体系及银行系统支持<br>
              • 遍布全球的专业分析官与投资分析师
            </p>
          </div>
        </div>
        <div class="w50 fr text-center mt-80">
          <img src="/static/img/Home/home-img2.png" alt="" class="w50">
        </div>
      </div>

      <div class="desc-part clear-fix mt-100">
        <div class="w50 fl">
          <div class="desc-block">
            <h1 class="fw-nm">企业文化</h1>
            <p class="desc-text">
              理念：让资产更安全，让交易更自由<br>
              愿景：为全球用户提供一个卓越的综合性加密数字资产交易平台<br>
              宗旨：以专业、公正、创新的精神，不断推进全球区块链技术的应用与发展
            </p>
          </div>
        </div>
        <div class="w50 fr text-center mt-60">
          <img src="/static/img/Home/home-img3.png" alt="" class="w50">
        </div>
      </div>
    </div>
    <div class="service-points mt-100">
      <div class="pt-20"></div>
      <h1 class="fw-nm text-center pt-30">
        老挝
        <span class="color-666">／</span>
        中国
        <span class="color-666">／</span>
        韩国
        <span class="color-666">／</span>
        日本
        <span class="color-666">／</span>
        新加坡
      </h1>
      <p class="text-center font-18 opacity-7">
        <span class="line-text relative">
          全球化布局，覆盖各国家和地区的项目拓展及运营管理体系，在多个国家和地区设有独立运营中心
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "exchange-desc-comp",
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created () {
  }
}
</script>

<style scoped>
  .mt-100{
    margin-top: 100px;
  }
  .pv-80{
    padding: 80px 0;
  }
.desc-block {
  margin: 90px auto;
  width: 72%;
}
  .desc-text {
    line-height: 2;
    font-size: 16px;
    color: #a7b6c8;
    margin-top: 30px;
  }
  .service-points {
    height: 412px;
    background: url("/static/img/Home/service-bg.jpg") center center no-repeat;
    background-size: cover;
  }
.line-text:after, .line-text:before {
  content: "";
  position: absolute;
  top: 50%;
  display: inline-block;
  height: 1px;
  width: 181px;
  background: #c7cce6;
  opacity: .3;
}
.line-text:before{
  left: -210px;
}
  .line-text:after{
    right: -210px;
  }
  .bg-dark{
    background-color: #202437;
  }
</style>

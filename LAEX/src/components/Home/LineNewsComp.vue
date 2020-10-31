<template>
  <div class="comp-line-news">
    <ul class="news-menu">
      <li class="news-item">
        <a target="_blank" class="color-normal" href="https://mp.weixin.qq.com/s?__biz=MzU0MzkyMTU2OA==&mid=2247483812&idx=1&sn=7f4cc36b2f10f088d43d8d9357f3cadd&chksm=fb05456bcc72cc7d4ca4aadda2168c2b3090f95d80340bb6d70d807018c3660e32aacc2048b8&scene=0#rd">
          LAEX法币、币币交易指南
        </a>
      </li>
      <li class="news-item">
        <a target="_blank" class="color-normal" href="https://mp.weixin.qq.com/s?__biz=MzU0MzkyMTU2OA==&mid=100000044&idx=1&sn=5eb0468bf93358bdffc9cd44c66fe560&chksm=7b0545e34c72ccf572787871d7b5283732c7cc345d1ae26791ca1fe38097d08ac16c5d112b77&scene=18#rd">
          LAEX全球启动，千万豪礼大放送！
        </a>
      </li>
      <li class="news-item">
        <a target="_blank" class="color-normal" href="https://mp.weixin.qq.com/s?__biz=MzU0MzkyMTU2OA==&mid=100000088&idx=1&sn=c8c86c8fddec88bd358c29e1e9b7de10&chksm=7b0545974c72cc81b440b9b36781c13406311127cc621f15f8d3ef9ee39fac5022679b745aa9&scene=18#rd">
          LAEX全球区块链应用大会圆满落幕
        </a>
      </li>
      <li class="news-item">
        <a target="_blank" class="color-normal" href="https://mp.weixin.qq.com/s?__biz=MzU0MzkyMTU2OA==&mid=100000035&idx=1&sn=13c9beb62f87a2c96d75a361f551a462&chksm=7b0545ec4c72ccfa06159c4056fd9c1e39284037ab5b4dc39a3ade55360faba98ba53c5fb6e2&mpshare=1&scene=1&srcid=0728F6Sc580S7BXbSqp8vDoQ#rd">
          LAEX平台新手指南
        </a>
      </li>
      <li class="news-item">
        <a target="_blank" class="color-normal" href="https://mp.weixin.qq.com/s?__biz=MzU0MzkyMTU2OA==&mid=100000037&idx=1&sn=14f4aae1368c5aba2a1b81f5be8ca9ef&chksm=7b0545ea4c72ccfcba70c4ba4e6d583d596fe55d7db4fc31fa69314b296aaa198735ab85d1ab&mpshare=1&scene=1&srcid=0728cAWh269zY2uR9EHIhpIX#rd">
          LAEX数字资产介绍
        </a>
      </li>

      <li class="news-item link">
        <a target="_blank" class="color-normal" href="https://mp.weixin.qq.com/s?__biz=MzU0MzkyMTU2OA==&mid=100000007&idx=1&sn=e7e3882de220775460ad3865ba87465c&chksm=7b0545c84c72ccde8bac00d42427163bbb235b4c31943031648af763765d168704d872718fa9&mpshare=1&scene=1&srcid=07288tNQXq6NsvaTmtVNDnNk#rd">
          LAEX平台上币说明及申请
        </a>
      </li>
      <li class="news-item">
        <a target="_blank"
           class="color-normal"
           href="https://mp.weixin.qq.com/s?__biz=MzU0MzkyMTU2OA==&mid=2247483752&idx=1&sn=dd30d99ac8863a6c220251be5decd7da&chksm=fb0545a7cc72ccb1cc082164e18bb70224a82b57e491ffdfd9fefb916789d077d8e006eb1607&mpshare=1&scene=1&srcid=0804b9VapMo4UupAZ5irx1YX#rd">
          币币交易、OTC法币交易震撼上线
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "line-ad"
}
</script>

<style scoped>
.comp-line-news {
  height: 60px;
  line-height: 60px;
  background-color: #181b2a;
  text-align: center;
  padding: 0 30px;
}
  .news-menu {
    height: 100%;
    overflow: hidden;
  }
  .news-item {
    display: inline-block;
  }
  .news-item:after{
    content: '/';
    margin: 0 25px;
    color: #61688a;
  }
  .link {
    margin: 0;
  }
</style>

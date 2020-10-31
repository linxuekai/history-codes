<template>
  <div class="banners-comp">
    <el-carousel
      arrow="never"
      :interval="4000"
      trigger="click"
      height="560px">
      <el-carousel-item v-for="(banner, idx) in banners" :key="idx">
        <div class="banner-wrap pointer"
             @click="bannerClick(banner)"
             :style='{background: `url(${banner.bannerUrl}) center center no-repeat`}'></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "banners",
  data () {
    return {
      banners: [
        {
          bannerUrl: '/static/img/Home/leax/banner14.jpg',
          isLocalLink: false,
          linkUrl: 'https://mp.weixin.qq.com/s/Rwba1fgT8elenoX8Bj57cQ'
        },
        {
          bannerUrl: '/static/img/Home/leax/banner13.jpg',
          isLocalLink: false,
          linkUrl: ''
        },
        {
          bannerUrl: '/static/img/Home/leax/banner10.jpg',
          isLocalLink: false,
          linkUrl: 'https://mp.weixin.qq.com/s?__biz=MzU0MzkyMTU2OA==&mid=100000044&idx=1&sn=5eb0468bf93358bdffc9cd44c66fe560&chksm=7b0545e34c72ccf572787871d7b5283732c7cc345d1ae26791ca1fe38097d08ac16c5d112b77&scene=18#rd'
        },
        {
          bannerUrl: '/static/img/Home/leax/banner11.jpg',
          isLocalLink: true,
          linkUrl: '/Pairs'
        },
        {
          bannerUrl: '/static/img/Home/leax/banner12.jpg',
          isLocalLink: false,
          linkUrl: 'https://mp.weixin.qq.com/s?__biz=MzU0MzkyMTU2OA==&mid=100000044&idx=1&sn=5eb0468bf93358bdffc9cd44c66fe560&chksm=7b0545e34c72ccf572787871d7b5283732c7cc345d1ae26791ca1fe38097d08ac16c5d112b77&scene=18#rd'
        },

        // {
        //   bannerUrl: '/static/img/Home/leax/banner8.jpg',
        //   isLocalLink: false,
        //   linkUrl: 'https://mp.weixin.qq.com/s?__biz=MzU0MzkyMTU2OA==&mid=2247483752&idx=1&sn=dd30d99ac8863a6c220251be5decd7da&chksm=fb0545a7cc72ccb1cc082164e18bb70224a82b57e491ffdfd9fefb916789d077d8e006eb1607&mpshare=1&scene=1&srcid=0804b9VapMo4UupAZ5irx1YX#rd'
        // },
        // {
        //   bannerUrl: '/static/img/Home/leax/banner9.jpg',
        //   isLocalLink: false,
        //   linkUrl: 'https://mp.weixin.qq.com/s?__biz=MzU0MzkyMTU2OA==&mid=2247483752&idx=2&sn=499231f82946993ce2ac89c6a5a5ec3e&chksm=fb0545a7cc72ccb193daa7423f55fe85e872d9a14fd8da8a15293dabd9addd805b874ef72d61&mpshare=1&scene=1&srcid=0804sDYd6Ze72Bl2mjMGIpLK#rd'
        // },
        // {
        //   bannerUrl: '/static/img/Home/leax/banner7.jpg',
        //   isLocalLink: false,
        //   linkUrl: ''
        // },
        // {
        //   bannerUrl: '/static/img/Home/leax/banner3.jpg',
        //   isLocalLink: true,
        //   linkUrl: {name: 'Pairs'}
        // },
        // {
        //   bannerUrl: '/static/img/Home/leax/banner5.jpg',
        //   isLocalLink: false,
        //   linkUrl: ''
        // },
        {
          bannerUrl: '/static/img/Home/leax/banner6.jpg',
          isLocalLink: true,
          linkUrl: '/Promotions/LevelPrivilege'
        },
      ]
    }
  },
  methods: {
    bannerClick (banner) {
      if (banner.linkUrl) {
        banner.isLocalLink
          ? this.$router.push(banner.linkUrl)
          : window.open(banner.linkUrl)
      }
    }
  }
}
</script>

<style scoped>
.banner-wrap {
  height: 560px;
  background-size: cover;
}
</style>

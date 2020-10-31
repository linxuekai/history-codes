<template>
  <div>
    <div class="full-screen-fixed">
      <div class="relative-box">
        <div class="left">
          <order-stream></order-stream>
        </div>
        <div class="main">
          <div class="trend">
            <trend></trend>
          </div>
          <div class="operation">
            <operation></operation>
          </div>
        </div>
        <div class="right">
          <price-list></price-list>
          <news></news>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const OrderStream = r => require.ensure([], () => r(require('@/components/Trade/OrderStream.vue')), 'jsGroup-OrderStream')
  const Operation = r => require.ensure([], () => r(require('@/components/Trade/Operation.vue')), 'jsGroup-Operation')
  const PriceList = r => require.ensure([], () => r(require('@/components/Trade/PriceList.vue')), 'jsGroup-PriceList')
  const News = r => require.ensure([], () => r(require('@/components/Trade/News.vue')), 'jsGroup-News')
  const Trend = r => require.ensure([], () => r(require('@/components/Trade/Trend.vue')), 'jsGroup-Trend')

  import {mapState} from 'vuex'

  export default {
    components: {
      OrderStream,
      Operation,
      PriceList,
      News,
      Trend
    },
    computed: {
      ...mapState({
        connReady: state => state.connReady
      })
    },
    watch: {
      connReady (newVal) {
        if (newVal === true) {
          this.$store.dispatch('currentMarketInit')
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      next(_this => {
        if (_this.connReady === true) {
          _this.$store.dispatch('currentMarketInit')
        }
      })
    }
  }
</script>

<style scoped>
  .full-screen-fixed{
    position: absolute;
    top:0;
    left:0;
    padding-top: 50px;
    width: 100%;
    height:100%;
    box-sizing: border-box;
    min-width: 1080px;
  }
  .relative-box{
    position: relative;
    height:100%;
    width: 100%;
  }
  .left{
    position: absolute;
    top:0;
    left:0;
    width: 190px;
    height: 100%;
    box-sizing: border-box;
    border:1px solid #5B7990;
  }
  .right{
    position: absolute;
    top:0;
    right:0;
    float: right;
    width:220px;
    box-sizing: border-box;
    border:1px solid #5B7990;
    height: auto;
    min-height: 100%;
  }
  .main{
    width: auto;
    margin:0 220px 0 190px;
    height: 100%;
    box-sizing: border-box;
    /*min-width: 576px;*/
  }
  .trend{
    height:40%;
    position: relative;
  }
  .operation{
    height:60%;
  }
</style>

<style>
  .buy-text {
    color: #05a651;
  }

  .sale-text {
    color: #c5510c;
  }
</style>
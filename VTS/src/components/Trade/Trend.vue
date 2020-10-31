<template>
  <div class="wrap">
    <!--<div class='trend-inner'>TREND</div>-->
    <div id="container"></div>
  </div>
</template>

<script>
  import {run} from '@/k'
  import {mapState} from 'vuex'
  const Highcharts = require('highcharts/highstock')
  export default {
    data () {
      return {
        kData: [],
        hStock: null
      }
    },
    computed: {
      ...mapState({
        isLogged: state => state.isLogged,
        currentMarketData: state => state.trade.currentMarketData,
        marketData: state => state.trade.marketData
      })
    },
    watch: {
      currentMarketData (newVal) {
        let {stamp, buy} = newVal.p
        if (this.hStock !== null) {
          this.hStock.series[0].addPoint([stamp * 1000, buy])
        }
      },
      isLogged () {
        this.init()
      }
    },
    methods: {
      async init () {
        if (this.isLogged !== 'checking') {
          await this.$store.dispatch('getMarketData')
          this.hStock = run(this.marketData, Highcharts)
        }
      }
    },
    created () {
      this.init()
    }
  }
</script>

<style scoped>
  .wrap {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  }

  #container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
</style>

<style>
  .highcharts-range-selector-buttons text:first-child{
    color: #fff !important;
    fill: #fff !important;
  }
  .highcharts-axis-labels.highcharts-yaxis-labels>text{
    color: #fff !important;
    fill: #fff !important;
    font-weight: bold;
    font-size: 14px !important;
  }
  .highcharts-axis-labels.highcharts-xaxis-labels>text{
    color: #ccc !important;
    fill: #ccc !important;
  }
</style>

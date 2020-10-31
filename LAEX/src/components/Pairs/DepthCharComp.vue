<template>
  <div class="cont-box">
    <div class="cont-title">深度图</div>
    <div class="block-height">
      <div id="chart-root"></div>
    </div>
  </div>
</template>

<script>
import {promiseBreaker} from '../../assets/js/tools'
import {createNamespacedHelpers} from 'vuex'
const {mapState, mapGetters} = createNamespacedHelpers('pairs')
export default {
  name: "depth-char-comp",
  data () {
    return {
      chart: null,
      chartReady: promiseBreaker()
    }
  },
  computed: {
    ...mapState([
      'baseCoin',
      'targetCoin',
      'marketDepth'
    ]),
    ...mapGetters([
      'klineSymbol',
      'pricePoint',
      'sizePoint'
    ]),
  },
  watch: {
    klineSymbol () {
      this.chart.setOption({
        tooltip: {
          formatter: params => {
            let isBuySeries = params.length === 2
            let data = params[0].data
            // console.log(data)
            let color = isBuySeries ? 'color-buy' : 'color-sell'
            return `委托价<span class="${color} ml-15">${(+params[0].axisValue).toFixed(this.pricePoint)}</span> ${this.baseCoin}<br/>
                    累积量<span class="${color} ml-15">${data.toFixed(this.sizePoint)}</span> ${this.targetCoin}</span>`
          },
        },
        textStyle: {
          color: '#61688a'
        },
        xAxis: {
          name: `委单价格（${this.baseCoin}）`,
          data: []
        },
        yAxis: {
          name: `累积量（${this.targetCoin}）`
        },
        series: [
          {
            data: []
          },
          {
            data: []
          }
        ]
      })
    },
    marketDepth: {
      deep: true,
      immediate: true,
      async handler () {
        await this.chartReady
        let asksTotal = 0
        let bidsTotal = 0
        let bidsData = []
        let asksData = []
        let xData = []
        let {asks, bids} = this.marketDepth
        for (let i = 0, size = asks.length - 1; i <= size; i++) {
          xData.unshift(asks[i].p)
          asksTotal += asks[size - i].a
          asksData.push(asksTotal)
        }
        for (let i = 0, size = bids.length - 1; i <= size; i++) {
          xData.unshift(bids[i].p)
          bidsTotal += bids[i].a
          bidsData.unshift(bidsTotal)
        }
        this.chart.setOption({
          xAxis: {
            data: xData
          },
          series: [
            {data: bidsData},
            {data: new Array(bidsData.length).concat(asksData)}
          ]
        })
      }
    }
  },
  methods: {
    chartInit () {
      // 基于准备好的dom，初始化echarts实例
      let chart = this.chart = window.echarts.init(document.getElementById('chart-root'));

      // 指定图表的配置项和数据
      let option = {
        animation: false,
        // smooth: false,
        grid: {
          top: 40,
          bottom: 55,
          left: 50,
          right: 66
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          backgroundColor: '#262a42',
          padding: [10, 15],
          axisPointer: {
            type: 'line',
            lineStyle: {
              type: 'dashed',
              color: '#61688a'
            }
          },
          formatter: params => {
            let isBuySeries = params.length === 2
            let data = params[0].data
            // console.log(data)
            let color = isBuySeries ? 'color-buy' : 'color-sell'
            return `委托价<span class="${color} ml-15">${(+params[0].axisValue).toFixed(this.pricePoint)}</span> ${this.baseCoin}<br/>
                    累积量<span class="${color} ml-15">${data.toFixed(this.sizePoint)}</span> ${this.targetCoin}</span>`
          },
          textStyle: {
            color: '#61688a'
          }
        },
        textStyle: {
          color: '#61688a'
        },
        xAxis: {
          name: `委单价格（${this.baseCoin}）`,
          nameTextStyle: {
            padding: [15, 0, 0]
          },
          nameLocation: 'center',
          type: 'category',
          axisLabel: {
            rotate: 15
          },
          data: []
        },
        yAxis: {
          name: `累积量（${this.targetCoin}）`,
          axisLabel: {
            // formatter (value) {
            //   return value.toFixed(0)
            // }
          },
          type: 'value',
          position: 'right',
          splitNumber: 0,
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: 'buy',
            type: 'line',
            showSymbol: false,
            emphasis: {
              itemStyle: {
                color: '#589065',
                // borderWidth: 0,
                borderColor: '#fff'
              }
            },
            lineStyle: {
              width: 1,
              color: '#589065'
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#589065' // 0% 处的颜色
                }, {
                  offset: 1, color: '#181b2a' // 100% 处的颜色
                }]
              }
            },
            data: []
          },
          // {
          //   type: 'line',
          //   data: [
          //     [0, 0],
          //     [0, 1]
          //   ],
          //   tooltip: {
          //     show: false
          //   }
          // },
          {
            name: 'sell',
            type: 'line',
            showSymbol: false,
            emphasis: {
              itemStyle: {
                color: '#ae4e54',
                // borderWidth: 0,
                borderColor: '#fff'
              }
            },
            lineStyle: {
              width: 1,
              color: '#ae4e54'
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#ae4e54' // 0% 处的颜色
                }, {
                  offset: 1, color: '#181b2a' // 100% 处的颜色
                }]
              }
            },
            data: []
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      chart.setOption(option);
      this.chartReady.resolve()
    },
  },
  mounted () {
    this.chartInit()
    let resizeTimer = null
    window.addEventListener('resize', () => {
      if (resizeTimer) {
        clearTimeout(resizeTimer)
      }
      resizeTimer = setTimeout(this.chart.resize, 500)
    })
  }
}
</script>

<style scoped>
  #chart-root{
    height: 100%;
    overflow: hidden;
  }
</style>

<template>
  <div class="trade-view-comp cont-box">
    <div class="cont-title pair-title">
      <h2 class="font-20 display-ib">
        {{targetCoin}}/{{baseCoin}}<span class="ml-15">{{curMkt.close | sliceTo(pricePoint)}}</span>
      </h2>
      <span class="ml-15">
        <span class="color-weak">涨幅</span> <span :class="curMkt | changeClass">{{(curMkt.close / curMkt.open - 1) * 100 | signed}}%</span>
      </span>
      <span class="ml-15">
        <span class="color-weak">高</span> {{curMkt.high | sliceTo(pricePoint)}}
      </span>
      <span class="ml-15">
        <span class="color-weak">低</span> {{curMkt.low | sliceTo(pricePoint)}}
      </span>
      <span class="ml-15">
        <span class="color-weak">24H量</span> {{curMkt.vol | sliceTo(2)}} {{targetCoin}}
      </span>
    </div>
    <div id="trade-view-root">
    </div>
  </div>
</template>

<script>
import {promiseBreaker} from "../../assets/js/tools"
import Datafeeds from '@a/js/myDatafeeds'

import {createNamespacedHelpers} from 'vuex'
const {mapGetters, mapState} = createNamespacedHelpers('pairs')
// import Datafeeds from '../assets/js/datafeeds'

console.log(Datafeeds)
export default {
  name: 'kline-comp',
  data () {
    return {
      chartReady: promiseBreaker()
    }
  },
  computed: {
    ...mapState([
      'baseCoin',
      'targetCoin',
      'allPairSymbols'
    ]),
    ...mapGetters([
      'klineSymbol',
      'pricePoint',
      'sizePoint'
    ]),
    curMkt () {
      let {
        baseCoin,
        targetCoin,
        allPairSymbols
      } = this
      return allPairSymbols[baseCoin]
        ? allPairSymbols[baseCoin][targetCoin] || {}
        : {}
    }
  },
  watch: {
    async klineSymbol (symbol) {
      let chart = await this.chartReady
      chart.setSymbol(symbol)
    }
  },
  methods: {
    tradingViewInit () {
      this.chartReady = promiseBreaker()
        let widget = new window.TradingView.widget({ // eslint-disable-line
        width: '100%',
        height: '100%',
        fullscreen: false,
        symbol: this.klineSymbol,
        interval: localStorage.getItem('tradingview.interval') || '15',
        container_id: 'trade-view-root',
        datafeed: new Datafeeds(this.klineSymbol),
        library_path: '/static/chartTool/',
        locale: 'zh',
        timezone: 'Asia/Hong_Kong',
        drawings_access: { type: 'black', tools: [ { name: 'Regression Trend' } ] },
        disabled_features: [
          // 'main_series_scale_menu',
          'pane_context_menu',
          'header_fullscreen_button',
          'go_to_date',
          'header_compare',
          'header_interval_dialog_button',
          'header_screenshot',
          'header_symbol_search',
          'header_undo_redo',
          // 'legend_context_menu',
          // 'show_hide_button_in_legend',
          // 'show_interval_dialog_on_key_press',
          // 'snapshot_trading_drawings',
          'symbol_info',
          'volume_force_overlay',
          'items_favoriting',
          'header_layouttoggle',
          // 'chart_crosshair_menu',
          // 'open_account_manager',
          // 'study_dialog_search_control',
          'symbol_search_hot_key',
          'control_bar',
          // 'header_settings',
          'save_chart_properties_to_local_storage',
          'display_market_status',
          'timeframes_toolbar',
          'use_localstorage_for_settings',
        ],
        enabled_features: [
          'keep_left_toolbar_visible_on_small_screens',
          'disable_resolution_rebuild',
          // 'study_templates',
          // 'timeframes_toolbar',
          // 'dont_show_boolean_study_arguments',
          'hide_last_na_study_output',
          // 'same_data_requery',
          'side_toolbar_in_fullscreen_mode',
          'hide_left_toolbar_by_default'
        ],
        studies_overrides: {
        },
        charts_storage_api_version: '1.1',
        client_id: 'tradingview.com',
        user_id: 'public_user_id',
        loading_screen: {
          backgroundColor: '#181b2a'
        },
        toolbar_bg: '#181b2a',
        overrides: {
          volumePaneSize: "small",
          'paneProperties.legendProperties.showStudyValues': false,
          'paneProperties.legendProperties.showStudyArguments': false,
          'paneProperties.legendProperties.showStudyTitles': false,
          'paneProperties.legendProperties.showSeriesTitle': false,
          'paneProperties.background': '#181b2a',
          'paneProperties.vertGridProperties.color': '#1f2943',
          'paneProperties.horzGridProperties.color': '#1f2943',
          'symbolWatermarkProperties.transparency': 90,
          'scalesProperties.textColor': '#61688a',
          // 实心k
          'mainSeriesProperties.candleStyle.upColor': '#589065',
          'mainSeriesProperties.candleStyle.downColor': '#ae4e54',
          'mainSeriesProperties.candleStyle.drawWick': true,
          'mainSeriesProperties.candleStyle.drawBorder': true,
          'mainSeriesProperties.candleStyle.borderColor': '#C400CB',
          'mainSeriesProperties.candleStyle.borderUpColor': '#589065',
          'mainSeriesProperties.candleStyle.borderDownColor': '#ae4e54',
          'mainSeriesProperties.candleStyle.wickUpColor': '#589065',
          'mainSeriesProperties.candleStyle.wickDownColor': '#ae4e54',
          // 空心k
          'mainSeriesProperties.hollowCandleStyle.upColor': '#589065',
          'mainSeriesProperties.hollowCandleStyle.downColor': '#ae4e54',
          'mainSeriesProperties.hollowCandleStyle.drawWick': true,
          'mainSeriesProperties.hollowCandleStyle.drawBorder': true,
          'mainSeriesProperties.hollowCandleStyle.borderColor': '#C400CB',
          'mainSeriesProperties.hollowCandleStyle.borderUpColor': '#589065',
          'mainSeriesProperties.hollowCandleStyle.borderDownColor': '#ae4e54',
          'mainSeriesProperties.hollowCandleStyle.wickUpColor': '#589065',
          'mainSeriesProperties.hollowCandleStyle.wickDownColor': '#ae4e54',
          'scalesProperties.lineColor': '#61688a',
        },
        custom_css_url: './night.css'
      })
      widget.onChartReady(() => {
        let chart = widget.activeChart()
        this.chartReady.resolve(chart)
        chart.createStudy('Moving Average', false, false, [5], null, {
          'Plot.color': '#965fc4',
        })
        chart.createStudy('Moving Average', false, false, [10], null, {
          'Plot.color': '#84aad5',
        })
        chart.createStudy('Moving Average', false, false, [30], null, {
          'Plot.color': '#55b263',
        })
        // chart.createStudy('Moving Average', false, false, [60], null, {
        //   'Plot.color': '#b7248a',
        // })
        // chart.createStudy('MACD')
        chart.onIntervalChanged().subscribe(null, (interval, obj) => {
          localStorage.setItem('tradingview.interval', interval)
        })
      })
    }
  },
  mounted () {
    this.tradingViewInit()
  }
}
</script>

<style>
  #trade-view-root {
    height: 450px;
  }
  .pair-title {
    padding: 10px 15px;
  }
</style>

/* eslint-disable */

function run (data, Highcharts) {
  // create the chart
  Highcharts.setOptions({
    global: {
      useUTC: true
    },
    lang: {
      loading: "正在加载...",
      months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      shortMonths: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      shortWeekdays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      weekdays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      rangeSelectorZoom: "查看周期："
    }
  });
  let hStock = Highcharts.stockChart('container', {
    navigator: {
      height: 24
    },
    chart: {
      backgroundColor: 'transparent',
      spacing: [5, 5, 4, 5],
      borderColor: '#5B7990'
    },
    credits: {enabled: false},
    scrollbar: {
      height: 4,
      enabled: false
    },
    xAxis: {
      crosshair: {
        dashStyle: 'dash'
      }
    },
    yAxis: {
      floor: 0.00,
      // tickAmount: 4,
      // tickInterval: 0.01,
      showFirstLabel: true,
      showLastLabel: true,
      labels: {
        format: '{value} VS'
      }
    },
    rangeSelector: {
      allButtonsEnabled: true,
      buttons: [
        {
          type: 'hour',
          count: 1,
          text: '1小时'
        }, {
          type: 'day',
          count: 1,
          text: '1天'
        }, {
          type: 'month',
          count: 1,
          text: '1个月'
        }, {
          type: 'all',
          count: 1,
          text: '全部'
        }
      ],
      selected: 2,
      inputEnabled: false
    },
    series: [{
      name: 'VTS',
      type: 'area',
      data: data,
      gapSize: 0,
      tooltip: {
        valueSuffix: ' VS'
      },
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops: [
          [0, Highcharts.getOptions().colors[0]],
          [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
        ]
      },
      threshold: null
    }]
  });
  return hStock
}
export {
  run
}

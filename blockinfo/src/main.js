// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto'
import Vue from 'vue'
import store from '@/store'
import App from './App'
import router from './router'
import axios from '@/axios'
import {addZero} from './assets/js/tool'
import {Loading} from 'element-ui'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
Vue.use(Loading)

let lang = window.localStorage.getItem('lang') || (navigator.browserLanguage ? navigator.browserLanguage : navigator.language)
let locale = lang === 'zh-CN' ? 'zh-CN' : 'en-US'

const i18n = new VueI18n({
  locale,
  messages: {
    'zh-CN': require('./lang/zh-CN.json'),
    'en-US': require('./lang/en-US.json')
  }
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.filter('timeString', function (st) {
  var t = new Date(st * 1000)
  var year = t.getFullYear()
  var month = t.getMonth() + 1
  var date = t.getDate()
  var hour = t.getHours()
  var minute = t.getMinutes()
  var second = t.getSeconds()
  return year + '-' + addZero(month) + '-' + addZero(date) + ' ' + addZero(hour) + ':' + addZero(minute) + ':' + addZero(second)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  i18n,
  template: '<App/>',
  components: { App }
})

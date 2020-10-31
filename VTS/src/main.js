
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import store from './store'
Vue.prototype.$store = store

import localforage from '../static/js/localforage.min'
window.webStore = localforage.createInstance({
  name: 'VTS'
})

import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh-CN',
  messages: {
    'zh-CN': require('./lang/zh-CN.json'),
    'en-US': require('./lang/en-US.json'),
    'id-ID': require('./lang/en-US.json')
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */

if (navigator.userAgent.toLowerCase().indexOf('mobile') === -1) {
  window.App = new Vue({ // eslint-disable-line
    el: '#app',
    router,
    i18n,
    template: '<App/>',
    components: { App }
  })
} else {
  document.getElementById('app').innerHTML = '【威特金融帝国】提示：很抱歉，本平台不支持手机/移动端访问，请您在PC/电脑端使用，非常感谢您对本平台的支持！'
  alert('不支持移动端访问！')
}


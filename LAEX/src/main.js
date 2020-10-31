import '@/axios'
import './assets/js/vueExtend'
import './assets/js/globalComponents'
import './assets/js/wsBus'
import '../src/assets/global.css'

import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

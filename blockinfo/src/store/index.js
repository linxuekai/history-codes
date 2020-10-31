import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    type: window.localStorage.getItem('coinType') || 'SC'
  },
  mutations: {
    changeType (state, newType) {
      state.type = newType
      window.localStorage.setItem('coinType', newType)
    }
  }
})

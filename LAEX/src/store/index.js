import Vue from 'vue'
import Vuex from 'vuex'
import {$post, $get} from '../axios'

// import modules start
import pairs from './modules/pairs'
import user from './modules/user'
// import models end

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    pairs
  },
  state: {
    errMsg: '',
    errMsgTimeout: null,
    previewImgUrl: null,
    platformPayments: [],
    feeRates: JSON.stringify(localStorage.getItem('feeRates')) || {},
    showLoading: false
  },
  mutations: {
    updateErrMsg (state, msg) {
      state.errMsg = msg
    },
    updateShowLoading (state, isShow) {
      state.showLoading = isShow
    },
    updateErrMsgTimeout (state, timeoutId, isFocus) {
      !isFocus && clearTimeout(state.errMsgTimeout)
      state.errMsgTimeout = timeoutId
    },
    updatePreviewImgUrl (state, url) {
      state.previewImgUrl = url
    },
    updatePlatformPayments (state, data) {
      state.platformPayments = data
    },
    updateFeeRates (state, obj) {
      state.feeRates = obj
      localStorage.setItem('feeRates', JSON.stringify(obj))
    }
  },
  actions: {
    showErrMsg ({commit}, msg) {
      commit('updateErrMsg', msg)
      let timeoutId = setTimeout(() => {
        commit('updateErrMsg', '')
      }, 3000)
      commit('updateErrMsgTimeout', timeoutId)
    },
    async getPlatformPayments ({commit}) {
      let res = await $post('/v1/c2c/order/payInfo')
      if (res._statusOk) commit('updatePlatformPayments', res.data)
    },
    async getFeeRates ({commit}) {
      let res = await $get('/v1/coinInfo')
      if (res._statusOk) {
        let obj = {}
        res.data.forEach(item => {
          obj[item.coin] = item
        })
        commit('updateFeeRates', obj)
      }
    }
  }
})

export default store

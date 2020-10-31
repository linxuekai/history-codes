import {$fetch} from '@/axios'

export default {
  namespaced: true,
  state: {
    uid: null,
    inviteCode: '',
    nviteNum: 0,
    authStatus: null,
    refreshToken: localStorage.getItem('refreshToken'),
    nickname: localStorage.getItem('nickname'),
    hasTradePwd: false,
    email: null,
    mobile: null,
    legalBalance: {
      coin: {},
      legal: {}
    },
    payMethods: [],
    coinAddresses: {},
    dontPairsTip: !!JSON.parse(localStorage.getItem('dontPairsTip'))
  },
  getters: {
    authorized (state) {
      return !!state.refreshToken && !!state.nickname
    }
  },
  mutations: {
    updateGetBalance (state, list) {
      state.balance = list
    },
    updateRefreshToken (state, refreshToken) {
      state.refreshToken = refreshToken
      refreshToken
        ? localStorage.setItem('refreshToken', refreshToken)
        : localStorage.removeItem('refreshToken')
    },
    updateNickname (state, nickname) {
      state.nickname = nickname
      nickname
        ? localStorage.setItem('nickname', nickname)
        : localStorage.removeItem('nickname')
    },
    updateUserInfo (state, data) {
      Object.assign(state, data)
    },
    updateLegalBalance (state, data) {
      state.legalBalance = data
    },
    updateCoinAddresses (state, {coin, address}) {
      state.coinAddresses = Object.assign({}, state.coinAddresses, {[coin]: address})
    },
    updateDontPairsTip (state, dotTip) {
      state.dontPairsTip = dotTip
      localStorage.setItem('dontPairsTip', dotTip)
    }
  },
  actions: {
    async logout ({commit}, toHome = true) {
      await $fetch('/v1/user/logout')
        .catch(() => null)
      commit('updateRefreshToken', null)
      commit('updateNickname', null)
      if (toHome) location.href = '/'
    },
    async getUserInfo ({commit}) {
      let res = await $fetch('/v1/user/userinfo')
      res._statusOk && commit('updateUserInfo', res.data)
    },
    async getLegalBalance ({commit}) {
      let res = await $fetch('/v1/account/legal')
      if (res._statusOk) {
        let obj = {
          coin: {},
          legal: {}
        }
        res.data.coin.forEach(oCoin => {
          obj.coin[oCoin.coin] = oCoin
        })
        res.data.legal.forEach(oCoin => {
          obj.legal[oCoin.coin] = oCoin
        })
        commit('updateLegalBalance', obj)
      }
    }
  }
}

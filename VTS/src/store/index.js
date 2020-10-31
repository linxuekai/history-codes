/**
 * Created by linxuekai on 2017/8/3.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import sub from './sub'
import trade from './trade'
import news from './news'
import proxy from '@/signalr'

Vue.use(Vuex)
let store = new Vuex.Store({
  modules: {
    trade,
    sub,
    news
  },
  state: {
    tempPwd: '',
    bigAccount: {},
    currentAccountData: {},
    currentProfileNav: '',
    connReady: false,
    isLogged: 'checking',
    accountLocking: true,
    UnLockOption: {},
    theme: {
      theme: '蓝色',
      color: '#143d5f',
      navColor: '#0e244d'
    }
  },
  getters: {
    userName (state) {
      return state.currentAccountData.UserName
        ? state.currentAccountData.UserName
        : ''
    },
    currentCid (state) {
      return state.currentProfileNav.split('/')[0]
    },
    currentProfileName (state) {
      return state.currentAccountData.profilename
    }
  },
  mutations: {
    storeTempPwd (state, pwd) {
      state.tempPwd = pwd
    },
    getAccountData (state, {bigAccount, currentAccountData, currentProfileNav}) {
      state.bigAccount = bigAccount
      state.currentAccountData = currentAccountData
      state.currentProfileNav = currentProfileNav
    },
    connReady (state) {
      state.connReady = true
    },
    logInDone (state, statu) {
      state.isLogged = statu
    },
    Unlock (state, locking) {
      state.accountLocking = locking || false
    },
    unlockTimeOption (state, option) {
      state.UnLockOption = option
    },
    upDateTheme (state, value) {
      state.theme = {
        theme: value.theme,
        color: value.color,
        navColor: value.navColor
      }
    }
  },
  actions: {
    async getAccountData ({commit, dispatch}) {
      dispatch('getUnlockOption')
      let currentProfileNav = await window.webStore.getItem('currentProfile')
      if (currentProfileNav !== null) {
        let arr = currentProfileNav.split('/')
        let bigAccount = await window.webStore.getItem(arr[0])
        let currentAccountData = bigAccount[arr[1]]
        commit('getAccountData', {bigAccount, currentAccountData, currentProfileNav})
        return {
          currentID: arr[0],
          activeProfile: arr[1]
        }
      } else {
        return false
      }
    },
    async unlockAccount ({commit, state}, pwd) {
      let res = await proxy.invoke('UnLock', pwd, state.UnLockOption.second || 60 * 60)
      if (res.code === 'StatusOk') {
        commit('Unlock')
      }
      return res
    },
    async lockAccount ({commit}) {
      let res = await proxy.invoke('Lock')
      if (res.code === 'StatusOk') {
        commit('Unlock', true)
      }
      return res
    },
    async getUnlockOption ({commit}) {
      let option = await window.webStore.getItem('UnlockOption') || {times: '1小时', second: 60 * 60}
      commit('unlockTimeOption', option)
    },
    changeTheme ({commit, state}) {
      if (document.getElementById('account-nav')) {
        document.getElementById('account-nav').style.backgroundColor = state.theme.navColor
      }
    },
    themeInit ({commit, state}) {
      if (!window.localStorage.VTSTheme) {
        window.localStorage.VTSTheme = JSON.stringify(state.theme)
      } else {
        commit('upDateTheme', JSON.parse(window.localStorage.VTSTheme))
      }
      let curTheme = JSON.parse(window.localStorage.VTSTheme)
      document.getElementsByClassName('el-menu--dark')[0].style.backgroundColor = curTheme.navColor
      document.getElementsByClassName('navbar-wrap')[0].style.backgroundColor = curTheme.navColor
      document.getElementsByTagName('body')[0].style.backgroundColor = curTheme.color
      if (document.getElementById('account-nav')) {
        document.getElementById('account-nav').style.backgroundColor = curTheme.navColor
      }
    }
  }
})

export default store

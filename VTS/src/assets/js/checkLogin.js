/**
 * Created by linxuekai on 2017/8/15.
 */
import axios from '@/axios'
import proxy from '@/signalr'
import store from '@/store'
export default async function () {
  let isLogged = await store.dispatch('getAccountData')
  if (isLogged) {
    let currentAccountData = store.state.currentAccountData
    document.cookie = `SaltKey=${currentAccountData.SaltKey}`
    document.cookie = `UnuniqueCid=${isLogged.currentID}`
    document.cookie = `ActivateProfile=${currentAccountData.profilename}`
    document.cookie = `UserName=${currentAccountData.UserName}`
    await axios.post('/Account/SignIn')
  }
  await window.$.connection.hub.start()
  if (isLogged) {
    proxy.invoke('IsLocked').then(({data}) => {
      if (data === false) { store.commit('Unlock') }
    })
  }
  store.commit('connReady')
  store.commit('logInDone', !!isLogged)
  store.dispatch('GetBalance')
  store.dispatch('TakeMarket')
  store.dispatch('themeInit')
  setInterval(() => {
    proxy.invoke('HubPong')
  }, 1000 * 60 * 3)
}

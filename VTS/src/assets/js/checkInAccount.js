/**
 * Created by linxuekai on 2017/9/4.
 */
import axios from '@/axios'
export default async (res, _this) => {
  if (res.data.code === 'StatusOk') {
    let bigAccount = _this.$store.state.bigAccount
    let currentCid = _this.$store.state.currentAccountData.UnuniqueCid
    let account = res.data.data
    let {UnuniqueCid: Cid, profilename} = account
    let accountData = {[profilename]: account}
    let resultCid, resultAccountData
    if (account.MainAccount || !Object.keys(bigAccount).length) {
      resultCid = Cid
      bigAccount = resultAccountData = accountData
    } else {
      bigAccount[profilename] = account
      resultCid = currentCid
      resultAccountData = bigAccount
    }
    await Promise.all([
      window.webStore.setItem(resultCid, resultAccountData),
      window.webStore.setItem('currentProfile', `${resultCid}/${profilename}`),
      axios.post('/Account/SignIn')
    ])
    window.$.connection.hub.stop()
    await window.$.connection.hub.start()
    _this.$store.commit('getAccountData', {
      bigAccount,
      currentAccountData: bigAccount[profilename],
      currentProfileNav: `${resultCid}/${profilename}`
    })
    _this.$store.commit('logInDone', true)
    _this.$store.dispatch('GetBalance')
  }
}

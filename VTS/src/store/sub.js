import conn from '@/signalr'
export default {
  state: {
    coinBanlance: [],
    banlanceData: [],
    password: '',
    savePassword: '',
    isLocking: true,
    tipBox: '',
    isPostPassword: false,
    unLock: {
      Password: '',
      UnLockSecs: '600'
    },
    showBox: {
      showWithdrawalsBox: false,
      showExchangeBox: false
    },
    showExchangeBox: false,
    withdrawals: {
      Password: '',
      Address: '',
      Amount: '',
      CoinName: '',
      Comment: ''
    },
    transfer: {
      Password: '',
      Address: '',
      Amount: '',
      CoinName: 'VS',
      Comment: ''
    },
    exchange: {
      Password: '',
      SourceCoinName: '',
      TargetCoinName: '6',
      amount: ''
    }
  },
  getters: {
    getVSAddress: (state) => {
      let len = state.coinBanlance.length
      let res = ''
      for (var i = 0; i < len; i++) {
        if (state.coinBanlance[i].CoinName === 'VS') {
          res = state.coinBanlance[i].Address
          return res
        }
      }
    }
  },
  mutations: {
    getBanlance (state, coinBanlance) {
      state.coinBanlance = coinBanlance
    },
    banlanceList (state, coinBanlance) {
      state.banlanceData = coinBanlance
    },
    withdrawals (state, coinBanlance) {
      state.coinBanlance = coinBanlance
    }
  },
  actions: {
    async GetBalance ({commit}) {
      let res = await conn.invoke('GetBalance')
      if (res.code === 'StatusOk') {
        commit('getBanlance', res.data)
      }
      return res
    },
    async withdrawals ({commit}, list) {
      let res = await conn.invoke('SendOut', list.Password, list.Address, list.Amount, list.CoinName, list.Comment)
      return res.code
    },
    async Transfer ({commit}, list) {
      let res = await conn.invoke('SendOut', list.Password, list.Address, list.Amount, list.CoinName, list.Comment)
      return res.code
    },
    async Transaction ({commit}, list) {
      let res = await conn.invoke('Transaction', list.Types, list.PageIndex, list.Number)
      return res
    },
    async Exchange ({state, commit}, list) {
      let res = await conn.invoke('Exchange', list.Password, list.SourceCoinName, list.TargetCoinName, list.amount)
      return res.code
    },
    async Config ({state, commit}, list) {
      let res = await conn.invoke('Config')
      return res
    }
  }
}

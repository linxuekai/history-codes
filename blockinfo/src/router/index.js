import Vue from 'vue'
import Router from 'vue-router'
import TransactionRecord from '../components/TransactionRecord'
import BlockNumber from '../components/BlockNumber'
import hashDetail from '../components/hashDetail'
import businessDetail from '../components/businessDetail'
import address from '../components/address'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TransactionRecord',
      component: TransactionRecord
    },
    {
      path: '/BlockNumber',
      name: 'BlockNumber',
      component: BlockNumber
    },
    {
      path: '/hashDetail',
      name: 'hashDetail',
      component: hashDetail
    },
    {
      path: '/businessDetail',
      name: 'businessDetail',
      component: businessDetail
    },
    {
      path: '/address',
      name: 'address',
      component: address
    },
    {
      path: '/wallet_api',
      name: 'wallet_api',
      component: () => import('@/components/WalletApi')
    }
  ]
})

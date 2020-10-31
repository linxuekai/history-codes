import Vue from 'vue'
import '@/assets/js/filters'
import store from "@/store";
import {inputNumberCorector} from "./tools"

import {
  loginPasswordValidator,
  tradePasswordValidator,
} from './validators'
const oLoginPasswordValidator = loginPasswordValidator()
const otradePasswordValidator = tradePasswordValidator()

const proto = Vue.prototype

proto.log = console.log

proto.$filter = Vue.filter

proto.$inputNumberCorector = inputNumberCorector

proto.$showErrMsg = msg => store.dispatch('showErrMsg', msg)

proto.$preview = url => store.commit('updatePreviewImgUrl', url)

proto.$showLoading = isLoading => store.commit('updateShowLoading', isLoading)

proto.$getUserInfo = () => store.dispatch('user/getUserInfo')

proto.$getLegalBalance = () => store.dispatch('user/getLegalBalance')

proto.$loginPassword = info => proto.$prompt(`${info || ''} 请输入登录密码`, '账户安全验证', {
  inputType: 'password',
  showCancelButton: false,
  closeOnClickModal: false,
  inputPattern: oLoginPasswordValidator.pattern,
  inputErrorMessage: oLoginPasswordValidator.message
})

proto.$tradePassword = info => proto.$prompt(`${info || ''} 请输入资金密码`, '资金安全验证', {
  inputType: 'password',
  showCancelButton: false,
  closeOnClickModal: false,
  inputPattern: otradePasswordValidator.pattern,
  inputErrorMessage: otradePasswordValidator.message
})

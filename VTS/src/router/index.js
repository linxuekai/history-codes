import Vue from 'vue'
import Router from 'vue-router'
// import axios from '@/axios'
const Home = r => require.ensure([], () => r(require('@/components/Home/index.vue')), 'jsGroup-Home')
const Register = r => require.ensure([], () => r(require('@/components/Register/index.vue')), 'jsGroup-Register')
const RegisterStep1 = r => require.ensure([], () => r(require('@/components/Register/Register-step1.vue')), 'jsGroup-Register')
const RegisterStep2 = r => require.ensure([], () => r(require('@/components/Register/Register-step2.vue')), 'jsGroup-Register-Backup')
const RegisterStep3 = r => require.ensure([], () => r(require('@/components/Register/Register-step3.vue')), 'jsGroup-Register-Backup')
const Account = r => require.ensure([], () => r(require('@/components/Account/index.vue')), 'jsGroup-Account')
const Transfer = r => require.ensure([], () => r(require('@/components/Transfer/index.vue')), 'jsGroup-Transfer')
const Trade = r => require.ensure([], () => r(require('@/components/Trade/index.vue')), 'jsGroup-Trade')
const Financing = r => require.ensure([], () => r(require('@/components/Financing/index.vue')), 'jsGroup-Financing')
// const UserInfo = r => require.ensure([], () => r(require('@/components/Account/UserInfo.vue')), 'jsGroup-UserInfo')
const Summary = r => require.ensure([], () => r(require('@/components/Account/Summary.vue')), 'jsGroup-Summary')
const SshSetting = r => require.ensure([], () => r(require('@/components/Account/SshSetting.vue')), 'jsGroup-SshSetting')
const PwdModify = r => require.ensure([], () => r(require('@/components/Account/PwdModify.vue')), 'jsGroup-PwdModify')
const Security = r => require.ensure([], () => r(require('@/components/Account/Security.vue')), 'jsGroup-Security')
const Pocket = r => require.ensure([], () => r(require('@/components/Account/Pocket.vue')), 'jsGroup-Pocket')
const Settings = r => require.ensure([], () => r(require('@/components/Settings/index.vue')), 'jsGroup-Settings')
const SettingsGeneral = r => require.ensure([], () => r(require('@/components/Settings/General.vue')), 'jsGroup-Settings')
const SettingsSubAccount = r => require.ensure([], () => r(require('@/components/Settings/SubAccount.vue')), 'jsGroup-SubAccount')
const SettingsAccount = r => require.ensure([], () => r(require('@/components/Settings/Account.vue')), 'jsGroup-Account')
const SettingsBackup = r => require.ensure([], () => r(require('@/components/Settings/Backup.vue')), 'jsGroup-Backup')
const Help = r => require.ensure([], () => r(require('@/components/Help/index.vue')), 'jsGroup-Help')
const HelpRegister = r => require.ensure([], () => r(require('@/components/Help/Register.vue')), 'jsGroup-HelpRegister')
const HelpTrade = r => require.ensure([], () => r(require('@/components/Help/Trade.vue')), 'jsGroup-HelpTrade')
const HelpTransfer = r => require.ensure([], () => r(require('@/components/Help/Transfer.vue')), 'jsGroup-HelpTransfer')
const HelpPassword = r => require.ensure([], () => r(require('@/components/Help/Password.vue')), 'jsGroup-HelpPassword')
const NewsNotice = r => require.ensure([], () => r(require('@/components/News/Notice.vue')), 'jsGroup-NewsNotice')
const NewsNoticeDetail = r => require.ensure([], () => r(require('@/components/News/NoticeDetail.vue')), 'jsGroup-NewsNoticeDetail')
const NewsInformation = r => require.ensure([], () => r(require('@/components/News/Information.vue')), 'jsGroup-NewsInformation')
const NewsInformationDetail = r => require.ensure([], () => r(require('@/components/News/InformationDetail.vue')), 'jsGroup-NewsInformationDetail')

Vue.use(Router)
let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {rejectLoggedUser: true}
    }, {
      path: '/Register',
      component: Register,
      children: [
        {
          path: '',
          name: 'RegisterStep1',
          component: RegisterStep1
        }, {
          path: 'Backup',
          name: 'RegisterStep2',
          component: RegisterStep2
        }, {
          path: 'Already',
          name: 'RegisterStep3',
          component: RegisterStep3
        }
      ]
    }, {
      path: '/Account',
      component: Account,
      children: [
        {
          path: '',
          name: 'Pocket',
          component: Pocket
        }, {
          path: 'Summary',
          name: 'Summary',
          component: Summary
        }, {
          path: 'PwdModify',
          name: 'PwdModify',
          component: PwdModify
        }, {
          path: 'Security',
          name: 'Security',
          component: Security
        }, {
          path: 'sshSetting',
          name: 'sshSetting',
          component: SshSetting
        }
      ],
      meta: {requireLoggedIn: false}
    }, {
      path: '/Transfer',
      name: 'Transfer',
      component: Transfer,
      meta: {requireLoggedIn: false}
    }, {
      path: '/Trade',
      name: 'Trade',
      component: Trade,
      meta: {requireLoggedIn: false}
    }, {
      path: '/Financing',
      name: 'Financing',
      component: Financing,
      meta: {requireLoggedIn: false}
    }, {
      path: '/Settings',
      component: Settings,
      children: [
        {
          path: 'General',
          name: 'SettingsGeneral',
          component: SettingsGeneral
        }, {
          path: 'SubAccount',
          name: 'SettingsSubAccount',
          component: SettingsSubAccount
        }, {
          path: 'Account',
          name: 'SettingsAccount',
          component: SettingsAccount
        }, {
          path: 'Backup',
          name: 'SettingsBackup',
          component: SettingsBackup
        }
      ],
      meta: {requireLoggedIn: false}
    }, {
      path: '/Help',
      component: Help,
      children: [
        {
          path: 'Register',
          name: 'HelpRegister',
          component: HelpRegister
        }, {
          path: 'Trade',
          name: 'HelpTrade',
          component: HelpTrade
        }, {
          path: 'Transfer',
          name: 'HelpTransfer',
          component: HelpTransfer
        }, {
          path: 'Password',
          name: 'HelpPassword',
          component: HelpPassword
        }
      ]
    }, {
      path: '/News/Notice',
      name: 'NewsNotice',
      component: NewsNotice
    }, {
      path: '/News/NoticeDetail/:NoticeID',
      name: 'NewsNoticeDetail',
      component: NewsNoticeDetail
    }, {
      path: '/News/Information',
      name: 'NewsInformation',
      component: NewsInformation
    }, {
      path: '/News/InformationDetail/:InformationID',
      name: 'NewsInformationDetail',
      component: NewsInformationDetail
    }, {
      path: '*',
      redirect: '/Account'
    }
  ]
})
//
// router.beforeEach(async (to, from, next) => {
//   // 强制密码更改后重新备份账户
//   let {data: {code, data}} = await axios.post('/Account/IsSync')
//   if (code === 'StatusOk') {
//     if (data === false && to.name !== 'SettingsBackup') {
//       alert('危险！您已更改了此账号密码并未进行备份，请先下载账户备份文件，才可访问并操作其他页面！')
//       next('/Settings/Backup')
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

export default router

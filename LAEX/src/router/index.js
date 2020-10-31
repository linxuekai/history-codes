import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

const l = isLoading => store.commit('updateShowLoading', isLoading)

const Home = r => {
  l(1)
  require.ensure([], () => {
    r(require('@p/Home'))
    l(0)
  }, 'mainPage')
}

const Register = r => {
  l(1)
  require.ensure([], () => {
    r(require('@p/Register'))
    l(0)
  }, 'mainPage')
}

const Login = r => {
  l(1);
  require.ensure([], () => {
    r(require('@p/Login'))
    l(0)
  }, 'mainPage')
}

const Pairs = r => {
  l(1)
  require.ensure([], () => {
    r(require('@p/Pairs'))
    l(0)
  }, 'mainPage')
}

const Trade = r => {
  l(1)
  require.ensure([], () => {
    r(require('@p/Trade'))
    l(0)
  }, 'mainPage')
}

const ForgetPassword = r => {
  l(1)
  require.ensure([], () => {
    r(require('@p/ForgetPassword'))
    l(0)
  }, 'mainPage')
}

const Finance = r => {
  l(1)
  require.ensure([], () => {
    r(require('@p/Finance/Index'))
    l(0)
  }, 'Finance')
}
const CtcWallet = r => require.ensure([], () => r(require('@p/Finance/CtcWallet')), 'Finance')
const OtcWallet = r => require.ensure([], () => r(require('@p/Finance/OtcWallet')), 'Finance')
const TransactionLog = r => require.ensure([], () => r(require('@p/Finance/TransactionLog')), 'Finance')

const UserCenter = r => {
  l(1)
  require.ensure([], () => {
    r(require('@p/UserCenter/Index'))
    l(0)
  }, 'UserCenter')
}
const UserInfo = r => require.ensure([], () => r(require('@p/UserCenter/UserInfo')), 'UserCenter')
const UserAuth = r => require.ensure([], () => r(require('@p/UserCenter/UserAuth')), 'UserCenter')
const ModifyPassword = r => require.ensure([], () => r(require('@p/UserCenter/ModifyPassword')), 'UserCenter')
const BindMobile = r => require.ensure([], () => r(require('@p/UserCenter/BindMobile')), 'UserCenter')
const BindEmail = r => require.ensure([], () => r(require('@p/UserCenter/BindEmail')), 'UserCenter')
const SetTradePassword = r => require.ensure([], () => r(require('@p/UserCenter/SetTradePassword')), 'UserCenter')

const ServiceAgreement = r => {
  l(1)
  require.ensure([], () => {
    r(require('@p/ServiceAgreement/Index'))
    l(0)
  }, 'ServiceAgreement')
}
const UserAgreement = r => require.ensure([], () => r(require('@p/ServiceAgreement/UserAgreement')), 'ServiceAgreement')
const PrivacyPolicy = r => require.ensure([], () => r(require('@p/ServiceAgreement/PrivacyPolicy')), 'ServiceAgreement')
const Disclaimer = r => require.ensure([], () => r(require('@p/ServiceAgreement/Disclaimer')), 'ServiceAgreement')
const LegalNotices = r => require.ensure([], () => r(require('@p/ServiceAgreement/LegalNotices')), 'ServiceAgreement')

const About = r => {
  l(1)
  require.ensure([], () => {
    r(require('@p/About/Index'))
    l(0)
  }, 'About')
}
const AboutLAEX = r => require.ensure([], () => r(require('@p/About/AboutLAEX')), 'About')
const CoinApplication = r => require.ensure([], () => r(require('@p/About/CoinApplication')), 'About')
const ContactUs = r => require.ensure([], () => r(require('@p/About/ContactUs')), 'About')
const RateDescription = r => require.ensure([], () => r(require('@p/About/RateDescription')), 'About')

const Promotions = r => {
  l(1)
  require.ensure([], () => {
    r(require('@p/Promotions/Index'))
    l(0)
  }, 'Promotions')
}
const DepositInterest = r => require.ensure([], () => r(require('@p/Promotions/DepositInterest')), 'Promotions')
const LevelPrivilege = r => require.ensure([], () => r(require('@p/Promotions/LevelPrivilege')), 'Promotions')
const RegisterReward = r => require.ensure([], () => r(require('@p/Promotions/RegisterReward')), 'Promotions')

const Guide = r => {
  l(1)
  require.ensure([], () => {
    r(require('@p/Guide/Index'))
    l(0)
  }, 'Guide')
}
const BeginnersGuide = r => require.ensure([], () => r(require('@p/Guide/BeginnersGuide')), 'Guide')
const DigitalCurrencyIntroduction = r => require.ensure([], () => r(require('@p/Guide/DigitalCurrencyIntroduction')), 'Guide')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Pairs',
      name: 'Pairs',
      component: Pairs
    },
    {
      path: '/Trade',
      redirect: '/Trade/USDT'
    },
    {
      path: '/Trade/:coin',
      name: 'Trade',
      component: Trade
    },
    {
      path: '/ForgetPassword',
      name: 'ForgetPassword',
      component: ForgetPassword
    },
    {
      path: '/Finance',
      component: Finance,
      meta: {
        name: '个人资产'
      },
      children: [
        {
          path: '',
          redirect: 'CtcWallet',
        },
        {
          path: 'CtcWallet',
          name: 'CtcWallet',
          component: CtcWallet,
          meta: {
            name: '币币账户'
          }
        },
        {
          path: 'OtcWallet',
          name: 'OtcWallet',
          component: OtcWallet,
          meta: {
            name: '法币账户'
          }
        },
        {
          path: 'TransactionLog',
          name: 'TransactionLog',
          component: TransactionLog,
          meta: {
            name: '转账记录'
          }
        },
      ]
    },
    {
      path: '/UserCenter',
      component: UserCenter,
      meta: {
        name: '账户中心'
      },
      children: [
        {
          path: '',
          redirect: 'UserInfo'
        },
        {
          path: 'UserInfo',
          name: 'UserInfo',
          component: UserInfo,
          meta: {
            name: '用户信息'
          }
        },
        {
          path: 'UserAuth',
          name: 'UserAuth',
          component: UserAuth,
          meta: {
            name: '身份认证'
          }
        },
        {
          path: 'ModifyPassword',
          name: 'ModifyPassword',
          component: ModifyPassword,
          meta: {
            name: '修改登录密码'
          }
        },
        {
          path: 'BindMobile',
          name: 'BindMobile',
          component: BindMobile,
          meta: {
            name: '绑定手机'
          }
        },
        {
          path: 'BindEmail',
          name: 'BindEmail',
          component: BindEmail,
          meta: {
            name: '绑定邮箱'
          }
        },
        {
          path: 'SetTradePassword',
          name: 'SetTradePassword',
          component: SetTradePassword,
          meta: {
            name: '设置资金密码'
          }
        },
      ]
    },
    {
      path: '/ServiceAgreement',
      component: ServiceAgreement,
      meta: {
        name: '条款'
      },
      children: [
        {
          path: '',
          redirect: 'UserAgreement'
        },
        {
          path: 'UserAgreement',
          component: UserAgreement,
          name: 'UserAgreement',
          meta: {
            name: '用户协议'
          }
        },
        {
          path: 'PrivacyPolicy',
          component: PrivacyPolicy,
          name: 'PrivacyPolicy',
          meta: {
            name: '隐私条款'
          }
        },
        {
          path: 'Disclaimer',
          component: Disclaimer,
          name: 'Disclaimer',
          meta: {
            name: '免责声明'
          }
        },
        {
          path: 'LegalNotices',
          component: LegalNotices,
          name: 'LegalNotices',
          meta: {
            name: '法律申明'
          }
        },
      ]
    },
    {
      path: '/About',
      component: About,
      meta: {
        name: '关于'
      },
      children: [
        {
          path: '',
          redirect: 'AboutLAEX'
        },
        {
          path: 'AboutLAEX',
          component: AboutLAEX,
          name: 'AboutLAEX',
          meta: {
            name: '关于LAEX'
          }
        },
        {
          path: 'CoinApplication',
          component: CoinApplication,
          name: 'CoinApplication',
          meta: {
            name: '上币申请'
          }
        },
        {
          path: 'ContactUs',
          component: ContactUs,
          name: 'ContactUs',
          meta: {
            name: '联系我们'
          }
        },
        {
          path: 'RateDescription',
          component: RateDescription,
          name: 'RateDescription',
          meta: {
            name: '费率说明'
          }
        },
      ]
    },
    {
      path: '/Promotions',
      component: Promotions,
      meta: {
        name: '优惠活动'
      },
      children: [
        {
          path: '',
          redirect: 'RegisterReward'
        },
        {
          path: 'RegisterReward',
          component: RegisterReward,
          name: 'RegisterReward',
          meta: {
            name: '注册送币'
          }
        },
        {
          path: 'DepositInterest',
          component: DepositInterest,
          name: 'DepositInterest',
          meta: {
            name: '存币生息'
          }
        },
        {
          path: 'LevelPrivilege',
          component: LevelPrivilege,
          name: 'LevelPrivilege',
          meta: {
            name: '级别特权'
          }
        }
      ]
    },
    {
      path: '/Guide',
      component: Guide,
      meta: {
        name: '指南'
      },
      children: [
        {
          path: '',
          redirect: 'BeginnersGuide'
        },
        {
          path: 'BeginnersGuide',
          component: BeginnersGuide,
          name: 'BeginnersGuide',
          meta: {
            name: '新手指南'
          }
        },
        {
          path: 'DigitalCurrencyIntroduction',
          component: DigitalCurrencyIntroduction,
          name: 'DigitalCurrencyIntroduction',
          meta: {
            name: '数字资产介绍'
          }
        }
      ]
    },

    {
      path: '*',
      redirect: '/'
    }
  ]
})

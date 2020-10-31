<template>
  <div id="page-user-info">
    <div class="cont-box">
      <div class="cont-title">基本信息</div>
      <div>
        <div class="item">
          <div class="item-label">账号</div>
          <div class="item-info">{{mobile || email}}</div>
        </div>
        <div class="item">
          <div class="item-label">UID</div>
          <div class="item-info">{{uid}}</div>
        </div>
        <div class="item">
          <div class="item-label">昵称</div>
          <div class="item-info">{{nickname}}</div>
          <div class="item-right">
            <a @click="modifyNickname">修改</a>
          </div>
        </div>
        <div class="item">
          <div class="item-label">登录密码</div>
          <div class="item-info">**********</div>
          <div class="item-right">
            <router-link :to="{name: 'ModifyPassword'}">修改</router-link>
          </div>
        </div>
        <div class="item">
          <div class="item-label">
            <i
              v-if="!hasTradePwd"
              class="el-icon-warning color-danger mr-5"></i>
            资金密码
          </div>
          <div class="item-info">{{hasTradePwd ? '******' : '未设置'}}</div>
          <div class="item-right">
            <router-link :to="{name: 'SetTradePassword'}">
              {{hasTradePwd ? '重置' : '设置'}}
            </router-link>
          </div>
        </div>
        <div class="item">
          <div class="item-label">注册邀请链接</div>
          <div class="display-ib w60 underline">{{inviteLink}}</div>
          <div class="item-right">
            <a @click="copyInviteCode">复制</a>
          </div>
        </div>
        <div class="item">
          <div class="item-label">已邀请人数</div>
          <div class="display-ib">{{nviteNum}}</div>
        </div>
        <div class="item">
          <div class="item-label">币币交易通知</div>
          <div class="item-right">
            <el-switch class="ph-10" v-model="needTip"></el-switch>
          </div>
        </div>
      </div>
    </div>
    <payment-methods-comp />
    <div class="cont-box">
      <div class="cont-title">双重身份认证</div>
      <div>
        <div class="item">
          <div class="item-label">安全等级</div>
          <div class="item-info">
            <div class="bar-bg">
              <div class="bar-percent" :class="fullSafety?'w90':'w50'"></div>
            </div>
            <span class="ml-15">{{fullSafety ? '高' : '中'}}</span>
          </div>
          <div class="item-tip">
            <span v-if="!mobile">建议绑定手机</span>
            <span v-if="!email">建议绑定邮箱</span>
          </div>
        </div>
        <div class="item">
          <div class="item-label">
            <i class="mr-5"
               :class="!!email ? 'el-icon-success color-success' : 'el-icon-warning color-danger'"></i>
            邮箱
          </div>
          <div class="item-info">{{email || '未绑定'}}</div>
          <div class="item-tip">用于提币、找回密码、修改安全设置、管理API时进行安全验证。</div>
          <div class="item-right">
            <router-link :to="{name: 'BindEmail'}">
              {{!!email ? '修改' : '绑定'}}
            </router-link>
          </div>
        </div>
        <div class="item">
          <div class="item-label">
            <i class="mr-5"
               :class="!!mobile ? 'el-icon-success color-success' : 'el-icon-warning color-danger'"></i>
            手机
          </div>
          <div class="item-info">{{mobile || '未绑定'}}</div>
          <div class="item-tip">用于提币、找回密码、修改安全设置、管理API时进行安全验证。</div>
          <div class="item-right">
            <router-link :to="{name: 'BindMobile'}">
              {{!!mobile ? '修改' : '绑定'}}
            </router-link>
          </div>
        </div>

      </div>
    </div>
    <div class="cont-box">
      <div class="cont-title">登录历史（最近5次）</div>
      <div>
        <table class="log-table">
          <tbody class="log-tbody">
          <tr class="color-weak">
            <td class="w25">时间</td>
            <td class="w25">登录方式</td>
            <td class="w25">IP</td>
            <td class="w25">登录地点</td>
          </tr>
          <tr v-for="log in logHistory" :key="log.date">
            <td>{{log.loginTime | utcString}}</td>
            <td>{{log.loginType}}</td>
            <td>{{log.ip}}</td>
            <td>{{log.ipName}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import PaymentMethodsComp from '@c/UserCenter/PaymentMethodsComp'

export default {
  name: "user-info",
  components: {
    PaymentMethodsComp
  },
  data () {
    return {
      logHistory: []
    }
  },
  computed: {
    fullSafety () {
      return !!this.email && !!this.mobile
    },
    inviteLink () {
      return `${location.origin}/#/register?ref=${this.inviteCode}`
    },
    ...mapState('user', [
      'mobile',
      'email',
      'uid',
      'nickname',
      'hasTradePwd',
      'inviteCode',
      'nviteNum',
      'dontPairsTip',
    ]),
    needTip: {
      get () {
        return !this.dontPairsTip
      },
      set (isTip) {
        this.$store.commit('user/updateDontPairsTip', !isTip)
      }
    }
  },
  watch: {},
  methods: {
    async modifyNickname () {
      let {value} = await this.$prompt('请输入新昵称', {
        showCancelButton: false,
        closeOnClickModal: false,
        inputPattern: /^.{1,20}$/,
        inputErrorMessage: '昵称长度限制1~20位'
      })
      if (value.trim()) {
        let res = await this.$fetch('/v1/user/modify', {
          nickname: value.trim()
        })
        if (res._statusOk) {
          this.$showErrMsg('昵称修改成功')
          this.$getUserInfo()
        }
      } else {
        this.$showErrMsg('未输入新昵称，请重试')
      }
    },
    copyInviteCode () {
      this.$copyText(this.inviteLink).then(
        () => this.$showErrMsg('邀请链接已复制，发送给朋友进入注册完成邀请'),
        () => this.$showErrMsg('浏览器不支持自动复制，请手动选择文字并"ctrl+c"进行复制')
      )
    },
  },
  created () {
    this.$getUserInfo()
    this.$fetch('/v1/user/latelyLogin')
      .then(res => {
        if (res._statusOk) this.logHistory = res.data
      })
  }
}
</script>

<style>
  #page-user-info .item{
    line-height: 48px;
    border-bottom: 1px solid #1f2943;
  }
  #page-user-info .item-label,
  #page-user-info .item-info,
  #page-user-info .item-tip{
  display: inline-block;
}
  #page-user-info .item-label{
  width: 15%;
}
  #page-user-info .item-info{
  width: 27%;
}

  #page-user-info .log-table{
  line-height: 40px;
}
  #page-user-info .log-tbody td{
  border-bottom: 1px solid #1f2943;
}
  #page-user-info .item-tip{
  width: 40%;
  color: #61688a;
}
  #page-user-info .item-right{
    float: right;
  }
  #page-user-info .item-right a{
    padding: 0 10px;
  }
  #page-user-info .bar-bg{
    display: inline-block;
    height: 12px;
    width: 50%;
    background-color: #1e2235;
  }
  #page-user-info .bar-percent{
    height: 12px;
    background-color: #7a98f7;
  }
</style>

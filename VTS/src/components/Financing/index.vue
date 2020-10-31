<template>
  <div>
    <div class="financing">
      <div class="f-s-24">获取VS</div>
      <div class="financing-nameTips">您可以从他人或者交易所获得VS，您只需要提供您的VS地址：<span v-text="VSAddress"></span></div>
      <div class="f-s-24 m-t-50">充值/提现</div>
      <div class="tableTitle">
        <div class="tableTh">资产</div>
        <div class="tableTh">充值地址</div>
        <div class="tableTh">余额</div>
        <div class="tableTh">提现 / 兑换</div>
        <!--<div class="tableTh">兑换</div>-->
      </div>
      <div class="tableSplit"></div>
      <div class="clearBoth">
        <div class="tableTr" v-for="(value,index) in banlanceData" :key="value.Address">
          <div class="tableTd f-s-18" v-text="value.CoinName"></div>
          <div class="tableTd">
            <span v-text="value.Address" class="addressSpan" :id="value.Address"></span>
            <button class="copyBtn ps-static" @click="copy(value.Address)" data-clipboard-action="copy"
                    data-clipboard-target="span">复制
            </button>
          </div>
          <div class="tableTd">{{value.Balance | toFixed2}}</div>
          <div class="tableTd w-150">
            <button @click="openWithdrawalsBox(value,'showWithdrawalsBox')" v-show="value.isWithdrawal === true">提现
            </button>
            <button @click="openWithdrawalsBox(value,'showExchangeBox')" v-show="value.isExchange === true">兑换</button>
          </div>
        </div>
      </div>
      <div class="f-s-24 m-t-100">
        <span>近期活动</span>
        <div class="financingDropBox">
          <div class="dropDownSel" @click="openDropDownList">
            <span v-text="curSel"></span>
            <i class="el-icon-caret-bottom f-s-12"></i>
          </div>
          <div class="dropDownBox" :style="{ background: theme.color}" v-show="isOpenDropDownList">
            <div class="dropDownItem" @click="chooseItem(value)" v-for="(value,index) in filterItem"
                 :key="value.condition" v-text="value.condition"></div>
          </div>
        </div>
      </div>
      <div class="tableTitle">
        <div class="tableTh w-150">操作</div>
        <div class="tableTh">信息</div>
        <div class="tableTh w-150">日期</div>
      </div>
      <div class="tableSplit"></div>
      <div v-if="transactionHistoryList">
        <div class="tableTr" v-for="(value,index) in transactionHistoryList" :key="index">
          <div class="tableTd w-150" v-text="value.c + value.t"></div>
          <div class="tableTd">
            <span v-html="value.descript" :id="value.v"></span>
          </div>
          <div class="tableTd w-250">{{value.d | filterTime}}</div>
        </div>
        <infinite-loading :on-infinite="getHistory" spinner="waveDots" infinite-scroll-distance="100"
                          ref="infiniteLoading" v-if="isLogged === true">
          <span slot="no-results" class="c-fff">没有更多消息了</span>
          <span slot="no-more" class="c-fff">没有更多消息了</span>
        </infinite-loading>
      </div>
      <div v-else>暂无数据</div>
    </div>

    <div class="financingModal" v-show="showBox.showWithdrawalsBox===true">
      <div class="financingContent">
        <!--<i class="el-icon-close" @click="closeMessageBox('showWithdrawalsBox')"></i>-->
        <img class="el-icon-close" :src="require('@/assets/img/modalClose.png')"
             @click="closeMessageBox('showWithdrawalsBox')">
        <div class="financingContent-wrap">
          <div class="messageBoxTitle"><span v-text="withdrawals.CoinName"></span> 提现</div>
          <div class="messageBoxContentItem">
            <div class="contentItemLeft">提现金额</div>
            <div class="contentItemRight">
              <input type="number" v-model="withdrawals.Amount" placeholder="请输入金额...">
            </div>
          </div>
          <div class="messageBoxContentItem">
            <div class="contentItemLeft l-s-31">地址</div>
            <div class="contentItemRight">
              <input type="text" id="Withdrawals" v-model="withdrawals.Address" placeholder="请输入提现地址">
            </div>
          </div>
          <div class="messageBoxContentItem">
            <div class="contentItemLeft l-s-8">手续费</div>
            <div class="contentItemRight">
              <input type="text" placeholder="0.00" :value="withdrawals.Amount*withdrawalsFee | toFixed2" readonly>
            </div>
          </div>
          <div class="messageBoxContentItem">
            <div class="contentItemLeft l-s-8">备注</div>
            <div class="contentItemRight">
              <input type="text" placeholder="您对该笔交易的备注" v-model="withdrawals.Comment">
            </div>
          </div>

          <div class="messageBoxContentItem">
            <div class="contentItemLeft l-s-8"></div>
            <div class="contentItemRight rechageBtnBox">
              <pwd-comp title="提现"
                        :disabled="!withdrawals.Amount||!withdrawals.Address"
                        @getPwd="withdrawal"
                        text="请输入密码确认提现">
                <button class="rechageBtn" @click="showTips" v-loading="loading.withdrawalsBtn">确定</button>
              </pwd-comp>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="financingModal" v-show="showBox.showExchangeBox===true">
      <div class="financingContent">
        <!--<i class="el-icon-close" @click="closeMessageBox('showWithdrawalsBox')"></i>-->
        <img class="el-icon-close" :src="require('@/assets/img/modalClose.png')"
             @click="closeMessageBox('showExchangeBox')">
        <div class="financingContent-wrap">
          <div class="messageBoxTitle"><span v-text="postData.SourceCoinName"></span> 兑换</div>

          <div class="messageBoxContentItem">
            <div class="contentItemLeft l-s-31"></div>
            <div class="contentItemRight">
              <input class="inputBoxLeft" type="number" v-model="postData.amount" placeholder="请输入金额...">
              <img :src="require('@/assets/img/exchange.png')">
              <div class="inputBoxRight">
                <input type="text" :value="targetAmount" readonly>
                <div class="dropDownList">
                  <el-dropdown @command="chooseCoin" trigger="click">
                    <span class="el-dropdown-link">
                      <span v-text="postData.TargetCoinName"></span><i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-for="(value,index) in coinList" :command="value.coin" :key="index"
                                        v-text="value.coin"></el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
            </div>
          </div>

          <div class="messageBoxContentItem">
            <div class="contentItemLeft l-s-8">手续费</div>
            <div class="contentItemRight">
              <input type="text" placeholder="0.00" readonly :value="postData.amount*fee | toFixed2">
            </div>
          </div>

          <div class="messageBoxContentItem">
            <div class="contentItemLeft">交易密码</div>
            <div class="contentItemRight">
              <input type="password" placeholder="请输入交易密码" v-model="postData.Password">
            </div>
          </div>

          <div class="messageBoxContentItem">
            <div class="contentItemLeft l-s-8"></div>
            <div class="contentItemRight">
              <button class="rechageBtn" @click="exchange" v-loading="loading.exchangeBtn">确定</button>
              <!--<password-button action="exchange">
                <button class="rechageBtn">确定</button>
              </password-button>-->
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Clipboard from '../../../static/js/clipboard.min'
  import InfiniteLoading from 'vue-infinite-loading'
  import { Message, Dropdown, DropdownMenu, DropdownItem } from 'element-ui'
  import { mapState } from 'vuex'
  import Vue from 'vue'
  import resCodeMap from '@/assets/js/resCodeMap'
  import PwdComp from '@/components/RedoPwdComp.vue'

  [Dropdown, DropdownMenu, DropdownItem].forEach(comp => { Vue.use(comp) })

  export default {
    name: 'financing',
    components: {
      InfiniteLoading,
      PwdComp
    },
    data () {
      return {
        VSAddress: '',
        coinList: [
          {coin: 'SC'},
          {coin: 'VS'}
        ],
        curCoin: 'VS',
        coinSort: {
          'VS': {
            sortIndex: 0,
            isWithdrawal: true,
            isExchange: false
          },
          'VTS': {
            sortIndex: 1,
            isWithdrawal: false,
            isExchange: false
          },
          'VT': {
            sortIndex: 2,
            isWithdrawal: false,
            isExchange: true
          },
          'VC': {
            sortIndex: 3,
            isWithdrawal: false,
            isExchange: false
          },
          'SC': {
            sortIndex: 4,
            isWithdrawal: true,
            isExchange: false
          }
        },
        isOpenDropDownList: false,
        curSel: '全部',
        filterItem: [
          {condition: '全部', filterIndex: ['0', '1', '2', '3', '4', '5']},
          {condition: '充值', filterIndex: ['0', '2', '3', '4']},
          {condition: '提现', filterIndex: ['1', '5']},
          {condition: '转出', filterIndex: ['1', '5']}
        ],
        postData: {
          Password: '',
          SourceCoinName: '',
          TargetCoinName: 'VS',
          amount: ''
        },
        transactionHistoryList: [],
        types: {
          '0': '兑换转入',
          '1': '兑换转出',
          '2': '内部转入',
          '3': '区块转入',
          '4': '外部转入',
          '5': '区块转出'
        },
        postTransaction: {
          Types: ['0', '1', '2', '3', '4', '5'],
          PageIndex: 1,
          Number: 10
        },
        loading: {
          withdrawalsBtn: false,
          exchangeBtn: false,
          scrollLoading: true
        },
        ExhchangeFee: 0
      }
    },
    computed: {
      fee () {
        return this.postData.TargetCoinName === 'SC'
          ? this.ExhchangeFee
          : 0
      },
      withdrawalsFee () {
        return this.withdrawals.CoinName === 'SC'
          ? this.ExhchangeFee
          : 0
      },
      targetAmount () {
        let tA = this.postData.amount * (1 - this.fee)
        return tA.toFixed(2)
      },
      ...mapState({
        banlanceData: state => state.sub.banlanceData,
        connReady: state => state.connReady,
        password: state => state.sub.password,
        showBox: state => state.sub.showBox,
        showExchangeBox: state => state.sub.showExchangeBox,
        withdrawals: state => state.sub.withdrawals,
        isLogged: state => state.isLogged,
        theme: state => state.theme
      })
    },
    filters: {
      filterTime (value) {
        value = value.split('.')[0]
        value = value.replace('T', ' ')
        return value
      },
      toFixed2 (value) {
        value = value.toFixed(2)
        return value
      }
    },
    beforeRouteEnter: (to, from, next) => {
      next(vm => {
        if (vm.$store.state.connReady === true && vm.$store.state.isLogged === true) {
          vm.init()
          vm.getHistory()
          vm.config()
        }
      })
    },
    watch: {
      isLogged (newVal, oldVal) {
        if (newVal === true && this.$store.state.connReady === true) {
          this.init()
          this.getHistory()
          this.config()
        }
      }
    },
    methods: {
      async config () {
//        let res = await this.$store.dispatch('Config')
//        this.ExhchangeFee = res.ExhchangeFee
        // SC提现兑换手续费为0
        this.ExhchangeFee = 0
      },
      async init () {
        let res = await this.$store.dispatch('GetBalance')
        this.VSAddress = this.$store.getters.getVSAddress
        var coinList = []
        if (res.code === 'StatusOk' && res.data instanceof Array) {
          res.data.forEach((item) => {
            let coin = coinList[this.coinSort[item.CoinName].sortIndex] = this.coinSort[item.CoinName]
            coin.CoinName = item.CoinName
            coin.Address = item.Address
            coin.Balance = item.Balance
          })
          this.$store.commit('banlanceList', coinList)
        }
      },
      async getHistory (value) {
        if (!this.loading.scrollLoading) {
          return
        }
        this.loading.scrollLoading = false
        if (value) {
          this.postTransaction = {
            Types: value.filterIndex,
            PageIndex: 1,
            Number: 10
          }
          this.transactionHistoryList = []
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        }
        let res = await this.$store.dispatch('Transaction', this.postTransaction)
        if (res.code === 'StatusOk' && res.data.d instanceof Array) {
          res.data.d.forEach((item) => {
            item.t = this.types[item.t]
            item.descript = '將' + item.v + '枚' + item.c + item.t + '到地址' + '<br>' + item.a
          })
          this.transactionHistoryList = this.transactionHistoryList.concat(res.data.d)
          if (this.postTransaction.PageIndex >= res.data.t) {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
          } else {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
            this.postTransaction.PageIndex++
          }
        } else {
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
        }
        this.loading.scrollLoading = true
      },
      openWithdrawalsBox (value, modal) {
        this.showBox[modal] = true
        this.postData.SourceCoinName = value.CoinName
        this.withdrawals.CoinName = value.CoinName
        this.withdrawals.Address = ''
        this.withdrawals.Amount = ''
        this.withdrawals.Comment = ''
        this.postData.Password = ''
        this.postData.amount = ''
      },
      closeMessageBox (obj) {
        this.showBox[obj] = false
      },
      chooseCoin (command) {
        this.curCoin = command
        this.postData.TargetCoinName = command
      },
      copy (addr) {
        var clipboard = new Clipboard('.copyBtn', {
          // 通过target指定要复印的节点
          target: function () {
            return document.querySelector('div')
          },
          text: function () {
            return addr
          }
        })
        clipboard.on('success', function (e) {
          Message.success('地址已复制，可粘贴')
        })
        clipboard.on('error', function (e) {
          Message.warning('您的浏览器不支持复制，请使用 Ctrl+c 进行复制')
        })
      },
      openDropDownList () {
        this.isOpenDropDownList = !this.isOpenDropDownList
      },
      chooseItem (value) {
        this.curSel = value.condition
        this.isOpenDropDownList = false
        this.getHistory(value)
      },
      async withdrawal (password) {
        if (this.loading.withdrawalsBtn) {
          return
        }
        this.loading.withdrawalsBtn = true
        this.withdrawals.Password = password
        this.withdrawals.Amount = parseFloat(this.withdrawals.Amount)
        let res = await this.$store.dispatch('withdrawals', this.withdrawals)
        if (res === 'StatusOk') {
          Message.success('提现成功')
          this.init()
          this.getHistory()
          this.showBox.showWithdrawalsBox = false
        } else if (resCodeMap[res]) {
          Message.warning(resCodeMap[res])
        } else {
          Message.warning('提现失败')
        }
        this.loading.withdrawalsBtn = false
      },
      async exchange () {
        if (this.loading.exchangeBtn) {
          return
        }
        let {amount, Password} = this.postData
        if (!amount) {
          Message.warning('请输入兑换数量')
          return
        }
        if (!Password) {
          Message.warning('请输入密码')
          return
        }
        this.loading.exchangeBtn = true
        this.postData.amount = parseFloat(this.postData.amount)
        let res = await this.$store.dispatch('Exchange', this.postData)
        if (res === 'StatusOk') {
          Message.success('兑换成功')
          this.init()
          this.transactionHistoryList = []
          this.getHistory()
          this.showBox.showExchangeBox = false
        } else if (resCodeMap[res]) {
          Message.warning(resCodeMap[res])
        } else {
          Message.warning('兑换失败')
        }
        this.loading.exchangeBtn = false
      },
      showTips () {
        let {Amount, Address} = this.withdrawals
        if (!Amount) {
          Message.warning('请输入数量')
        } else if (!Address) {
          Message.warning('请输入地址')
        }
      }
    }
  }
</script>

<style scoped>
  .c-fff {
    color: #fff;
  }

  .w-250 {
    width: 250px;
  }

  .financingDropBox .dropDownItem {
    width: 198px;
    height: 44px;
    background-color: transparent;
    line-height: 44px;
    padding-left: 20px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 14px;
    padding-top: 0;
  }

  .dropDownItem:hover {
    background-color: rgba(255, 255, 255, .1);
    color: #fff;
  }

  .dropDownBox {
    position: absolute;
    top: 30px;
    border: 1px solid #fff;
  }

  .dropDownBoxBG {
    background: #143d5f;
  }

  .financingDropBox {
    position: relative;
    float: right;
    margin-right: 64px;
    width: 198px;
    font-size: 14px;
  }

  .financingDropBox .dropDownSel {
    border-bottom: 1px solid rgba(255, 255, 255, .3);
    padding: 0 20px 10px 20px;
    cursor: pointer;
  }

  .financingDropBox i {
    position: absolute;
    right: -20px;
    top: 6px;
  }

  .f-s-12 {
    font-size: 12px;
    float: right;
    margin-right: 50px;
  }

  .cursornone {
    cursor: initial !important;;
  }

  .opacity0 {
    opacity: 0;
  }

  .w-150 {
    width: 150px !important;
  }

  .h-380 {
    height: 380px !important;
  }

  .rechageBtn {
    display: block;
    width: 100%;
    height: 44px;
    background-color: #1da1f3;
    box-sizing: border-box;
    border: none;
    color: #fff;
    cursor: pointer;
    overflow: hidden;
  }

  .qrCodeBox img {
    width: 212px;
    height: 212px;
    margin-top: 20px;
  }

  .qrCodeBox {
    margin: 32px 0 50px 0;
    color: #0f0f0f;
  }

  .el-icon-close {
    cursor: pointer;
    font-size: 16px;
    position: absolute;
    top: 20px;
    right: 20px;
    color: #999;
  }

  .copyBtn {
    width: 82px;
    height: 44px;
    background-color: #1da1f3;
    position: absolute;
    border: none;
    top: 0;
    right: 0;
    color: #fff;
  }

  .ps-static {
    position: static;
  }

  .bg-f4f4f4 {
    background: #f4f4f4 !important;
  }

  .l-s-31 {
    letter-spacing: 31px;
  }

  .l-s-8 {
    letter-spacing: 8.5px;
  }

  .contentItemRight input {
    width: 100%;
    height: 100%;
    background-color: #fcfcfc;
    padding-left: 20px;
    border: solid 1px #e1e1e1;
    box-sizing: border-box;
    color: #333;
  }

  .rechageBtnBox div {
    width: 100%;
  }

  .contentItemRight {
    height: 44px;
    width: 560px;
    float: left;
    position: relative;
  }

  .contentItemRight .inputBoxLeft, .contentItemRight .inputBoxRight {
    width: 236px;
    height: 44px;
    border-radius: 4px;
    background-color: #fcfcfc;
    border: solid 1px #e1e1e1;
    float: left;
  }

  .inputBoxRight {
    position: relative;
  }

  .contentItemRight img {
    margin: 12px 26px;
    float: left;
  }

  .inputBoxRight .dropDownList {
    position: absolute;
    right: 10px;
    top: 15px;
    cursor: pointer;
  }

  .contentItemLeft {
    width: 94px;
    height: 44px;
    line-height: 44px;
    font-size: 16px;
    color: #666666;
    float: left;
    text-align: left;
  }

  .messageBoxContentItem {
    height: 44px;
    margin-top: 20px;
  }

  .messageBoxTitle {
    font-family: PingFang-SC, sans-serif;
    font-size: 24px;
    font-weight: 500;
    text-align: left;
    color: #333333;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(232, 232, 232, 1);
  }

  .financingContent-wrap {
    width: 659px;
  }

  .financingModal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: transparent;
    text-align: center;
  }

  .financingContent {
    width: 736px;
    height: 450px;
    background-color: #ffffff;
    box-shadow: 0 0 13.5px 1.5px rgba(0, 36, 60, 0.3);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 28px 20px 0 28px;
    box-sizing: border-box;
  }

  .f-s-24 {
    font-size: 24px;
  }

  .f-s-18 {
    font-size: 18px;
  }

  .m-t-10 {
    margin-top: 10px;
  }

  .m-t-50 {
    margin-top: 50px;
  }

  .clearBoth {
    clear: both;
  }

  .m-t-100 {
    margin-top: 100px !important;
  }

  .financing {
    width: 845px;
    margin: 100px auto;
    font-family: MicrosoftYaHei, sans-serif;
    font-size: 14px;
    color: #ffffff;
  }

  .financing-nameTips {
    margin-top: 22px;
    font-size: 14px;
  }

  div.tableTitle {
    margin-top: 32px;
    overflow: auto;
  }

  .tableSplit {
    margin-top: 22px;
    height: 1px;
    background: rgba(255, 255, 255, .3);
  }

  .tableTr {
    margin-top: 36px;
    overflow: hidden;
  }

  .tableTh, .tableTd {
    float: left;
    width: 100px;
  }

  .tableTh:nth-of-type(2), .tableTd:nth-of-type(2) {
    float: left;
    width: 420px;
  }

  .tableTh:nth-of-type(3), .tableTd:nth-of-type(3) {
    float: left;
    width: 150px;
  }

  .tableTd button {
    border: 1px solid rgba(255, 255, 255, 1);
    background: transparent;
    height: 30px;
    width: 58px;
    box-sizing: border-box;
    font-size: 12px;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
  }

  .tableTd button:hover {
    background: #fff;
    color: #143d5f;
  }

  .addressSpan {
    font-size: 12px;
    display: inline-block;
    width: 290px;
  }
</style>

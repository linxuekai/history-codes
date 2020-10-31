<template>
  <div>

    <div class="transfer-wrap">
      <div class="transfer-details">
        <div class="transfer-details-title">
          转账详情
        </div>
        <div class="transfer-details-item">
          <div>金额</div>
          <div class="details-divInput">
            <div class="divInputBox">
              <input type="number" placeholder="请输入转账金额" v-model="transfer.Amount">
              <div class="dropDownList" >
                <el-dropdown @command="handleCommand" trigger="click">
                <span class="el-dropdown-link">
                  <span v-text="transfer.CoinName"></span><i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(value,index) in coinList" :key="index" :command="value.coin" v-text="value.coin"></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </div>

        </div>
        <div class="transfer-details-item">
          <div>地址</div>
          <input type="text" placeholder="请输入转账地址" v-model="transfer.Address">
          <div class="transfer-details-addr" v-text="addr.addr" v-show="isShowAddr==true"></div>
        </div>
        <div class="transfer-details-item">
          <div>备注消息</div>
          <input type="text" placeholder="请输入备注消息" v-model="transfer.Comment">
        </div>
        <div class="transfer-details-item">
          <div>手续费</div>
          <input type="text" placeholder="0.00" :value="transfer.Amount*fee | toFixed2" readonly>
        </div>
        <div class="transfer-details-item">
          <pwd-comp title="转账"
                    :disabled="!transfer.Amount||!transfer.Address"
                    @getPwd="transfers"
                    text="请输入密码确认转账">
            <button class="transferBtn" @click="showTips" v-loading="loading.transferBtn">确定</button>
          </pwd-comp>
        </div>
        <div class="transfer-details-item">
          <recover-button>
            <a href="javascript:" class="ss">从备份恢复钱包</a>
          </recover-button>
        </div>
      </div>

      <div class="transfer-active">
        <div class="transfer-details-title">
          近期活动
        </div>
        <div class="transfer-active-info">
          信息
        </div>
        <div class="transfer-active-content" v-if="transactionHistoryList.length > 0">
          <table>
            <tr>
              <th>操作</th>
              <th>信息</th>
              <th>日期</th>
            </tr>
            <tr v-for="(value, index) in curPageShowData">
              <td v-text="value.c + value.t"></td>
              <td class="text-left" v-html="value.descript" :id="value.v"></td>
              <td>{{value.d | filterTime}}</td>
            </tr>
          </table>
          <div class="transferPagination">
            <el-pagination @current-change="handleCurrentChange"
                           layout="total, prev, pager, next"
                           :page-size="pagination.pageSize"
                           :total="pagination.total"
                           :page-count="pagination.pageCount"
                           :current-page="pagination.currentPage">
            </el-pagination>
          </div>
        </div>
        <div class="transfer-active-content" v-else v-cloak>
          近期无活动
        </div>
      </div>

    </div>

  </div>

</template>

<script>
  import RecoverButton from '../RecoveryButton.vue'
  import resCodeMap from '@/assets/js/resCodeMap'
  import {Dropdown, DropdownMenu, DropdownItem, Message, Pagination} from 'element-ui'
  import {mapState} from 'vuex'
  import Vue from 'vue'
  [Dropdown, DropdownMenu, DropdownItem, Pagination].forEach(comp => { Vue.use(comp) })
  import PwdComp from '@/components/RedoPwdComp.vue'
  import InfiniteLoading from 'vue-infinite-loading'
  export default{
    components: {
      RecoverButton,
      PwdComp,
      InfiniteLoading
    },
    name: 'transfer',
    computed: {
      fee () {
        return this.transfer.CoinName === 'SC'
          ? this.ExhchangeFee
          : 0
      },
      ...mapState({
        transfer: state => state.sub.transfer,
        password: state => state.sub.password,
        isLogged: state => state.isLogged,
        connReady: state => state.connReady
      })
    },
    data () {
      return {
        addr: {
          addr: '1afd2655059f24edbbac65fbb37236c7e'
        },
        isShowAddr: false,
        coinList: [
//          {coin: 'SC'},
          {coin: 'VS'}
        ],
        curCoin: 'VS',
        hasAction: false,
        loading: {
          transferBtn: false,
          scrollLoading: true
        },
        transactionHistoryList: [],
        curPageShowData: [],
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
        pagination: {
          pageSize: 8,
          total: 0,
          currentPage: 1,
          pageCount: 1,
          isFirstRequest: true
        },
        ExhchangeFee: 0
      }
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
          vm.getHistory()
          vm.config()
        }
      })
    },
    watch: {
      isLogged (newVal, oldVal) {
        if (newVal === true && this.$store.state.connReady === true) {
          this.getHistory()
          this.config()
        }
      }
    },
    methods: {
      async config () {
        let res = await this.$store.dispatch('Config')
        this.ExhchangeFee = res.ExhchangeFee
      },
      async getHistory (value) {
        let res = await this.$store.dispatch('Transaction', this.postTransaction)
        if (res.code === 'StatusOk' && res.data.d instanceof Array) {
          res.data.d.forEach((item) => {
            item.t = this.types[item.t]
            item.descript = '將' + item.v + '枚' + item.c + item.t + '到地址' + '<br>' + item.a
          })
          this.transactionHistoryList = this.transactionHistoryList.concat(res.data.d)
          if (this.pagination.isFirstRequest) {
            this.handleCurrentChange(1)
            this.pagination.isFirstRequest = false
          }
          this.pagination.total = res.data.c
          this.pagination.pageCount = res.data.t
          if (this.postTransaction.PageIndex >= res.data.t) {
          } else {
            this.postTransaction.PageIndex ++
            this.getHistory()
          }
        }
      },
      handleCurrentChange (val) {
        this.pagination.currentPage = val
        this.curPageShowData = this.transactionHistoryList.slice(this.pagination.pageSize * (val - 1), val * this.pagination.pageSize)
      },
      handleCommand (command) {
        this.transfer.CoinName = command
      },
      showTips () {
        let {Amount, Address} = this.transfer
        if (!Amount) {
          Message.warning('请输入数量')
        } else if (!Address) {
          Message.warning('请输入地址')
        }
      },
      async transfers (password) {
        if (this.loading.transferBtn) {
          return
        }
        this.loading.transferBtn = true
        this.transfer.Password = password
        this.transfer.Amount = parseFloat(this.transfer.Amount)
        let res = await this.$store.dispatch('Transfer', this.transfer)
        if (res === 'StatusOk') {
          Message.success('转账成功')
          this.transfer.Address = ''
          this.transfer.Amount = ''
          this.transfer.Comment = ''
        } else if (resCodeMap[res]) {
          Message.warning(resCodeMap[res])
        } else {
          Message.warning('转账失败')
        }
        this.loading.transferBtn = false
      }
    }
  }
</script>

<style scoped>
  .transfer-details-item div{
    width: 100%;
  }
  [v-cloak] {
    display: none !important;
  }
  .text-left{
    text-align: left;
  }
  .transferPagination{
    text-align: right;
    margin-top: 20px;
  }
  .transfer-wrap{
    width: 80%;
    box-sizing: border-box;
    font-size: 14px;
    color: #ffffff;
    margin: 86px auto 20px;
    overflow: auto;
  }
  .ss{
    font-size: 12px;
    color: #1da1f3;
    text-decoration: none;
  }
  .transfer-wrap .transfer-details{
    width: 40%;
    float: left;
    overflow: hidden;
  }
  .transfer-wrap .transfer-active{
    width: 60%;
    float: left;
    overflow: hidden;
  }
  .transfer-details-title{
    font-size: 24px;
  }
  .transfer-details-item,.transfer-active-info{
    margin-top: 28px;
  }
  .details-divInput, .transfer-details-item input{
    border-radius: 4px;
    border: none;
    margin-top: 10px;
    width: 80%;
    height: 40px;
    background: #fff;
    box-sizing: border-box;
    color: #143d5f;
    padding: 0 10px;
  }
  .details-divInput{
    position: relative;
    width: 80% !important;
  }
  .details-divInput .dropDownList{
    cursor: pointer;
    position: absolute;
    right: 10px;
    width: 72px;
    top: 0;
    text-align: right;
  }
  .details-divInput input{
    width: 80%;
    height: 40px;
    color: #143d5f;
    padding: 0 8px 0 10px;
    box-sizing: border-box;
    position: absolute;
    top: -10px;
    left: 0;
    border: none;
  }
  .divInputBox{
    width: 80% !important;
    height: 40px;
    line-height: 40px;
    padding: 0 80px 0 10px;
    margin-left: -10px;
    text-align: right;
  }
  .transfer-details-addr{
    margin-top: 10px;
    font-size: 12px;
    padding-left: 10px;
  }
  .transfer-active-info{
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(255,255,255,.5);
  }
  .transfer-active-content{
    margin-top: 12px;
    font-size: 12px;
  }
  .el-dropdown-menu{
    margin-right: -10px;
  }
  th{
    font-size: 16px;
    font-weight: normal;
  }
  table th,table td{
    text-align: center;
    padding: 8px 10px;
  }
  .transferBtn{
    cursor: pointer;
    width: 80%;
    height: 40px;
    border-radius: 4px;
    background-color: #1b91db;
    color: #ffffff;
    border: none;
    margin-top: 10px;
  }
</style>



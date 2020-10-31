<template>
  <div class="oparation-wrap">
    <div class="row1">
      <div class="suspension" v-if="isSuspension">
        <div class="suspension-text">Suspension</div>
      </div>
      <div class="part">
        <div class="part-inner">
          <div class="part-header">买入ＶＴＳ</div>
          <div class="part-content">
            <div class="opera-item">
              <div class="float-left"><label for="buy-price">价格：</label></div>
              <div class="float-right">
                <input id="buy-price"
                       type="text"
                       class="input-bar"
                       placeholder="0"
                       disabled
                       :value="currentPrice">
                <div class="input-append">VS</div>
              </div>
            </div>
            <div class="opera-item">
              <div class="float-left"><label for="buy-num">买入金额：</label></div>
              <div class="float-right">
                <input id="buy-num"
                       type="text"
                       class="input-bar"
                       v-model="buyNum"
                       placeholder="买入金额">
                <div class="input-append">VS</div>
              </div>
            </div>
            <div class="divider"></div>
            <div class="opera-item">
              <div class="float-left"><label>预算股数：</label></div>
              <div class="float-right">
                <input type="text"
                       class="input-bar"
                       :value="Math.floor(maxBuy(buyNum, currentPrice, raiseRemain))"
                       disabled
                       placeholder="0">
                <div class="input-append">VTS</div>
              </div>
            </div>
            <div class="opera-item">
              <div class="float-left"><label>手续费：</label></div>
              <div class="float-right">
                <input type="text"
                       class="input-bar"
                       disabled
                       :value="buyFeeSum"
                       placeholder="0">
                <div class="input-append">VS</div>
              </div>
            </div>
            <div class="info-wrap">
              <div>VS余额：$ <span v-text="vsBalance.toFixed(2)"></span></div>
              <div class="buy-text">可买股数： <span v-text="Math.floor(maxBuy(vsBalance, currentPrice, raiseRemain))"></span> VTS</div>
              <pwd-comp @getPwd="buy"
                        :disabled="!(Number(buyNum) > 0)"
                        :text="`您正在买入指定市值的VTS，股数将由市场价格计算确定，由当前购买金额预算股数为 ${Math.floor(maxBuy(buyNum, currentPrice, raiseRemain))} 。`"
                        title="买入VTS">
                <button class="btn-buy" @click="checkBuyNum">买入</button>
              </pwd-comp>
            </div>
          </div>
        </div>
      </div>
      <div class="part">
        <div class="part-inner">
          <div class="part-header">卖出ＶＴＳ</div>
          <div class="part-content">
            <div class="opera-item">
              <div class="float-left"><label for="buy-price">价格：</label></div>
              <div class="float-right">
                <input id="sale-price"
                       type="text"
                       class="input-bar"
                       disabled
                       :value="currentPrice"
                       placeholder="委托卖出价">
                <div class="input-append">VS</div>
              </div>
            </div>
            <div class="opera-item">
              <div class="float-left"><label for="buy-num">数量：</label></div>
              <div class="float-right">
                <input id="sale-num"
                       type="text"
                       class="input-bar"
                       v-model="saleNum"
                       placeholder="卖出数量">
                <div class="input-append">VTS</div>
              </div>
            </div>
            <div class="divider"></div>
            <div class="opera-item">
              <div class="float-left"><label>成交额：</label></div>
              <div class="float-right">
                <input type="text"
                       class="input-bar"
                       disabled
                       :value="saleSum.toFixed(2)"
                       placeholder="委托总额">
                <div class="input-append">VS</div>
              </div>
            </div>
            <div class="opera-item">
              <div class="float-left"><label>手续费：</label></div>
              <div class="float-right">
                <input type="text"
                       class="input-bar"
                       disabled
                       :value="saleFeeSum"
                       placeholder="本次委托手续费">
                <div class="input-append">VS</div>
              </div>
            </div>
            <div class="info-wrap">
              <div>VS余额：$ <span v-text="vsBalance.toFixed(2)"></span></div>
              <div class="sale-text">订单可卖： <span v-text="currentOrderSellableNum"></span> VTS</div>
              <pwd-comp @getPwd="sale"
                        :disabled="!currentOrder.o||!(Number(saleNum) > 0)"
                        title="卖出VTS">
                <button class="btn-sale" @click="saleNumCheck">卖出</button>
              </pwd-comp>
            </div>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="row2">
      <div class="part">
        <div class="part-inner">
          <div class="part-header">持仓订单</div>
          <div class="infinite-table">
            <el-checkbox-group v-model="checkList">
            <table cellspacing="0px" class="keeping-table">
              <thead>
              <tr>
                <th>#</th>
                <th>买价</th>
                <th>持仓数量</th>
                <th>解禁股</th>
                <th>涨幅</th>
                <th>金分Φ</th>
                <th>时间</th>
                <th>
                  <span v-if="!merging" @click="readyMerge" class="btn-merge">合并</span>
                  <span v-else class="btn-merging" @click="mergeOrders" v-text="checkList.length?'确定':'返回'"></span>
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in keepingOrders"
                  @click="sellAnOrder(item)"
                  :class="{currentOrder: item === currentOrder}"
                  :key="item.o">
                <td class="buy-text">买</td>
                <td v-text="item.p.toFixed(5)"></td>
                <td>
                  <span v-text="Math.floor(item.av)"></span>
                  <span v-if="item.ct === null">
                    <br>
                    <span style="color:gray;">交易中...</span>
                  </span>
                </td>
                <td v-text="sellabel(item)"></td>
                <td class="buy-text"><span v-text="(Math.max(0, currentPrice/item.p-1)*100).toFixed(1)"></span>%</td>
                <td v-text="(Math.ceil(item.g * 1000)/1000).toFixed(3)"></td>
                <td v-text="fixTime(item.st)"></td>
                <td>
                  <span v-if="!merging && item.av<=1000"
                        @click.stop="readyMerge"
                        style="position: relative;">
                    <i class="el-icon-arrow-right"></i>
                    <i class="el-icon-arrow-left icon-merge-right"></i>
                  </span>
                  <el-checkbox v-else-if="item.av<=1000" :label="item.o"><span></span></el-checkbox>
                </td>
              </tr>
              </tbody>
            </table>
            </el-checkbox-group>
            <infinite-loading @infinite="GetShareOrder"
                              v-if="isLogged !== 'checking'"
                              spinner="waveDots"
                              ref="infiniteKeepingOrders">
              <span slot="no-more"></span>
              <span slot="no-results"><span v-if="!keepingOrders.length">— 暂无订单 —</span></span>
            </infinite-loading>
          </div>
        </div>
      </div>
      <div class="part">
        <div class="part-inner order-log">
          <div class="half-header-wrap">
            <div class="half-header"
                 @click="orderLogTab('agency')"
                 :class="currentOrderLogTab==='agency'?'active':''">卖出委托
            </div>
            <div class="y-divider"></div>
            <div class="half-header"
                 :class="currentOrderLogTab==='agency'?'':'active'"
                 @click="orderLogTab('tran')">卖出成交
            </div>
          </div>
          <div>
            <!--委托订单表格-->
            <div v-if="currentOrderLogTab==='agency'" class="infinite-table">
              <table cellspacing="0px" id="agencyTable">
                <thead>
                <tr>
                  <th>#</th>
                  <th>卖价</th>
                  <th>挂单数量</th>
                  <th>未成交量</th>
                  <th>已成交量</th>
                  <th>时间</th>
                  <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in agencyTableData" :key="item.OrderId">
                  <td class="sale-text">卖</td>
                  <td v-text="item.SellOutPrice.toFixed(5)"></td>
                  <td v-text="Math.floor(item.Amount)"></td>
                  <td v-text="Math.ceil(item.RemainAmount)"></td>
                  <td v-text="Math.floor(item.Amount - item.RemainAmount)"></td>
                  <td v-text="fixTime(item.SetupTime)"></td>
                  <td>
                    <pwd-comp v-if="!item.withdrowing" title="撤回卖单" @getPwd="withdraw">
                      <span @click="currentWithdrow = item">撤回</span>
                    </pwd-comp>
                  </td>
                </tr>
                </tbody>
              </table>
              <infinite-loading @infinite="GetSellShareOrder"
                                v-if="isLogged !== 'checking'"
                                spinner="waveDots"
                                ref="infiniteAgency">
                <span slot="no-more"></span>
                <span slot="no-results"><span v-if="!agencyTableData.length">— 暂无订单 —</span></span>
              </infinite-loading>
            </div>
          </div>
          <div>
            <!--成交订单表格-->
            <div v-if="currentOrderLogTab==='tran'" class="infinite-table">
              <table cellspacing="0px" id="tranTable">
                <thead>
                <tr>
                  <th>#</th>
                  <th>买价</th>
                  <th>成交</th>
                  <th>卖价</th>
                  <th>金额</th>
                  <th>涨幅</th>
                  <th>手续费</th>
                  <th>时间</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in tranTableData" :key="item.SellOutOrderId">
                  <td class="sale-text">卖</td>
                  <td v-text="item.BuyInPrice.toFixed(5)"></td>
                  <td v-text="item.Amount"></td>
                  <td v-text="item.SellOutPrice.toFixed(5)"></td>
                  <td v-text="(item.Amount*item.SellOutPrice).toFixed(2)"></td>
                  <td class="buy-text" v-text="(item.SellOutPrice*100/item.BuyInPrice-100).toFixed(1)+'%'"></td>
                  <td v-text="(item.Amount*item.SellOutPrice*saleFee).toFixed(2)"></td>
                  <td v-text="fixTime(item.UpdTime)"></td>
                </tr>
                </tbody>
              </table>
              <infinite-loading @infinite="GetClosingVTS"
                                v-if="isLogged !== 'checking'"
                                spinner="waveDots"
                                ref="infiniteGetClosingVTS">
                <span slot="no-more"></span>
                <span slot="no-results">
                  <span v-if="!tranTableData.length">— 暂无记录 —</span>
                </span>
              </infinite-loading>
            </div>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>

  </div>
</template>

<script>
  import resCodeTip from '@/assets/js/resCodeMap'
  import {sellableFn} from '@/assets/js/toolsFun'
  import Vue from 'vue'
  import {Checkbox, CheckboxGroup, Message} from 'element-ui'
  [Checkbox, CheckboxGroup].forEach(comp => Vue.use(comp))
  import InfiniteLoading from 'vue-infinite-loading'
  import PwdComp from '../RedoPwdComp.vue'
  import {mapState, mapGetters} from 'vuex'
  export default {
    components: {
      InfiniteLoading,
      PwdComp
    },
    data () {
      return {
        nowYear: new Date().getFullYear().toString().slice(2),
        minGolden: Number.POSITIVE_INFINITY,
        buyNum: null,
        saleNum: null,
        currentOrderLogTab: 'agency',
        pageIndex: {
          keepingOrders: 1,
          agency: 1,
          ClosingVTS: 1
        },
        requestDone: {
          agency: false,
          ClosingVTS: false
        },
        merging: false,
        checkList: [],
        currentOrder: {},
        currentOrderSellableNum: 0,
        isSuspension: false,
        currentWithdrow: null
      }
    },
    computed: {
      buySum () {
        return this.currentPrice * this.buyNum
      },
      saleSum () {
        return this.currentPrice * this.saleNum
      },
      buyFeeSum () {
        return this.buySum * this.buyFee
      },
      saleFeeSum () {
        return this.saleSum * this.saleFee
      },
      ...mapState({
        currentPrice: state => state.trade.currentPrice,
        buyFee: state => state.trade.buyFee,
        saleFee: state => state.trade.saleFee,
        keepingOrders: state => state.trade.keepingOrders,
        agencyTableData: state => state.trade.agencyTableData,
        tranTableData: state => state.trade.tranTableData,
        connReady: state => state.connReady,
        isLogged: state => state.isLogged,
        coinBanlance: state => state.sub.coinBanlance,
        raiseRemain: state => 16180 - state.trade.componySold % 16180
      }),
      ...mapGetters([
        'vsBalance'
      ])
    },
    watch: {
      currentPrice (newVal) {
        this.$store.commit('updateGoldenPoint')
      },
      agencyTableData (newVal, oldVal) {
        if (newVal.length < oldVal.length) {
          if (!this.requestDone.agency) {
            this.requestDone.agency = true
            this.$store.commit('clearAgencyList')
            this.pageIndex.agency = 1
            this.requestDone.agency = false
          }
        }
      }
    },
    methods: {
      fixTime (time) {
        return time.slice(2, 4) === this.nowYear
          ? time.slice(5, 10).replace(/-/g, '/')
          : time.slice(2, 10).replace(/-/g, '/')
      },
      orderLogTab (tabName) {
        this.currentOrderLogTab = tabName
        if (tabName === 'tran') {
          this.requestDone.ClosingVTS = true
          this.pageIndex.ClosingVTS = 1
          this.$store.commit('clearClosingVTSList')
          this.requestDone.ClosingVTS = false
        }
      },
      async buy (pwd) {
        let res = await this.$store.dispatch('buyIn', {pwd, buyNum: this.buyNum})
        if (res.code !== 'StatusOk') {
          Message.warning(resCodeTip[res.code] || '操作失败')
        }
        this.buyNum = null
      },
      async sale (pwd) {
        let res = await this.$store.dispatch('saleOut', {pwd, id: this.currentOrder.o, saleNum: this.saleNum})
        if (res.code !== 'StatusOk') {
          Message.warning(resCodeTip[res.code] || '操作失败')
        }
        this.saleNum = null
        this.currentOrderSellableNum = 0
        this.currentOrder = {}
      },
      async GetShareOrder ($state) {
        let res = await this.$store.dispatch('infiniteGet', {
          invokeType: 'GetShareOrder',
          pageIndex: this.pageIndex.keepingOrders++
        })
        if (res.code === 'StatusOk') {
          res.data.data.forEach(order => {
            if (order.g < this.minGolden) {
              this.minGolden = order.g
            }
          })
        }
        res.code === 'StatusOk' && (this.pageIndex.keepingOrders - 1) < res.data.total && res.data.total !== 0
          ? $state.loaded()
          : $state.complete()
      },
      async GetSellShareOrder ($state) {
        if (!this.requestDone.agency) {
          let res = await this.$store.dispatch('infiniteGet', {
            invokeType: 'GetEntrustedVTS',
            pageIndex: this.pageIndex.agency++
          })
          let noCompleted = res.code === 'StatusOk' && (this.pageIndex.agency - 1) < res.data.total && res.data.total !== 0
          noCompleted
            ? $state.loaded()
            : ($state.complete(), this.requestDone.agency = true)
        } else {
          $state.complete()
        }
      },
      async GetClosingVTS ($state) {
        if (!this.requestDone.ClosingVTS) {
          let res = await this.$store.dispatch('infiniteGet', {
            invokeType: 'GetClosingVTS',
            pageIndex: this.pageIndex.ClosingVTS++
          })
          let noCompleted = res.code === 'StatusOk' && (this.pageIndex.ClosingVTS - 1) < res.data.total && res.data.total !== 0
          noCompleted
            ? $state.loaded()
            : ($state.complete(), this.requestDone.ClosingVTS = true)
        }
      },
      sellAnOrder (order) {
        if (!this.merging) {
          this.currentOrder = order
          let sellableNum = this.sellabel(order)
          this.saleNum = sellableNum
          this.currentOrderSellableNum = sellableNum
        }
      },
      readyMerge () {
        this.merging = true
      },
      async mergeOrders () {
        if (this.checkList.length > 1) {
          let res = await this.$store.dispatch('MergeShareOrder', this.checkList)
          if (res.code === 'StatusOk') {
            this.pageIndex.keepingOrders = 1
            this.checkList = []
            this.$store.state.trade.saleNum = null
            this.currentOrderSellableNum = 0
            this.currentOrder = {}
            this.$refs.infiniteKeepingOrders.$emit(`$InfiniteLoading:reset`)
            this.merging = false
          } else {
            Message.warning(resCodeTip[res.code] || '操作失败')
          }
        } else {
          this.merging = false
        }
      },
      sellabel (order) {
        return Math.floor(sellableFn(this.currentPrice, order.p, order.a) - order.sa)
      },
      maxBuy (Payment, CurrentPrice, RaiseRemain) {
        let num = 0
        while (Payment > 0.000001) {
          num += Math.min(Payment / CurrentPrice, RaiseRemain)
          Payment -= CurrentPrice * RaiseRemain
          CurrentPrice += 0.00236
          RaiseRemain = 16180
        }
        return num
      },
      checkBuyNum () {
        if (!(Number(this.buyNum) > 0)) {
          Message.warning('请输入正确的买入金额')
        }
      },
      saleNumCheck () {
        if (!this.currentOrder.o || !(Number(this.saleNum) > 0)) {
          Message.warning('请选择一个可卖出的持仓订单')
        }
      },
      // 撤回卖单
      async withdraw (pwd) {
        let res = await this.$store.dispatch('withdrowOrder', {pwd, order: this.currentWithdrow})
        this.$set(this.currentWithdrow, 'withdrowing', true)
        if (res.code !== 'StatusOk') {
          Message.warning(resCodeTip[res.code] || '操作失败')
        }
      }
    }
  }
</script>

<style scoped>
  .oparation-wrap {
    height: 100%;
    box-sizing: border-box;
  }

  .part {
    width: 50%;
    box-sizing: border-box;
    padding: 0 2px;
    float: left;
  }
  .row2 .part{
    height:100%;
  }

  .part-inner {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid #5B7990;
    position: relative;
  }

  .part-header, .half-header-wrap {
    height: 22px;
    box-sizing: border-box;
    background: #5B7990;
    padding: 4px 10px;
    font-size: 12px;
    line-height: 14px;
    position: absolute;
    width: 100%;
    z-index: 2;
  }

  .half-header-wrap {
    padding: 0;
  }

  .opera-item {
    clear: both;
    padding: 5px;
    position: relative;
    box-sizing: border-box;
  }

  .opera-item label {
    line-height: 24px;
    font-size: 12px;
  }

  .input-bar {
    display: inline-block;
    width: 100%;
    text-align: right;
  }

  .input-append {
    display: inline-block;
    line-height: 23px;
    background: #5B7990;
    margin-left: 0;
    padding: 0 10px;
    width: 40px;
    position: absolute;
    right: 0;
    top: 0;
  }

  .float-left {
    float: left;
    width: 22%;
  }

  .float-right {
    float: right;
    width: 78%;
    position: relative;
    padding-right: 64px;
    box-sizing: border-box;
  }

  .divider {
    padding: 5px;
    margin: 5px;
    clear: both;
    border-bottom: 1px dotted gray;
  }

  .info-wrap {
    clear: both;
    position: relative;
    padding: 10px 5px 5px;
    height:36px;
  }

  .btn-buy, .btn-sale {
    position: absolute;
    top: 10px;
    right: 5px;
    width: 80px;
    height: 36px;
    border: none;
    cursor: pointer;
    background: #05a651;
    color: white;
  }

  .btn-buy:hover, .btn-sale:hover {
    box-shadow: 0 0 5px #ddd;
  }

  .btn-sale {
    background: #c5510c;
  }

  .btn-buy:active {
    background: #288351;
  }

  .btn-sale:active {
    background: #b01d1d;
  }

  .part-inner table {
    width: 100%;
    font-size: 12px;
    font-family: Arial, sans-serif;
    text-align: center;
  }

  .part-inner th {
    font-weight: normal;
    padding: 5px 0;
    border-bottom: 1px solid #5B7990;
  }

  .part-inner td {
    padding: 2px 0;
  }
  .part-inner tbody tr:nth-child(even) {
    background: #26313d;
  }

  .keeping-table tbody tr{
    cursor: pointer;
  }
  .keeping-table tbody tr:hover{
    background: #5B7990 !important;
  }

  .half-header {
    display: inline-block;
    width: 48%;
    text-align: center;
    cursor: pointer;
    padding: 4px;
    box-sizing: border-box;
  }

  .y-divider {
    display: inline-block;
    height: 12px;
    border-right: 1px solid white;
  }

  .half-header.active {
    border-bottom: 2px solid #018bfe;
    padding: 4px 0 2px;
  }
  .clearfix{
    clear: both;
  }
  .row1{
    position: relative;
    float: left;
    width: 100%;
  }
  .row2{
    box-sizing: border-box;
    height:100%;
    padding-top:210px;
  }
  .infinite-table{
    height: 100%;
    box-sizing: border-box;
    padding-top:22px;
    position: absolute;
    width: 100%;
    top:0;
    overflow-y: auto;
  }
  .part-content{
    padding-top:22px;
  }
  .btn-merge {
    cursor: pointer;
    border-bottom: 1px dotted white;
  }
  .btn-merging{
    cursor: pointer;
    color: skyblue;
    border-bottom: 1px dotted skyblue;
  }
  .btn-merge:hover {
    color: skyblue;
    border-color: skyblue;
  }
  .currentOrder {
    background: #c5510c !important;
  }
  .icon-merge-right{
    position: absolute;
    left: 1px;
  }
  .suspension{
    position: absolute;
    width:100%;
    height:100%;
    background: #111;
    opacity: .7;
    z-index: 999;
  }
  .suspension-text{
    font-size: 70px;
    font-family: "MV Boli","Microsoft YaHei UI",sans-serif;
    color: #fff;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
  }
</style>

<style>
  .infinite-table .el-checkbox__label{
    padding:0;
  }
</style>

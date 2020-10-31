<template>
  <div class="defaultPage">
    <el-row class="FromNum">
      <el-col :span="24">
        <h2 class="inline-block grayh2">{{ $t('交易记录') }}</h2>
        <span class="graySpan">{{ $t('浏览') }} <span v-text="$store.state.type"></span> {{ $t('交易的相关信息') }}</span>
      </el-col>
    </el-row>

    <business
    :item="blockTx"
    >
    </business>

    <table class="table mar80 font-12 tableW" width="100%">
      <tbody>
      <tr>
        <th colspan="2">{{ $t('概况') }}</th>
      </tr>
      <tr>
      <td>{{ $t('输入脚本') }}</td>
      <td>
        <p class="font-wb" v-for="scripts in blockTx.inputs">{{ scripts.Script}}</p>
      </td>
      </tr>
      <tr>
        <td>{{ $t('输出脚本') }}</td>
        <td>
          <p class="font-wb" v-for="scripts in blockTx.outputs">{{ scripts.Script }}</p>
        </td>
      </tr>
      <tr>
      <td>{{ $t('确认次数') }}</td>
      <td>{{ blockTx.TXConfirmations }}</td>
      </tr>
      <tr>
        <td>{{ $t('时间') }}</td>
        <td>
          <el-popover
            placement="top"
            trigger="hover"
            :content="blockTx.Time | timeString ">
            <span slot="reference">{{ blockTx.Time }}</span>
          </el-popover>
        </td>
      </tr>
      <tr>
        <td>{{ $t('时间偏差') }}</td>
        <td>{{ blockTx.Locktime }}</td>
      </tr>
      <tr>
        <td>{{ $t('转入总量') }}</td>
        <td>{{ blockTx.TxTotal }}</td>
      </tr>
      <tr>
      <td>{{ $t('转入地址个数') }}</td>
      <td>{{ blockTx.VinTotal }}</td>
      </tr>
      <tr>
      <td>{{ $t('转出地址个数') }}</td>
      <td>{{ blockTx.VoutTotal }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import business from './business'
  import {json2FormData} from '../assets/js/tool'

//  let blockTx = {
//   是否新生成的XX币 Coinbase: true,
//   时间偏差 Locktime: 0,
//   脚本 Scripts: ["0316613e5465f026a9ebb2644c0f2affed0daca3dbb8de2b258214cb7b86a8deec OP_CHECKSIG"],
//   确认次数 TXConfirmations: 2,
//   时间 Time: 1512804761,
//   转入总量 TxTotal: 0,
//   转入地址个数 VinTotal: 1,
//   转出地址个数 VoutTotal: 1,
//    inputs: [{Amount: 0, Address: "coinbase"}],
//    outputs: [{Amount: 0, Address: "emkcSJhLQa8hwywyaVSuD6wtj9agBV9hCf", Spent: false}]
//  }

  export default {
    components: {
      business
    },
    data () {
      return {
        pageIndex: 1,
        blockTx: {}
      }
    },
    computed: {
      Txid () {
        return this.$route.query.Tx
      }
    },
    watch: {
      Txid () {
        this.init()
      }
    },
    methods: {
      async init () {
        let {data: {code, data}} = await this.$http.post(
          '/Blocks/Block_Tx',
          json2FormData({
            Txid: this.Txid,
            type: this.$store.state.type
          }))
        if (code === 'StatusOk' && data) {
//          赋获取的data
          this.blockTx = data
          this.$set(this.blockTx, 'Txid', this.Txid)
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      next(_this => {
        _this.init()
      })
    }
  }
</script>

<style scoped>
  .mar80 {
    margin-top: 80px;
  }
  .font-wb{
    font-weight: bolder;
  }

</style>

<template>
  <div class="defaultPage">
    <!--title-->
    <el-row class="FromNum">
      <el-col :span="24">
        <h2 class="font-30 inline-block grayh2">{{ $t('区块') }} #{{ currentBlock.height }}</h2>
      </el-col>
    </el-row>
    <!--table-->
    <el-row>
      <el-col :span="12">
        <table class="tableLeft fl table font-12 tableW">
          <tbody>
          <tr>
            <th colspan="2">{{ $t('概况') }}</th>
          </tr>
          <tr>
            <td>{{ $t('交易次数') }}</td>
            <td v-text="currentBlock.number"></td>
          </tr>
          <tr>
            <td>{{ $t('总输出量') }}</td>
            <td>
              <span>$ </span>
              <span v-text="currentBlock.amount"></span>
            </td>
          </tr>
          <tr>
            <td>{{ $t('交易费') }}</td>
            <td>
              <span>$ </span>
              <span v-text="currentBlock.mint"></span>
            </td>
          </tr>
          <tr>
            <td>{{ $t('高度') }}</td>
            <td>
              <el-button type="text" v-text="currentBlock.height" class="blueColor pad0"
                         @click="heightClick(currentBlock.height)"></el-button>
              <span style="color: #008000" v-if="currentBlock.height"> {{ $t('（主链）') }}</span>
            </td>
          </tr>
          <tr>
            <td>{{ $t('时间戳') }}</td>
            <td>
              <el-popover
                placement="top"
                trigger="hover"
                :content="currentBlock.time | timeString ">
                <span slot="reference">{{ currentBlock.time }}</span>
              </el-popover>
            </td>
          </tr>
          <tr>
            <td>{{ $t('难度系数') }}</td>
            <td v-text="currentBlock.difficulty"></td>
          </tr>
          <tr>
            <td>{{ $t('大小') }}</td>
            <td>
              <span v-text="currentBlock.size"></span>
              <span> KB</span>
            </td>
          </tr>
          <tr>
            <td>{{ $t('版本') }}</td>
            <td v-text="currentBlock.version"></td>
          </tr>
          <tr>
            <td>{{ $t('随机数') }}</td>
            <td v-text="currentBlock.nonce"></td>
          </tr>
          <tr>
            <td>{{ $t('新区块奖励') }}</td>
            <td>
              <span>$ </span>
              <span v-text="currentBlock.mint"></span>
            </td>
          </tr>
          </tbody>
        </table>
      </el-col>
      <el-col :span="12">
        <table class="tableRight fr table font-12 tableW">
          <tbody>
          <tr>
            <th colspan="2">{{ $t('哈希值s') }}</th>
          </tr>
          <tr>
            <td>{{ $t('哈希值') }}</td>
            <td>
              <el-button type="text" v-text="currentBlock.hash" class="blueColor pad0 font-12" disabled></el-button>
            </td>
          </tr>
          <tr>
            <td>{{ $t('上一区块') }}</td>
            <td>
              <el-button type="text" v-text="currentBlock.previousblockhash" class="blueColor pad0 font-12" @click="hdClickHash(currentBlock.previousblockhash)"></el-button>
            </td>
          </tr>
          <tr>
            <td>{{ $t('下一区块') }}</td>
            <td>
              <el-button type="text" v-text="currentBlock.nextblockhash" class="blueColor pad0 font-12" @click="hdClickHash(currentBlock.nextblockhash)"></el-button>
            </td>
          </tr>
          <tr>
            <td>{{ $t('二进制哈希树根') }}</td>
            <td v-text="currentBlock.merkleroot" class="font-12"></td>
          </tr>
          </tbody>
        </table>
      </el-col>
    </el-row>
    <el-row>
      <h3 class="marB20">{{ $t('交易记录') }}</h3>
    </el-row>
    <business v-for="item in blockTx"
              :item="item"
              :key="item.Time"
              :hashB="currentBlock.hash"
    ></business>
  </div>
</template>

<script>
  import business from './business'
  import {json2FormData} from '../assets/js/tool'
  export default {
    components: {
      business
    },
    data () {
      return {
        currentBlock: {},
        pageIndex: 1,
        blockTx: {}
      }
    },
    beforeRouteEnter (to, from, next) {
      let blockHash = to.query.BlockHash
      next(async _this => {
        let [res1, res2] = await Promise.all([
          _this.$http.post('/Blocks/Block_Hash', json2FormData({hash: blockHash, type: _this.$store.state.type})),
          _this.$http.post('/Blocks/Block_Txs', json2FormData({hash: blockHash, page: _this.pageIndex++, number: 20, type: _this.$store.state.type}))
        ])
        _this.currentBlock = res1.data.code === 'StatusOk' && res1.data.data
        _this.blockTx = res2.data.code === 'StatusOk' && res2.data.data
      })
    },
    watch: {
      '$route.query.BlockHash' (hash) {
        this.hdClickHash(hash)
      }
    },
    methods: {
      heightClick (heightBlock) {
        this.$router.push({
          name: 'BlockNumber',
          query: {BlockHeight: heightBlock}
        })
      },
//      点击上下区块的哈希值
      async hdClickHash (hashBlock = this.currentBlock.hash) {
        this.$router.push({
          name: 'hashDetail',
          query: {BlockHash: hashBlock}
        })
        {
          let {data: {code, data}} = await this.$http.post(
            '/Blocks/Block_Hash',
            json2FormData({hash: hashBlock, type: this.$store.state.type}))
          if (code === 'StatusOk' && data) {
            this.currentBlock = data
          }
        }
        {
          let {data: {code, data}} = await this.$http.post(
            '/Blocks/Block_Txs',
            json2FormData({
              hash: hashBlock,
              page: 1,
              number: 20,
              type: this.$store.state.type
            }))
          if (code === 'StatusOk' && data) {
            this.blockTx = data
          }
        }
      }
    }
  }
</script>

<style scoped>
  h3 {
    color: #5F5F5F;
  }

  .table td:first-child {
    width: 200px !important;
  }

  .pad0 {
    padding: 0 !important;
  }

  .marB20 {
    margin-bottom: 20px;
  }
</style>

<template>
  <div class="defaultPage">
    <!--title-->
    <el-row class="FromNum">
      <el-col :span="24">
        <h2 class="inline-block grayh2">{{ $t('区块序号') }} {{ heightNum }}</h2>
        <span class="graySpan">{{ $t('在比特币区块链中高度为') }} {{ heightNum }} {{ $t('的区块') }}</span>
      </el-col>
    </el-row>
    <!--table-->
    <table class="table font-12 tableW" style="width: 100%">
      <tbody>
      <tr>
        <th colspan="2">{{ $t('概况') }}</th>
      </tr>
      <tr>
        <td>{{ $t('高度') }}</td>
        <td>
          <el-button type="text" v-text="currentBlock.height" class="blueColor pad0" disabled></el-button>
          <span style="color: #008000"> {{ $t('（主链）') }}</span>
        </td>
      </tr>
      <tr>
        <td>{{ $t('哈希值') }}</td>
        <td>
          <el-button type="text" v-text="currentBlock.hash" class="blueColor pad0"
                     @click="hashBlock(currentBlock.hash)"></el-button>
        </td>
      </tr>
      <tr>
        <td>{{ $t('上一区块') }}</td>
        <td>
          <el-button type="text" v-text="currentBlock.previousblockhash" class="blueColor pad0"
                     @click="hashBlock(currentBlock.previousblockhash)"></el-button>
        </td>
      </tr>
      <tr>
        <td>{{ $t('下一区块') }}</td>
        <td>
          <el-button type="text" v-text="currentBlock.nextblockhash" class="blueColor pad0"
                     @click="hashBlock(currentBlock.nextblockhash)"></el-button>
        </td>
      </tr>
      <tr>
        <td>{{ $t('时间') }}</td>
        <td>
          <el-popover
            placement="top"
            trigger="hover"
            :content=" currentBlock.time | timeString ">
            <span slot="reference">{{ currentBlock.time }}</span>
          </el-popover>
        </td>
      </tr>
      <tr>
        <td>{{ $t('播报方') }}</td>
        <td v-text="currentBlock.modifier"></td>
      </tr>
      <tr>
        <td>{{ $t('难度系数') }}</td>
        <td v-text="currentBlock.difficulty"></td>
      </tr>
      <tr>
        <td>{{ $t('Bits') }}</td>
        <td v-text="currentBlock.bits"></td>
      </tr>
      <tr>
        <td>{{ $t('交易次数') }}</td>
        <td v-text="currentBlock.number"></td>
      </tr>
      <tr>
        <td>{{ $t('输出总量') }}</td>
        <td>
          <span>$ </span>
          <span v-text="currentBlock.amount"></span>
        </td>
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
        <td>{{ $t('二进制哈希树根') }}</td>
        <td v-text="currentBlock.merkleroot"></td>
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
      <tr>
        <td>{{ $t('交易费') }}</td>
        <td>
          <span>$ </span>
          <span v-text="currentBlock.mint"></span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import {json2FormData} from '../assets/js/tool'

  async function getData (_this, blockHeight, next) {
    let {data: {code, data}} = await _this.$http.post('/Blocks/Block_Height', json2FormData({
      height: blockHeight,
      type: _this.$store.state.type
    }))
    if (code === 'StatusOk' && data) {
      _this.currentBlock = data
      next()
    }
  }
  export default {
    data () {
      return {
        currentBlock: {},
        heightNum: ''
      }
    },
    beforeRouteEnter (to, from, next) {
      let blockHeight = to.query.BlockHeight
      next(async _this => {
        _this.heightNum = blockHeight
        getData(_this, blockHeight, next)
      })
    },
    async beforeRouteUpdate  (to, from, next) {
      let blockHeight = to.query.BlockHeight
      this.heightNum = blockHeight
      getData(this, blockHeight, next)
    },
    methods: {
      hashBlock (HashBlock) {
        this.$router.push({
          name: 'hashDetail',
          query: {BlockHash: HashBlock}
        })
      }
    }
  }
</script>

<style scoped>
  .pad0 {
    padding: 0 !important;
  }
</style>

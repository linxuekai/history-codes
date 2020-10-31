<template>
  <div class="business clear-both" :class="{isSpecial}">
    <table width="100%" class="table font-12 clear-both">
      <tbody>
      <!--交易详情、手续费、时间-->
        <tr class="clear-both">
          <th colspan="5">
            <a href="javascript:;" style="width: 72%" class="fl blueColor font-12" @click="$router.push({name:'businessDetail', query:{Tx: item.Txid}})">{{ item.Txid }}</a>
            <p style="display: inline-block">{{ $t('手续费：') }}<span v-text="item.Fee || +Math.abs(resultNum).toFixed(8)"></span></p>
            <span class="fr" v-if="item.Time === undefined">{{ $t('日期') }}</span>
            <span class="fr" v-else>{{ item.Time | timeString }}</span>
          </th>
        </tr class="clear-both">
        <tr>
          <!--inputs-->
          <td width="40%">
            <div v-for="i in inputs" class="inputAddress">
              <p class="inline-block">{{ $t('输入：') }} </p>
              <a href="javascript:;"
                 v-bind:class="{wei: nowAddress === i.Address}"
                 v-if="i.Address != 'coinbase'"
                 @click="$router.push({name:'address', query:{Address:i.Address}})" class="blueColor">{{ i.Address }} <br></a>
              <el-button v-else type="text" class="grayColor font-12" disabled>{{ $t('没有输入（新生成）') }}</el-button>
              <br>
            </div>
          </td>
          <td style="line-height: 20px">
            <div v-for="i in inputs">
              <span>
                <span v-text="+i.Amount.toFixed(8)"></span>
                <span v-text="$store.state.type"></span>
              </span>
            </div>
          </td>

          <!--绿色箭头 strat-->
          <td>
            <img src="../assets/green.png" alt="" class="rightImg">
          </td>
          <!--绿色箭头 end-->

          <!--outputs start-->
          <td>
            <div v-for="o in outputs" class="outputAddress">
              <p class="inline-block">{{ $t('输出：') }} </p>
              <a href="javascript:;"
                 class="blueColor"
                 v-bind:class="{wei: nowAddress === o.Address}"
                 v-if="o.Spent == false"
                 @click="$router.push({name:'address', query:{Address:o.Address}})">
                {{ o.Address }}</a>
              <a href="javascript:;"
                 v-else class="grayColor"
                 @click="$router.push({name:'address', query:{Address:o.Address}})">{{ o.Address }}</a>
              <span v-if="o.Spent == false" style="margin-left: 6px;">{{ $t('（未花费）') }} </span>
              <span v-else style="margin-left: 6px;color: red">{{ $t('（已花费）') }} </span>
              <br/>
            </div>
          </td>
          <td>
            <div v-for="o in outputs"  class="clear-both">
              <span class="fr outputAddress">{{ +o.Amount.toFixed(8) }} <span v-text="$store.state.type"></span></span>
            </div>
            <br/>
          </td>
          <!--outputs end-->

        </tr>
      </tbody>
    </table>
    <!--按钮-->
    <div class="dataBtn fr clear-both">
      <el-button type="primary" size="medium" v-if="item.TXConfirmations > 0">{{ item.TXConfirmations }} {{ $t('确认') }} </el-button>
      <!--<el-button type="success" size="medium" v-if="item.outputs">{{ inputsNum }} SC</el-button>-->
      <el-button type="success" size="medium">{{ +outSum.toFixed(8) }} <span v-text="$store.state.type"></span></el-button>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['item'],
    name: 'business',
    computed: {
      inputs () {
        return this.item.inputs || this.item.Vins || []
      },
      outputs () {
        return this.item.outputs || this.item.Vouts || []
      },
      nowAddress: function () {
        return this.$route.query.Address
      },
      inpSum: function () {
        let inpSum = 0
        this.inputs.forEach(item => {
          inpSum += item.Amount
        })
        return inpSum
      },
      outSum: function () {
        let outSum = 0
        this.outputs.forEach(item => {
          outSum += item.Amount
        })
        return outSum
      },
      resultNum: function () {
        return this.inpSum - this.outSum
      },
      isSpecial: function () {
        return this.$store.state.type === 'SC' && this.outputs.length > 3 && this.outSum >= 0.09 &&
          ~this.outputs.findIndex(x => x.Amount === 0.015) &&
          ~this.outputs.findIndex(x => x.Amount === 0.02) &&
          ~this.outputs.findIndex(x => x.Amount === 0.025)
      }
    }
  }
</script>

<style scoped>
.rightImg{
  width:20px;
  height: 18px;
}
.dataBtn {
  margin-bottom: 20px;
}
.wei{
  color: green;
  font-weight: bolder;
}
  .inputAddress, .outputAddress {
    height: 20px;
    line-height: 20px;
  }
  .isSpecial {
    background-color: #fdfaf4;
  }
  .isSpecial th {
    background-color: #fdfaf4;
  }
</style>

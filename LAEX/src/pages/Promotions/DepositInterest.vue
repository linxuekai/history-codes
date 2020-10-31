<template>
  <div>
    <pre>
  平台已有币种存在平台利息，按照存入平台时的价格锚定利率，所获利息以USDT发放到用户在LAEX上的钱包，无需专有的进入窗口，以活动banner的形式显示，每个用户不限存币订单数量，每笔利息按照每一笔订单独立计算：

  存币1个月       用户在平台所持有币种价值的年化率 <span>8%</span>，利息支付锁仓3个月；
  存币3个月       用户在平台所持有币种价值的年化率 <span>10%</span>，利息支付锁仓2个月；
  存币6个月       用户在平台所持有币种价值的年化率 <span>12%</span>，利息支付锁仓1个月；
  存币12个月      用户在平台所持有币种价值的年化率 <span>18%</span>，利息支付无锁仓；

  不满1个月的要提币，提币没有利息；
  不满3个月的要提币，按照存入时的利率和价格生息；
  不满6个月的要提币，按3个月利率生息；
  不满12个月的要提币，按6个月利率生息。

  注！充提币时间统一按照北京时间计算。
    </pre>
    <div class="divider" style="border-top-color: #2b304a"></div>
    <div class="relative">
      <div class="pv-50 w40 mh-auto">
        <el-form>
          <el-form-item label="币种">
            <br><el-select v-model="formData.coin" class="w100">
            <el-option
              v-for="(obj, coin) in balance"
              :key="coin"
              :value="coin"
            ></el-option>
          </el-select>
          </el-form-item>
          <div class="mb-15" v-if="formData.coin">
            可用余额：{{balance[formData.coin].free}}
          </div>
          <el-form-item label="存币数量">
            <el-input v-model="formData.amount"></el-input>
          </el-form-item>
          <el-form-item label="存币时长">
            <br><el-select v-model="formData.save_len" class="w100">
            <el-option
              v-for="p in periods"
              :key="p"
              :value="p"
              :label="p + '个月'"
            ></el-option>
          </el-select>
          </el-form-item>
          <div class="pt-30">
            <el-button
              type="primary"
              class="w100">提交</el-button>
          </div>
        </el-form>
      </div>
        <require-login-comp></require-login-comp>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DepositInterest',
  data () {
    return {
      periods: [1, 3, 6, 12],
      formData: {
        coin: '',
        amount: '',
        save_len: 1
      }
    }
  },
  computed: {
    balance () {
      return this.$store.state.pairs.balance
    },
    authorized () {
      return this.$store.getters['user/authorized']
    }
  },
  created () {
    if (this.authorized) this.$store.dispatch('pairs/getBalance')
  }
}
</script>

<style scoped>
span{
  font-size: 20px;
  color: #e6a23c;
}
</style>

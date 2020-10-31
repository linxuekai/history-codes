<template>
  <div>
    <table class="text-center lh-2">
      <thead>
      <tr class="color-weak">
        <th>币种</th>
        <th>币币买入</th>
        <th>币币卖出</th>
        <th>法币买入</th>
        <th>法币卖出</th>
        <th>提币</th>
        <th>提币最低手续费</th>
      </tr>
      </thead>
      <tbody>
      <tr
        :key="coin"
        v-for="(oCoin, coin) in feeRates">
        <td>{{coin}}</td>
        <td>{{oCoin.coin_buy_poundage | percentage}}</td>
        <td>{{oCoin.coin_sell_poundage | percentage}}</td>
        <td>{{oCoin.legal_buy_poundage | percentage}}</td>
        <td>{{oCoin.legal_sell_poundage | percentage}}</td>
        <td>{{oCoin.withdraw_poundage | percentage}}</td>
        <td>{{oCoin.once_min_withdraw}} <span class="color-weak">{{coin}}</span></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'feeRates',
  computed: {
    feeRates () {
      return this.$store.state.feeRates
    },
  },
  filters: {
    percentage (num) {
      return num * 100 + '%'
    }
  }
}
</script>

<style scoped>
  th,td{
    border-bottom: 1px solid #1f2943;
    padding: 5px 0;
  }
</style>

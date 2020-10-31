<template>
  <div class="order-block">
    <table class="order-table" cellspacing="0px">
      <thead>
        <tr>
          <th>VTS</th>
          <th>VS</th>
          <th>买入价</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in saleStream" :key="item.d">
          <td v-text="Math.round(item.s)"></td>
          <td v-text="(Math.round(item.s)*item.p).toFixed(2)"></td>
          <td v-text="(item.p).toFixed(5)" class="sale-text"></td>
        </tr>
      </tbody>
      <tr class="current-price-tr">
        <td colspan="3" class="current-price buy-text">
          <span v-text="currentPrice"></span>&nbsp;&nbsp;&nbsp;VS / VTS
        </td>
      </tr>
      <thead>
      <tr>
        <th>VTS</th>
        <th>VS</th>
        <th>买入价</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in buyStream" :key="item.d">
        <td v-text="Math.round(item.s)"></td>
        <td v-text="(Math.round(item.s)*item.p).toFixed(2)"></td>
        <td v-text="(item.p).toFixed(5)" class="buy-text"></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import {Table, TableColumn} from 'element-ui'
  import Vue from 'vue'
  [Table, TableColumn].forEach(comp => { Vue.use(comp) })

  import {mapState} from 'vuex'

  export default {
    computed: {
      ...mapState({
        currentPrice: state => state.trade.currentPrice,
        buyStream: state => state.trade.buyStream,
        saleStream: state => state.trade.saleStream
      })
    }
  }
</script>

<style scoped>
  .order-block{
    height:100%;
    width: 100%;
  }
  .order-table th:not(:last-child){
    width: 35%;
  }
  .order-table th:last-child{
    width: 30%;
  }
  .order-table {
    text-align: center;
    width: 100%;
    font-family: Arial sans-serif;
    font-size: 12px;
  }
  .order-table td{
    padding:2px 0;
  }
  td.current-price{
    padding:8px;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid #5B7990;
  }
  .order-table th{
    padding: 5px 0;
  }
  .order-table tbody tr:nth-child(even) {
    background: #26313d;
  }
  .order-table tbody tr:first-child td{
    padding-top: 4px;
    border-top:1px solid #5B7990;
  }
  .order-table tbody tr:last-child td {
    padding-bottom: 4px;
    border-bottom:1px solid #5B7990;
  }
</style>

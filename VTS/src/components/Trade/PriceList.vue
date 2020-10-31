<template>
  <div>
    <div class="header">交易对</div>
    <div class="marks">
      <button class="active">VTS</button>
      <button>BCC</button>
    </div>
    <div class="table-wrap">
      <table cellspacing="0px" id="priceTable">
        <thead>
        <tr>
          <th>价格</th>
          <th>交易量</th>
          <th>已完成</th>
          <th>完成比例</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,idx) in prices" :key="idx" :data-sold="item.soldAmount">
          <td v-text="'$ '+item.price.toFixed(5)"></td>
          <td>16180</td>
          <td v-text="item.soldAmount?Math.floor(item.soldAmount):'--'"></td>
          <td v-text="(100*item.soldAmount/16180).toFixed(1)+'%'" :class="item.soldAmount===16180?'sale-text':'buy-text'"></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import AllPrices from '@/assets/js/prices'
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        AllPrices,
        showLevals: 17
      }
    },
    computed: {
      currentPriceLeval () {
        return Math.floor(this.componySold / 16180) + 1
      },
      currentLevalSaleOut () {
        return this.componySold % 16180
      },
      prices () {
        let leval = this.currentPriceLeval - 1
        let range = ~~((this.showLevals) / 2)
        let currentPrice = this.currentPrice
        let cutArr = leval > range
          ? this.AllPrices.slice(leval - range, leval + range + 1)
          : this.AllPrices.slice(0, this.showLevals)
        return cutArr.map(
          price => {
            return price < currentPrice
              ? {price, soldAmount: 16180}
              : price > currentPrice
                ? {price, soldAmount: 0}
                : {price, soldAmount: this.currentLevalSaleOut}
          }
        )
      },
      ...mapState({
        componySold: state => state.trade.componySold,
        currentPrice: state => state.trade.currentPrice
      })
    }
  }
</script>

<style scoped>
  .header {
    text-align: center;
    font-weight: bold;
    padding: 6px;
    border-bottom: 1px solid #5B7990;
  }

  .marks {
    padding: 8px;
    border-bottom: 1px solid #5B7990;
  }

  .marks button {
    cursor: pointer;
    border: 0;
    background: #26313d;
    padding: 5px 10px;
    color: white;
  }

  .marks button.active {
    background: #5B7990;
    box-shadow: 0 0 5px #5B7990;
  }

  table {
    width: 100%;
    font-size: 12px;
    padding:0 5px;
    text-align: center;
  }

  td:first-child,th:first-child{
    text-align: left;
  }

  th {
    font-weight: normal;
    padding: 5px 0;
    border-bottom: 1px solid #5B7990;
  }

  tbody tr:nth-child(even) {
    background: #26313d;
  }

  td {
    padding: 2px 0;
  }

  .buy-text {
    color: #05a651;
  }

  .sale-text {
    color: #c5510c;
  }

  .table-wrap {
    padding-bottom: 10px;
    border-bottom: 1px solid #5B7990;
  }
</style>
<template>
  <div class="trade-user-info-comp" v-if="authorized && legalBalance.legal[tradeCoin]">
    <ul>
      <!--<li>-->
        <!--<dl>-->
          <!--<dt>我的单数</dt>-->
          <!--<dd>103</dd>-->
        <!--</dl>-->
      <!--</li>-->
      <!--<li>-->
        <!--<dl>-->
          <!--<dt>我的完成率</dt>-->
          <!--<dd>95.15%</dd>-->
        <!--</dl>-->
      <!--</li>-->
    </ul>
    <ul class="ml-20">
      <li>{{tradeCoin}}</li>
      <li>
        <dl>
          <dt>可用</dt>
          <dd>{{legalBalance.legal[this.tradeCoin].free | sliceTo(8)}}</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>冻结</dt>
          <dd>{{legalBalance.legal[this.tradeCoin].freeze | sliceTo(8)}}</dd>
        </dl>
      </li>
    </ul>
    <router-link
      class="fr"
      :to="{name: 'OtcWallet'}">资金划转</router-link>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'

export default {
  name: "trade-user-info-comp",
  props: [
    'tradeCoin'
  ],
  data () {
    return {}
  },
  computed: {
    ...mapState('user', [
      'legalBalance'
    ]),
    ...mapGetters('user', [
      'authorized'
    ])
  },
  watch: {},
  methods: {},
  created () {
  }
}
</script>

<style scoped>
.trade-user-info-comp{
  background-color: #f6f6f6;
  height: 40px;
  line-height: 40px;
  border-radius: 20px;
  padding: 0 20px;
  box-shadow: 1px 3px 3px #ddd;
}
ul,li,dl,dt,dd {
  display: inline-block;
}
dl {
  margin: 0 15px;
}
dt{
  color: gray;
}
  dd{
    margin-left: 10px;
  }
  .ml-40{
    margin-left: 40px;
  }
</style>

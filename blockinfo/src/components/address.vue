<template>
  <div class="defaultPage">
    <!--title-->
    <el-row class="FromNum">
      <el-col :span="24">
        <h2 class="inline-block grayh2"><span v-text="$store.state.type"></span> {{ $t('地址') }}</h2>
        <span class="graySpan">{{ $t('地址是您用来给他人发送') }} <span v-text="$store.state.type"></span> {{ $t('的识别码。') }}</span>
      </el-col>
    </el-row>
    <!--table-->
    <el-row v-loading="loading.address">
      <el-col :span="12">

        <table class="tableLeft fl font-12">
          <tbody>
          <tr>
            <th colspan="2">{{ $t('概况') }}</th>
          </tr>
          <tr>
            <td>{{ $t('地址') }}</td>
            <td>
              <el-button
                type="text"
                class="blueColor"
                v-text="address"
              ></el-button>
            </td>
          </tr>
          </tbody>
        </table>
      </el-col>
      <el-col :span="12">
        <table class="tableRight fr tableW font-12">
          <tbody>
          <tr>
            <th colspan="2">{{ $t('交易记录') }}</th>
          </tr>
          <tr>
            <td>{{ $t('交易次数') }}</td>
            <td v-text="blockBox.count"></td>
          </tr>
          <tr>
            <td>{{ $t('总共收款') }}</td>
            <td v-text="blockBox.amount"></td>
          </tr>
          <tr>
            <td>{{ $t('最终余额') }}</td>
            <td v-text="blockBox.balance"></td>
          </tr>
          </tbody>
        </table>
      </el-col>
    </el-row>
    <!--交易记录title-->
    <el-row class="mar30">
      <div class="fl">
        <h3 class="inline-block">{{ $t('交易记录') }}</h3>
      </div>
      <!--<div class="fr">-->
        <!--<el-dropdown trigger="click">-->
  <!--<span class="el-dropdown-link blueColor">-->
    <!--下拉菜单<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
  <!--</span>-->
          <!--<el-dropdown-menu slot="dropdown">-->
            <!--<el-dropdown-item>无法动用（默认）</el-dropdown-item>-->
            <!--<el-dropdown-item>所有交易</el-dropdown-item>-->
            <!--<el-dropdown-item>支付</el-dropdown-item>-->
            <!--<el-dropdown-item>收款</el-dropdown-item>-->
            <!--<el-dropdown-item>仅确认</el-dropdown-item>-->
            <!--<el-dropdown-item>只显示未确认的</el-dropdown-item>-->
          <!--</el-dropdown-menu>-->
        <!--</el-dropdown>-->
      <!--</div>-->

    </el-row>
    <!--交易详情组件-->
    <business v-for="item in blockTx"
              :item="item"
              :key="item.amount"
    ></business>
    <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading" spinner="waveDots">
      <span slot="no-more">
        <!--{{ blockTx.length > 0 ? $t('没有更多') : $t('没有数据')}}-->
        {{$t('没有更多')}}
      </span>
      <span slot="no-results">
        <!--{{ blockTx.length > 0 ? $t('没有更多') : $t('没有数据')}}-->
         {{$t('没有数据')}}
      </span>
    </infinite-loading>
  </div>
</template>

<script>
  import business from './business'
  import InfiniteLoading from 'vue-infinite-loading'
  import Vue from 'vue'
  import {json2FormData} from '../assets/js/tool'
  import {Dropdown, DropdownMenu, DropdownItem} from 'element-ui'

  [Dropdown, DropdownMenu, DropdownItem].forEach(comp => Vue.use(comp))

  export default {
    components: {
      business,
      InfiniteLoading
    },
    data () {
      return {
        pageIndex: 1,
        blockTx: [],
        loading: {
          address: false
        },
        blockBox: {}
      }
    },
    computed: {
      address () {
        return this.$route.query.Address
      }
    },
    watch: {
      '$route.query' () {
        this.init()
      }
    },
    methods: {
      init () {
        this.pageIndex = 1
        this.blockTx = []
        this.blockBox = {}
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
      },
      async infiniteHandler ($state) {
        let {data: {code, data}} = await this.$http.post('/Blocks/Address', json2FormData({
          type: this.$store.state.type,
          address: this.$route.query.Address,
          page: this.pageIndex++,
          number: 50
        }))
        if (code === 'StatusOk' && data) {
          this.blockTx.push(...data.data.tx)
          this.blockBox = data
        }
//        data.data.pages > this.pageIndex - 1 ? $state.loaded() : $state.complete()
        data.data.tx.length > 0 ? $state.loaded() : $state.complete()
//        this.loading.address = false
      }
    },
    beforeRouteEnter (to, from, next) {
      next(_this => {
//        _this.pageIndex = 1
//        _this.blockTx.tx = []
//        _this.$nextTick(() => {
//          _this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
//        })
        _this.init()
      }
      )
    }
  }
</script>

<style scoped>
  .mar30 {
    margin: 30px 0;
  }
  h3{
    color: #5F5F5F;
  }
</style>

<template>
  <div class="defaultPage">
    <!--日期-->
    <el-row class="text-align FromNum">
      <el-col :span="24">
        <el-button class="font-30 blueColor" @click="clickDate(-86400)" type="text"><i class="el-icon-d-arrow-left"></i>{{ $t('prev') }}</el-button>
        <h2 class="font-30 inline-block">{{ $t('区块挖掘自：')}}{{ startTime | selectedDate }}</h2>
        <el-button class="font-30 blueColor" @click="clickDate(86400)" type="text" :disabled="isToday">{{ $t('next') }}<i class="el-icon-d-arrow-right"></i></el-button>
      </el-col>
    </el-row>

    <!--表格-->
    <table class="table font-12" width="100%" id="tab">
      <thead>
      <tr>
        <th width="15%">{{ $t('高度') }}</th>
        <th width="20%">{{ $t('时间') }}</th>
        <th>{{ $t('哈希值') }}</th>
        <th width="10%">{{ $t('大小') }}（kB）</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in tableData" :key="item.time">
        <td width="15%">
          <a href="javascript:;" v-text="item.height" class="blueColor" @click="heightClick(item.height)"></a>
          <span style="color: #008000" v-if="item.height"> {{ $t('（主链）') }}</span>
        </td>
        <td width="20%">
          <el-popover
            placement="top"
            trigger="hover"
            :content="item.time | timeString ">
            <span slot="reference">{{ item.time }}</span>
          </el-popover>
        </td>
        <td>
          <a href="javascript:;" v-text="item.hash" class="blueColor" @click="hashClick(item.hash)"></a>
        </td>
        <td width="10%" v-text="item.size"></td>
      </tr>
      </tbody>
      <tr>
        <td colspan="4">
          <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading" spinner="waveDots">
            <span slot="no-more">
              {{ $t('没有更多') }}
            </span>
            <span slot="no-results">
              {{ $t('没有数据') }}
            </span>
          </infinite-loading>
        </td>
      </tr>

    </table>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Row, Col, Table, TableColumn, Icon, Popover} from 'element-ui'
  import InfiniteLoading from 'vue-infinite-loading'
  import {json2FormData} from '../assets/js/tool'

  [Row, Col, Table, TableColumn, Icon, Popover].forEach(comp => Vue.use(comp))

  export default {
    components: {
      InfiniteLoading
    },
    data () {
      return {
        pageIndex: 1,
        tableData: [],
        startTime: +new Date(Date.now() - Date.now() % 864e5 - 288e5) / 1000
      }
    },
    computed: {
      endTime () {
        return this.startTime + 864e2
      },
      isToday () {
        return this.startTime + 864e2 > Date.now() / 1000
      }
    },
    watch: {
      '$store.state.type' () {
        this.clickDate(0)
      }
    },
    filters: {
      selectedDate (day) {
        var t = new Date(day * 1000)
        var year = t.getFullYear()
        var month = t.getMonth() + 1
        var date = t.getDate()
        return date + '/' + month + '/' + year
      }
    },
    methods: {
      async infiniteHandler ($state) {
        var res = await this.$http.post('/Blocks/query', json2FormData({
          page: this.pageIndex++,
          number: 50,
          start: this.startTime,
          end: this.endTime,
          type: this.$store.state.type
        }))
        if (res.data.code === 'StatusOk') {
          this.tableData = [...this.tableData, ...res.data.data.data]
        }
//        res.data.data.pages > this.pageIndex - 1 ? $state.loaded() : $state.complete()
        res.data.data.data.length > 0 ? $state.loaded() : $state.complete()
      },
//      点击 上一页  下一页
      async clickDate (num) {
        this.startTime = this.startTime + num
        this.pageIndex = 1
        this.tableData = []
        this.$nextTick(() => {
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
        })
      },
//      点击高度跳转页面  带height
      heightClick (blockHeight) {
        this.$router.push({
          name: 'BlockNumber',
          query: {BlockHeight: blockHeight}
        })
      },
//      点击哈希跳转页面  带hash
      hashClick (blockHash) {
        this.$router.push({
          name: 'hashDetail',
          query: {BlockHash: blockHash}
        })
      }
    }
  }
</script>

<style scoped>
  h2 {
    color: #5F5F5F;
    margin: 0 15px;
  }
</style>
<style>
  #tab {
    margin-bottom: 40px;
  }

  #tab td, #tab th {
    padding: 8px;
  }
</style>

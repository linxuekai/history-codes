<template>
  <div class="Notice">
    <div class="NoticeTitle">公告</div>
    <div class="NoticeListWrap" v-if="articleList.length > 0">
      <div class="NoticeListList" v-for="(value, index) in articleList">
        <router-link :to="noticePage+value.id" tag="div" class="NoticeListItem">
          <div class="NoticeListItemTitle">
            <span class="point"></span>
            <span class="title" v-text="value.Title"></span>
            <span class="time" v-text="value.SetupTime"></span>
          </div>
          <div class="NoticeListItemContent" v-text="value.Summary"></div>
        </router-link>
      </div>
      <div class="NoticeListPagination">
        <el-pagination @current-change="handleCurrentChange"
                       layout="total, prev, pager, next"
                       :page-size="pagination.pageSize"
                       :total="pagination.total"
                       :page-count="pagination.pageCount"
                       :current-page="pagination.currentPage">
        </el-pagination>
      </div>
    </div>
    <div class="noData" v-else>
      暂无数据
    </div>
  </div>
</template>

<script>
   import {Pagination} from 'element-ui'
   import Vue from 'vue'
   [Pagination].forEach(comp => { Vue.use(comp) })
   export default {
     name: 'Notice',
     data () {
       return {
         pagination: {
           pageSize: 8,
           total: 0,
           currentPage: 1,
           pageCount: 1,
           isFirstRequest: true
         },
         noticePage: '/News/NoticeDetail/',
         dataList: [{
           id: '1',
           Title: 'VTS系统更新升级通知',
           Summary: '尊敬的玩家们，为了给大家带来更安全更丰富的体验，“威特金融帝国”系统的...',
           SetupTime: '2017-10-23 09:00',
           Lang: 'zh-CN'
         }],
         curPageShowData: [],
         lang: '',
         articleList: []
       }
     },
     beforeRouteEnter: (to, from, next) => {
       next(vm => {
         vm.lang = vm.$i18n.locale
         vm.GetAdList(vm.lang)
         vm.pagination.total = vm.articleList.length
       })
     },
     methods: {
       handleCurrentChange (val) {
         this.pagination.currentPage = val
         this.curPageShowData = this.articleList.slice(this.pagination.pageSize * (val - 1), val * this.pagination.pageSize)
       },
       GetAdList (Lang) {
         this.articleList = this.dataList.filter(x => x.Lang.indexOf(Lang) >= 0)
       }
     }
   }
</script>

<style scoped>
  .Notice{
    color: #fff;
    width: 80%;
    height: 800px;
    margin: 86px auto;
    font-size: 14px;
    max-width: 988px;
  }
  .NoticeTitle{
    font-size: 24px;
    border-bottom: 1px solid rgba(255,255,255,.3);
    padding: 0 0 10px 14px;
  }
  .NoticeListList{
    padding: 10px 0;
    border-bottom: 1px dashed rgba(255,255,255,.3);
    height: 96px;
    box-sizing: border-box;
  }
  .NoticeListItem{
    padding: 16px 20px 16px 10px;
    height: 76px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .NoticeListItem:hover{
    background: rgba(255,255,255,.1);
  }
  .NoticeListItemTitle{
    margin-bottom: 8px;
    position: relative;
  }
  .NoticeListItemTitle .point{
    position: absolute;
    top: 10px;
    display: inline-block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #fff;
  }
  .NoticeListItemTitle .title{
    font-size: 16px;
    margin-left: 10px;
  }
  .NoticeListItemTitle .time{
    position: absolute;
    right: 0;
  }
  .NoticeListItemContent{
    width: 70%;
    font-size: 12px;
    margin-left: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow : ellipsis
  }
  .NoticeListPagination{
    margin-top:62px;
    text-align: right;
  }
  .noData{
    text-align: center;
    margin-top: 10px;
  }
</style>

<style>
  .NoticeListPagination .el-pager li{
    border: none;
    background:transparent;
  }
  .NoticeListPagination .el-pager li.active{
    border-color: transparent;
  }
  .NoticeListPagination .el-pagination button{
    background: transparent;
    border: none;
  }
  .NoticeListPagination .el-pagination__total{
    color: #fff
  }
</style>

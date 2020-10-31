<template>
  <div class="Information">
    <div v-if="false">
      <img :src="require('../../../static/img/information.png')">
    </div>
    <div class="InformationTitle">资讯</div>
    <div class="InformationListWrap">
      <div v-for="item in dataList" class="InformationList" :key="item.date" @click="showNews(item)">
        <div>
          <div class="InformationItemContentTitle" v-text="item.title"></div>
          <div class="InformationItemContentSetupTime">时间：<span v-text="item.date"></span></div>
        </div>
      </div>
    </div>
    <el-dialog title="最新资讯"
               size="large"
               class="dialog"
               :visible.sync="$store.state.news.dialogVisible">
      <div v-text="currentNews.date"></div>
      <div v-html="currentNews.content"></div>
    </el-dialog>
  </div>
</template>

<script>
  /* eslint-disable */
  import { Dialog } from 'element-ui'
  import Vue from 'vue'
  import {mapState, mapMutations} from 'vuex'

  Vue.use(Dialog)
  export default {
    name: 'Information',
    computed: {
      ...mapState({
        dataList: state => state.news.dataList,
        currentNews: state => state.news.currentNews,
        dialogVisible: state => state.news.dialogVisible
      })
    },
    methods: {
      ...mapMutations([
        'showNews'
      ])
    }
  }
</script>

<style scoped>
  .Information {
    color: #fff;
    width: 988px;
    height: 800px;
    margin: 86px auto;
    font-size: 14px;
  }

  .InformationTitle {
    font-size: 24px;
    border-bottom: 1px solid rgba(255, 255, 255, .3);
    padding: 0 0 10px 14px;
    margin-top: 18px;
  }

  .InformationList {
    padding: 10px 0 20px;
    border-bottom: 1px solid rgba(255, 255, 255, .3);
  }

  .InformationItem {
    padding: 10px 0;
    overflow: hidden;
    cursor: pointer;
  }

  .InformationItemPic {
    width: 254px;
    height: 184px;
    float: left;
  }

  .InformationItemContent {
    float: left;
    padding-top: 18px;
    margin-left: 30px;
    width: 702px;
    overflow: hidden;
  }

  .InformationItemContentTitle {
    font-size: 18px;
    color: skyblue;
    cursor: pointer;
  }

  .InformationItemContentTitle:hover {
    color: powderblue;
  }

  .InformationItemContentSummary {
    margin: 13px 0 24px;
    max-height: 74px;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis
  }

  .InformationItemContentSetupTime {
    font-size: 12px;
    color: #bbb;
  }
</style>

<style>
  .news-footer {
    text-align: right;
  }

  .NoticeListPagination .el-pager li {
    border: none;
    background: transparent;
  }

  .NoticeListPagination .el-pager li.active {
    border-color: transparent;
  }

  .NoticeListPagination .el-pagination button {
    background: transparent;
    border: none;
  }

  .NoticeListPagination .el-pagination__total {
    color: #fff
  }

  .el-dialog__body {
    font-family: "Microsoft YaHei UI", sans-serif;
    font-size: 16px;
  }
  .el-dialog.el-dialog--large{
    padding: 1% 5%;
    max-width: 1400px;
  }
</style>

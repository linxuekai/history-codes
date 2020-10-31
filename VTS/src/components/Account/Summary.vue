<template>
  <div>
    <div class="Summary">
      <div class="f-s-20">概述</div>

      <div class="f-s-20 m-t-58">可用余额</div>
      <div class="balanceTable">
        <div class="balanceTable-title">
          <span>资产</span>
          <span>换算值</span>
        </div>
        <div class="balanceTable" v-if="balance.length>0">
          <div class="balanceTable-tr" v-for="(value,index) in balance" :key="index">
            <span v-text="value.zc"></span>
            <span v-text="value.hsz"></span>
          </div>
        </div>
        <div class="balanceTable-tr f-s-12" v-else>暂无数据</div>
      </div>

      <div class="f-s-20">近期活动</div>
      <div class="balanceTable">
        <div class="balanceTable-title">
          <span>操作</span>
          <span>信息</span>
        </div>
        <div class="balanceTable-tr" v-if="activeList.length>0">
          <div class="balanceTable-tr" v-for="(value,index) in activeList" :key="index">
            <span v-text="value.zc"></span>
            <span v-text="value.hsz"></span>
          </div>
        </div>
        <div class="balanceTable-tr f-s-12" v-else>近期无活动</div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'summary',
    data () {
      return {
        activeList: [],
        balance: []
      }
    }
  }
</script>

<style scoped>
  .Summary{
    width: 720px;
    font-family: "Microsoft YaHei UI", sans-serif;
    font-size: 16px;
    color: #ffffff;
    margin:100px auto 20px;
  }
  .m-t-58{
    margin-top: 58px;
  }
  .f-s-20{
    font-size: 20px;
  }
  .f-s-12{
    font-size: 12px;
  }
  .balanceTable{
    margin: 22px 0 150px 0;
  }
  .balanceTable-title{
    border-bottom: 1px solid rgba(255,255,255,.5);
    padding-bottom: 10px;
  }
  .balanceTable-title span,.balanceTable span{
    display: inline-block;
    width: 48%;
    text-align: center;
  }
  .balanceTable-tr{
    margin-top: 12px;
  }
</style>

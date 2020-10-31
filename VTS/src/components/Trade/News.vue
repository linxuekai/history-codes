<template>
  <div class="news-wrap">
    <div class="header">今日资讯</div>
    <ul>
      <li
        v-for="(item, idx) in dataList"
        :key="idx"
        v-text="item.title"
        @click="$router.push('/News/Information');showNews(item)"></li>
      <li @click="$router.push('/News/Information')">更多资讯...</li>
    </ul>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  export default {
    computed: {
      ...mapState({
        dataList: state => state.news.dataList.slice(0, 7)
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
  .header{
    padding:8px 10px;
    border-bottom: 1px dotted #5B7990;
    font-weight: bold;
  }
  ul {
    padding-left:20px;
    font-size: 12px;
    margin-bottom: 0;
  }
  li {
    padding: 5px 0;
    cursor: pointer;
  }
  li:hover{
    text-decoration: underline;
  }
</style>

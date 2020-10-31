<template>
  <div>
    <div class="generalBox">
      <div class="f-s-20 p-lr-10">账户</div>

      <div class="setting-subTitle p-lr-10">我的账户列表</div>

      <div class="m-t--20">一个主账户含多个子账号</div>
      <ul class="sub-list">
        <li v-for="profilename in subAccountList" :key="profilename" v-text="profilename === 'VTS_Default'?'主账号':profilename"></li>
      </ul>

    </div>

  </div>
</template>

<script>
  export default {
    computed: {
      subAccountList () {
        return Object.keys(this.$store.state.bigAccount)
      }
    }
  }
</script>

<style scoped>
  .generalBox{
    width: 610px;
    margin: 0 auto 100px;
    font-family: "Microsoft YaHei", sans-serif;
    font-size: 14px;
    color: #ffffff;
    box-sizing: border-box;
  }
 .m-t--20{
   margin-top: -20px;
 }
  .sub-list {
    font-size: 20px;
    color: wheat;
  }

  .sub-list li {
    margin:10px 0;
  }

</style>



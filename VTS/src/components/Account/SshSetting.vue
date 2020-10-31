<template>
  <div>
    <div class="sshSettine">
      <div class="title_split">
        <span class="f-s-20">备注密钥</span>
      </div>
      <div class="sshTips">
        <div class="m-t-24">交易附带的备注信息是使用备注公钥加密后传输的。为了解密备注信息，需要拥有备注公钥对应的私钥。</div>
        <div class="m-t-18">备注信息由单独公/私钥对进行管理，而非兼用活跃权限职权实体可让你安全的将备注信息的只读权限交
          第三方，而无需暴露在资金控制权外泄的风险下。</div>
      </div>
      <div class="ssyTitle">备注公钥</div>
      <div class="sshInputDiv">
        <input type="text" v-model="mishi">
        <img :src="require('@/assets/img/mishi.png')">
      </div>
      <div class="sshBtnBox">
        <button>保存修改</button>
        <button>重置修改</button>
      </div>

      <div class="ssh-active">
        <div class="ssh-title">
          近期活动
        </div>

        <div class="ssh-active-table">
          <div class="sshTableTitle">
            <div class="sshTableTh">操作</div>
            <div class="sshTableTh">信息</div>
          </div>
          <div v-if="active.length=0">
            <div class="sshTableTr" v-for="(value,index) in active" :key="index">
              <div class="sshTableTd" v-text="value.action"></div>
              <div class="sshTableTd" v-text="value.message"></div>
            </div>
          </div>
          <div class="m-t-12" v-else>近期无活动</div>

        </div>

      </div>


    </div>
  </div>
</template>

<script>
  export default {
    name: 'sshSettine',
    data () {
      return {
        active: [
          {action: 'action', message: 'message'},
          {action: 'action', message: 'message'},
          {action: 'action', message: 'message'}
        ],
        mishi: 'BT52EE5556EG6266RFTVF66TF555EGR63F255EGFRWRF'
      }
    },
    beforeRouteEnter: (to, from, next) => {
      next(vm => {
        vm.$store.dispatch('changeTheme', ' ')
      })
    }
  }
</script>

<style scoped>
  .sshSettine{
    width: 720px;
    font-size: 14px;
    color:#fff;
    font-family: "Microsoft YaHei UI", sans-serif;
    margin: 100px auto 20px;
  }
  .title_split{
    width: 100%;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255,255,255,.3);
  }
  .title_split span{
    font-size: 20px;
  }
  .m-t-24{
    margin-top: 24px;
  }
  .m-t-12{
    margin-top: 12px;
  }
  .m-t-18{
    margin-top: 18px;
  }
  .ssyTitle{
    margin-top: 30px;
    font-size: 20px;
  }
  .sshInputDiv{
    background-color: #ffffff;
    width: 705px;
    height: 40px;
    margin-top: 10px;
    position: relative;
    border-radius: 4px;
  }
  .sshInputDiv input{
    border-radius: 4px;
    height: 40px;
    padding: 0 16px;
    width: 540px;
    box-sizing: border-box;
    color:#666;
    border: none;
  }
  .sshInputDiv img{
    position: absolute;
    top: 6px;
    right: 16px;
    width: 28px;
    height: 28px;
  }
  .sshBtnBox{
    margin-top: 30px;
  }
  .sshBtnBox button{
    width: 120px;
    height: 40px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .sshBtnBox button:nth-of-type(1){
    background: #fff;
    color: #143d5f;
    margin-right: 20px;
  }
  .sshBtnBox button:nth-of-type(2){
    background: transparent;
    border: 1px solid #fff;
    color: #fff;
  }
  .ssh-active{
    margin-top: 54px;
  }
  .ssh-title{
    font-size: 20px;
  }
  .sshTableTitle{
    margin-top: 22px;
    padding-bottom: 14px;
    border-bottom: 1px solid rgba(255,255,255,.3);
    overflow: auto;
  }
  .sshTableTr{
    margin-top: 14px;
    overflow: auto;
  }
  .sshTableTh,.sshTableTd{
    font-size: 12px;
    float: left;
  }
  .sshTableTh{
    width: 224px;
  }
  .sshTableTd{
    width: 224px;
    font-size: 14px;
  }
</style>

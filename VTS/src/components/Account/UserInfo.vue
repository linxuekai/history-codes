<template>
  <div>
    <div class="userInfo">
      <div class="title_split">
        <span>基本资料</span>
      </div>
      <div class="userInfo-content">
        <div class="width60 f-l userInfo-content-userData">
          <div class="userData-item">
            <div class="userData-left">* 用户名：</div>
            <div class="userData-right">
              <input type="text" class="border-box" placeholder="请输入用户名">
              <img class="passIcon" :src="require('@/assets/img/passIcon.png')" v-show="passIcon===true">
            </div>
          </div>
          <div class="userData-item">
            <div class="userData-left">真实姓名：</div>
            <div class="userData-right">
              <input type="text" class="border-box" placeholder="请输入真实姓名">
            </div>
          </div>
          <div class="userData-item">
            <div class="userData-left">性别：</div>
            <div class="userData-right">
              <div class="userData-right-label" v-on:click="chooseSex('nan')">
                <div class="userData-radio ps-relative t-10">
                  <img v-show="userData.sex==='nan'" class="ps-absolute" :src="require('@/assets/img/passIcon.png')">
                </div>
                <span class="txt">男</span>
              </div>
              <div class="userData-right-label" v-on:click="chooseSex('nv')">
                <div class="userData-radio ps-relative t-10">
                  <img v-show="userData.sex==='nv'" class="ps-absolute" :src="require('@/assets/img/passIcon.png')">

                </div>
                <span class="txt">女</span>
              </div>
              <div class="userData-right-label" v-on:click="chooseSex('sc')">
                <div class="userData-radio ps-relative t-10">
                  <img v-show="userData.sex==='sc'" class="ps-absolute" :src="require('@/assets/img/passIcon.png')">
                </div>
                <span class="txt">保密</span>
              </div>
            </div>
          </div>
          <!-- <div class="userData-item">
             <div class="userData-left">手机号码：</div>
             <div class="userData-right">
               189****2556
             </div>
           </div>
           <div class="userData-item">
             <div class="userData-left">邮箱：</div>
             <div class="userData-right">
               135****@qq.com
             </div>
           </div>-->
          <div class="userData-item">
            <div class="userData-left h-36">生日：</div>
            <div class="userData-right h-36">
              <el-date-picker v-model="value1" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
              </el-date-picker>
            </div>
          </div>
          <div class="userData-item overflow-hidden">
            <div class="userData-left">个人简介：</div>
            <div class="userData-right h-130">
              <textarea class="border-box"></textarea>
            </div>
          </div>
          <div class="userData-item">
            <div class="userData-left"></div>
            <div class="userData-right userData-btnItem">
              <button class="">取消</button>
              <button class="">保存信息</button>
            </div>
          </div>


        </div>

        <div class="f-l userInfo-content-img">
          <!-- <img class="userAvator" src="/static/img/avatar.png">-->
          <div class="m-b-0">
            上传头像
          </div>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon whiteBorder"></i>
          </el-upload>

          <!--<div class="userInfo-uploadImag">
            上传头像
          </div>-->
        </div>

      </div>

    </div>
  </div>

</template>

<script>
  import {Message, DatePicker, Upload} from 'element-ui'
  import Vue from 'vue'
  [DatePicker, Upload].forEach(comp => { Vue.use(comp) })
  export default {
    name: 'userInfo',
    data () {
      return {
        imageUrl: '/static/img/uploadAvator.png',
        pickerOptions0: {
          disabledDate (time) {
            return time.getTime() > Date.now() - 8.64e7
          }
        },
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        },
        value1: '',
        value2: '',
        userData: {
          sex: 'nan'
        },
        passIcon: false
      }
    },
    methods: {
      chooseSex (sex) {
        this.userData.sex = sex
      },
      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          Message.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    }
  }

</script>

<style scoped>
  .whiteBorder{
    border: 1px solid #fff;
  }
  .m-b-0{
    margin-bottom: 10px;
  }
  .h-36{
    height: 36px !important;
    line-height: 36px !important;
  }
  .userInfo-uploadImag{
    margin-top: 1px;
    width: 172px;
    height: 28px;
    line-height: 28px;
    background-color: #ffffff;
    color: #143d5f;
    text-align: center;
  }
  .userInfo{
    font-size: 14px;
    color:#fff;
    font-family: "Microsoft YaHei UI", sans-serif;
    width:80%;
    max-width: 978px ;
    margin: 100px auto 20px;
  }
  .title_split{
    width: 90%;
    padding-bottom: 10px;
    min-width: 876px;
    border-bottom: 1px solid rgba(255,255,255,.3);
  }
  .title_split span{
    font-size: 20px;
  }
  .userInfo-content{
    margin-top: 22px;
    overflow: hidden;
  }
  .h-130{
    height: 130px !important;
  }
  .f-l{
    float: left;
  }
  .t-10{
    top:10px
  }
  .ps-relative{
    position: relative;
  }
  .ps-absolute{
    position: absolute;
  }
  .userInfo-content-userData{
    width: 60%;
  }
  .userData-item:nth-of-type(1){
    margin-top: 0;
  }
  .userData-item{
    margin-top: 30px;
    overflow: auto;
  }
  .userData-left{
    width: 90px;
    height: 32px;
    line-height: 32px;
    color: #ddd;
    float: left;
    text-align: right;
  }

  .userData-right{
    color: #fff;
    float: left;
    padding-left: 4px;
    height: 32px;
    line-height: 32px;
  }
  .userData-radio {
    width: 12px;
    height: 12px;
    background-color: transparent;
    border: solid 1px rgba(255,255,255,.3);
    border-radius: 2px;
  }
  .userData-right-label{
    margin-right: 20px;
    float: left;
    cursor: pointer;
  }
  .userData-right-label:nth-last-child(1){
    margin-right: 0;
  }
  .userData-right .txt{
    display: block;
    margin: -14px 0 0 20px;
  }
  .userData-radio img{
    width:8px;
    height: 8px;
    margin: 2px 0 0 2px;
  }
  .userData-right input{
    width: 180px;
    height: 29px;
    border: solid 1px rgba(255,255,255,.3);
    background: transparent;
    color:#fff !important;
    padding-left: 10px;
    box-sizing: border-box;
    border-radius: 3px;
  }
  .overflow-hidden{
    overflow: hidden !important;
  }
  .userData-right textarea{
    color: #fff;
    padding: 10px;
    width: 320px;
    height: 130px;
    background: transparent;
    border: solid 1px rgba(255,255,255,.3);
    box-sizing: border-box;
    border-radius: 3px;
  }
  .userData-btnItem{
    height: 44px;
  }
  .userData-btnItem button{
    width: 130px;
    height: 44px;
    border:none;
    cursor: pointer;
    border-radius: 3px;
  }
  .userData-btnItem button:nth-of-type(1){
    color: #143d5f;
    margin-right: 40px;
  }
  .userData-btnItem button:nth-of-type(2){
    color: #fefefe;
    background: transparent;
    border: solid 1px #ffffff;
  }

  .userInfo-content-img{
    width: 40%;
  }
  .userAvator{
    width: 172px;
    height: 144px;
  }
  .passIcon{
    margin-left: 16px;
    position: relative;
    top: 4px;
  }

  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #fff; opacity:1;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #fff;opacity:1;
  }
  input:-ms-input-placeholder{
    color: #fff;opacity:1;
  }
  input::-webkit-input-placeholder{
    color: #fff;opacity:1;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 172px;
    height: 144px;
    display: block;
  }

</style>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .userData-right input.el-input__inner{
    background: transparent !important;
    border: solid 1px rgba(255,255,255,.3) !important;
    color: #fff !important;
    height: 29px !important;
    border-radius: 3px;
  }
</style>


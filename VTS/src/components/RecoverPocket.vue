<template>
  <div v-loading="isUploading">
    <el-upload
      ref='upload'
      class="upload-demo"
      action=""
      v-if="surpotBlob"
      :on-change="onChange"
      :on-remove="onChange"
      :auto-upload="false"
      list-type="picture">
      <el-button type="success" v-if="uploadable">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传您之前下载备份的.txt文件</div>
    </el-upload>
    <div v-else>
      <h3>您的浏览器不支持直接导入文件</h3>
      <p>出于安全和性能考虑，我们建议您更换其他现代浏览器进行VTS操作！</p>
      <p>如果您仍然希望使用此浏览器，请手动打开已备份的钱包文件，全选复制文件里面所有的密文，并粘贴于下面的输入框。</p>
      <el-input type="textarea"
                :rows="6"
                v-model="contentByCopy"
                resize="none"
      ></el-input>
    </div>
    <div  v-if="!uploadable || !surpotBlob">
      <div class="pwdLabel">请输入被恢复的钱包密码：</div>
      <el-input type="password" size="small" placeholder="被导入的钱包密码" v-model="recoverPwd"></el-input>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        uploadable: true,
        recoverPwd: '',
        isUploading: false,
        contentByCopy: ''
      }
    },
    computed: {
      surpotBlob () {
        return typeof window.Blob === 'function' && typeof window.FileReader === 'function'
      }
    },
    methods: {
      onChange () {
        this.uploadable = this.$refs.upload.uploadFiles.length === 0
        this.recoverPwd = ''
      },
      reset () {
        if (window.Blob && window.FileReader) {
          this.$refs.upload.clearFiles()
          this.uploadable = true
        } else {
          this.contentByCopy = ''
        }
        this.isUploading = false
        this.recoverPwd = ''
      }
    }
  }
</script>

<style scoped>
  .pwdLabel{
    font-weight:bold;
    margin:15px 0 10px;
  }
</style>
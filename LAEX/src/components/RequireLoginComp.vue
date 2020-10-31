<template>
  <div v-if="!authorized" class="not-logged-in">
    <div class="center-absolute font-16">
      <router-link :to="{name: 'Login'}">
        <el-button
          @click="updateLoginBack"
          type="primary"
          class="ph-70 font-16 pv-15">登录</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "RequireLoginComp",
  data () {
    return {}
  },
  computed: {
    ...mapGetters('user', [
      'authorized'
    ])
  },
  methods: {
    updateLoginBack () {
      localStorage.setItem('loginBack', this.$route.path)
    }
  }
}
</script>

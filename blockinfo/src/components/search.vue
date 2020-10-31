<template>
  <div class="search">
    <div class="center">
      <el-button type="text">
        <a href="/">
          <h1 plain class="logo">MIXED BLOCK</h1>
        </a>
      </el-button>
      <el-menu
        class="searchBox fr"
        mode="horizontal"
        active-text-color="transparent"
        background-color="#004A7C">
        <!-- 选择币种 -->
        <el-menu-item index="3" class="selectCoin">
          <el-select :value="$store.state.type" @change="getCoinType">
            <el-option
              v-for="item in cities"
              :key="item.label"
              :label="item.label"
              :value="item.label"
              :disabled="item.disabled">
              <span>{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-menu-item>
        <!--搜索框-->
        <el-menu-item index="4" class="searchLi">
          <el-input
            id="inpSearch"
            :placeholder="$t('查询 高度 / 哈希值 / 钱包地址 / 交易记录')"
            v-model.trim="inputData"
            @keyup.enter.native="searchGo">
            <i slot="prefix" class="el-icon-search" @click="searchGo"></i>
          </el-input>
        </el-menu-item>
        <!--语言选择-->
        <el-menu-item index="5" class="lang">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <img :src="item.src" v-for="(item, idx) in lang" :key="idx" alt="" v-if="item.value===currentLangValue">
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item,idx) in lang" :key="item.src">
                <div @click="setLang(item.value)">
                  <img :src="item.src" alt="language">
                  <span v-text="item.text"></span>
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
        <el-menu-item index="6" class="api">
          <router-link to="/Wallet_Api">
            <el-button type="text" style="color: #d5d5d5">API</el-button>
          </router-link>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
  import {json2FormData} from '@/assets/js/tool.js'
  import Vue from 'vue'
  import {
    Button,
    Menu,
    Input,
    MenuItem,
    Row,
    Col,
    Select,
    Option,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Icon,
    Message
  } from 'element-ui'

  [Button, Menu, Input, MenuItem, Row, Col, Select, Option, Dropdown, DropdownMenu, DropdownItem, Icon].forEach(comp => Vue.use(comp))
  export default {
    data () {
      return {
        inputData: '',
        cities: [
          {
            label: 'SC'
          },
          {
            label: 'VC'
          },
          {
            label: 'VS'
          },
          {
            label: 'VTS'
          },
          {
            label: 'BTC',
            disabled: true
          },
          {
            label: 'ETC',
            disabled: true
          },
          {
            label: 'LTC',
            disabled: true
          }
        ],
        lang: [
          {
            src: require('../assets/chn.png'),
            text: '中文',
            value: 'zh-CN'
          },
          {
            src: require('../assets/usa.png'),
            text: 'English',
            value: 'en-US'
          }
        ],
        nowCities: ''
      }
    },
    computed: {
      currentLangValue () {
        return this.$i18n.locale
      }
    },
    methods: {
      getCoinType (value) {
        this.$store.commit('changeType', value)
        this.$router.push({path: '/'})
      },
      setLang (value) {
        this.$i18n.locale = value
        window.localStorage.setItem('lang', value)
      },
      async searchGo () {
        if (this.inputData) {
          const reg1 = /^(\d+)$/g
          const reg2 = /^(0{4})([0-9A-Za-z])+$/g
          const regEn = /[`~!@#$%^&*()_+<>?:"{},.;'[\]\\]/im
          const regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im
          if (regEn.test(this.inputData) || regCn.test(this.inputData)) {
            Message.warning('请输入有效字符')
            return
          }
          if (reg1.test(this.inputData)) {
            let {data: {code, data}} = await this.$http.post('/Blocks/Block_Height', json2FormData({
              type: this.type,
              height: this.inputData
            }))
            code === 'StatusOk' && data.height
              ? this.$router.push({
                name: 'BlockNumber',
                query: {BlockHeight: this.inputData}
              })
              : Message.error('无效区块高度')
          } else if (reg2.test(this.inputData)) {
            let {data: {code, data}} = await this.$http.post('/Blocks/Block_Hash', json2FormData({
              type: this.type,
              hash: this.inputData
            }))
            code === 'StatusOk' && data.height
              ? this.$router.push({
                name: 'hashDetail',
                query: {BlockHash: this.inputData}
              })
              : Message.error('无效的区块哈希值')
          } else if (this.inputData.length < 40) { // Address长度32-33
            this.$router.push({
              name: 'address',
              query: {Address: this.inputData}
            })
          } else {
            this.$router.push({
              name: 'businessDetail',
              query: {
                Tx: this.inputData
              }
            })
          }
          this.inputData = ''
        }
      }
    }
  }
</script>

<style scoped>
  .search {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    background-color: #004A7C;
    z-index: 9;
  }

  .center {
    width: 90%;
    height:90px;
    margin: auto;
    position: relative;
  }

  .searchBox {
    border-bottom: none;
  }
</style>
<style>
  .search .coinSelector{
    top:60px !important;
  }
  .el-input__inner {
    height:32px;
  }
  .search .el-menu-item {
    height: 90px !important;
    line-height: 90px !important;
  }
  .logo {
    background: transparent;
    color: #ffffff;
    line-height: 64px;
    font-size: 36px;
    left: 15px;
  }

  #inpSearch {
    border-radius: 16px;
    width: 320px;
    height: 32px;
    background: transparent;
    color: #fff;
  }

  #inpSearch:focus {
    background-color: #fff;
    color: black;
  }

  .searchBox .searchLi, .searchBox .selectCoin, .searchBox .lang, .api {
    background-color: transparent !important;
  }

  .searchBox .selectCoin .el-input__inner {
    width: 80px;
    background: transparent;
    color: #fff;
  }

  .searchBox .lang input {
    background-color: transparent;
    color: #fff !important;
    border: none;
    padding: 0;
    width: 60px;
    line-height: 60px;
  }
</style>

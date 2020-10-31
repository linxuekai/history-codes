<template>
  <div id="app">
    <search></search>
    <keep-alive :exclude=["business"]>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import search from './components/search'
import business from './components/business'

export default {
  components: {
    search,
    business
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
a{
  text-decoration: none;
}
.font-30{
  font-size: 30px !important;
}
.font-14{
  font-size: 14px;
}
.font-12{
  font-size: 12px;
}
.text-align{
  text-align: center;
}
.fl{
  float: left;
}
.fr{
  float: right;
}
.inline-block{
  display: inline-block;
}
.clear-both:after{
  content: "";
  display: block;
  height:0;
  clear: both;
  visibility: hidden;
}
.mart6{
  margin-top: -6px;
}
.blueColor{
  color: #10ADE4;
}
.grayColor{
  color: gray;
}
.defaultPage{
  position: absolute;
  top: 90px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 90%;
  height: auto;
  max-width: 1180px;
  min-width: 900px;
}
.FromNum{
  margin: 40px 0;
}
.grayh2{
  margin: 0 15px 0 0;
  font-size: 28px;
  color: #5f5f5f;
  font-weight: normal;
}
.graySpan{
  font-size: 22px;
  color: #777777;
}
th{
  padding: 8px;
  text-align: left;
  font-weight: bold;
  color: #5F5F5F;
}
.table{
  border-spacing: 0;
}
td{
  padding: 8px;
  font-weight: normal;
  color: #5F5F5F;
}
th,td{
  border-top: 1px solid #ddd;
}
.table > tbody > tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}
.tableLeft,.tableRight{
  width: 97%;
  margin-bottom: 20px;
  border-spacing: 0;
}
.tableLeft > tbody > tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}
.tableRight > tbody > tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}
#app {
  position: relative;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.tableW td:first-child {
   width: 200px !important;
 }

</style>

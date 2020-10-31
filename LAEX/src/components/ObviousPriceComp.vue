<template>
  <span>
    {{validPart}}<span class="color-weak">{{zeroPart}}</span>
  </span>
</template>

<script>
import Vue from 'vue'
export default {
  name: "obvious-price-comp",
  props: ['value', 'sliceTo'],
  data () {
    return {
      validPart: '',
      zeroPart: ''
    }
  },
  computed: {},
  watch: {
    value: {
      handler () {
        if (Number.isNaN(+this.value)) {
          this.validPart = '--'
          this.zeroPart = ''
          return
        }
        let fixed = Vue.filter('sliceTo')(+this.value, +this.sliceTo || 8).toString()
        let validPart = fixed.replace(/0+$/, '')
        // !~validPart.indexOf('.') && (validPart += '.')
        this.validPart = validPart
        let zeroLength = fixed.length - validPart.length
        this.zeroPart = '00000000'.slice(0, zeroLength)
      },
      immediate: true
    }
  },
}
</script>

<style scoped>

</style>

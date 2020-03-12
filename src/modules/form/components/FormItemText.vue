<template>
  <el-input v-model="value"></el-input>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ["initValue"],
  data(){
    return {
      value: ""
    }
  },
  watch:{
    initValue: {
      handler(): void {
        this.value = this.initValue;
      },
      immediate: true
    },
    // value(){
    //   this.$emit("on-change", this.value);
    // }
    value: {
      handler(): void {
        this.$emit("on-change", this.value);
      },
      immediate: true
    }
  }
})
</script>
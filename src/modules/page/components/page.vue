<template>
  <div class="page">
    <div class="page__nav">
      <ul><li></li></ul>
    </div>
    <div class="page__body">
      <slot></slot>
    </div>
  </div>  
</template>
<script lang="ts">
import Vue from 'vue';
import { PageOptions } from './PageOptions'
export default Vue.extend({
  name: 'Page',
  props: {
    options: {
      type: [PageOptions,Object]
    }
  }
})
</script>
<style scoped>
.page{
  padding: 10px;
}
</style>
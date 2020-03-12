<template>
  <el-dialog class="modal" :title="options.title" :width="options.width + '%'" :visible="options.show" :show-close="true" @close="onCancelClick">
    <div class="modal__body">
      <slot></slot>
    </div>
    <div class="modal_footer" slot="footer">
      <!-- 新增：支持自定义底部按钮 -->
      <slot name="button">
        <el-button @click="onConfirmClick" size="mini" type="primary">确 定</el-button>
        <el-button @click="onCancelClick" size="mini">取 消</el-button>
      </slot>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import Vue from 'vue';

import {ModalOptions} from './ModalOptions'
export default Vue.extend({
  props:{
    options: {type: [ModalOptions,Object]}
  },
  data(){
    return {
      visble: false,
      
    }
  },
  created(){
    document.addEventListener('keydown', this.keydownHandler);
  },
  destroyed(){
    document.removeEventListener('keydown', this.keydownHandler);
  },
  methods:{
    keydownHandler(event) {
      if(event.key === 'Escape'){
        this.onCancelClick();
      }
    },
    /**
     * 确认按钮
     */
    onConfirmClick(){
      this.$emit("on-confirm", {});
    },
    /**
     * 关闭按钮
     */
    onCancelClick(){
      if(this.options.show){
        this.$emit("on-close", {});
      }
    },
    
  }
})
</script>
<style scoped>
.modal{

}
.modal_body{

}
.modal_footer{
  
}
</style>
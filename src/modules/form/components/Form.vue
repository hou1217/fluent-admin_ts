<template>
<div class="form">
  <!-- 新增：表单标题新增功能插槽 -->
  <div class="form__title">{{options.title}}<slot name="title"></slot></div>
  <div class="form__header"></div>
  <div class="form__body">
    <el-form :model="form" ref="form" :rules="rules">
      <template v-for="(item, index) of options.items">
        
        <template v-if="!item.group">
          <!-- 非组表单 -->
          <!-- <el-form-item :label="item.label" :key="index" :label-width="getLabelWidth()"> -->
          <el-form-item :label="item.label" :key="item.name" :label-width="getLabelWidth()">
            <!-- 新增：表单组件初始值 -->
            <component :is="getComponent(item.type)" :initValue="getItemValue(item)" :params="item.params" @on-change="onItemChange($event, item)"></component>
          </el-form-item>    
        </template>
        <template v-else>
          <!-- 组表单 -->
          <el-form-item :label="item.label" :key="index" :label-width="getLabelWidth()" :id="item.mark">
            <!-- 子元素渲染 -->
            <!-- 新增：锚点 -->
            <div style="visibility: hidden;">{{item.mark}}</div>
            <!-- 新增：flex样式 -->
            <!-- <el-form-item style="display: flex;" :label="subItem.label" :key="subIndex" v-for="(subItem, subIndex) of item.subs"> -->
            <el-form-item :label-width="getSubLabelWidth()" style="display: flex;" :label="subItem.label" :key="subItem.name" v-for="(subItem, subIndex) of item.subs">
              <component :is="getComponent(subItem.type)" :initValue="getItemValue(subItem)" :params="subItem.params" @on-change="onItemChange($event, subItem)" ></component>
            </el-form-item>
          </el-form-item>    
        </template>
      </template>
      <!-- 新增：可隐藏表单按钮 -->
      <el-form-item v-if="showButton" :label-width="getLabelWidth()">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>  
</template>
<script lang="ts">
import Vue from 'vue'
import {FormOptions, FormItemOptions, FormItemRuleOptions} from './FormOptions'
import {FormItemText, FormItemFactory, FormType} from '../FormItemFactory'
import MapUtils from '../../common/utils/MapUtils'
export default Vue.extend({
  props:{
    options: {type: FormOptions},
    data: {type: Object}
  },
  data(){
    return {
      form:{},
      rules:{}
    }
  },
  computed: {
    showButton():boolean {
      let show = Object.keys(this.options).indexOf('showButton') < 0 || this.options.showButton;
      return show;
    }
  },
  created(){
    
  },
  methods:{
    getLabelWidth(){
      return "150px";
    },
    getSubLabelWidth(){
      return "100px"
    },
    /**
     * 根据类型获取元素组件
     */
    getComponent(_type){
      let type = _type || FormType.TEXT;
      return FormItemFactory.get(type);
    },
    /**
     * @param {FormItemOptions} item
     */
    onItemChange(value, item){
      item.onChange && item.onChange(value);
      //嵌套设置值
      MapUtils.setNestValue(this.form, item.name, value);
      console.log("[form.vue]onItemChange, form:%o, name: %o, value: %o", JSON.stringify(this.form), item.name, value);
    },
    
    /**
     * 提交操作
     */
    onSubmit(){
      // 类型断言
      (this.$refs.form as HTMLFormElement).validate((validation: boolean) => {
        // console.debug("validation: ", validation);
        if(validation){
          // console.debug("[form.vue]提交表单, %s", JSON.stringify(this.form));
          this.$emit("on-submit", this.form);
        }
      });
    },

    /**
     * 取消操作
     */
    onCancel(){
      // console.debug("[form.vue]提交表单, %o", this.form);
      this.$emit("on-cancel");
    },

    /**
     * 取值
     * @param {FormItemOptions} item
     */
    getItemValue(item){
      console.log('[Form.vue]: getItemValue');
      // console.log(this.data);
      // console.log(item);
      if (!this.data) return '';
      return MapUtils.getNestValue(this.data, item.name);
    }

    
  }
})

</script>
<style scoped>
.form{
  padding: 15px 15px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 5px;
}
.form__title{
  margin: 0px auto 20px;
}
</style>
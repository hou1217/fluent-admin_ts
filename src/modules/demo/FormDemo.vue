<template>
  <page>
      <tpulse-breadcrumbs :data="breadcrumbs"></tpulse-breadcrumbs>
      <tpulse-form :options="formOptions" :data="formData" @on-submit="onSubmit">

      </tpulse-form>
     
  </page>
</template>
<script lang="ts">
  import {PageComponent as Page,PageOptions} from '@/modules'
 
  import {FormComponent as TpulseForm, FormOptions} from '@/modules'

  import {TpulseBreadcrumbs, TpulseButtonBar} from '@/modules/common'
  
  import Vue from 'vue';
  export default Vue.extend({
    components: {
      Page,
      TpulseForm,
      TpulseBreadcrumbs,
      TpulseButtonBar
    },
    data(){
      return{
        breadcrumbs: [
            {
              name: 'form实例'
            }
        ],
        pageOptions: {},
        formOptions: new FormOptions(),
        formData: {},
        formType: null
      }
    },
    created() {
  
      this.formDefined();
      this.getDetail();

  
    },
    methods: {
      /**
      * 表格定义
      */
      formDefined() {
        let items = [
          {
            label: '名称',
            name: 'name'
          },
          {
            label: '年龄',
            name: 'age'
          },
          {
            label: '配置',
            type: 'radio',
            name: 'show',
            onChange: (value) => {
              this.formType = value;
              this.refreshItems(items);
            }
          },
          {
            label: '配置详情',
            type: 'option',
            name: 'option'
          }
        ];
        
        this.formOptions.items = items.filter(_item => {
          return _item.name !== 'option';
        });
      },
  
      /**
       * 获取页面数据
       */
      getDetail() {
        this.formData = {
            name: 'hys',
            age: 28,
            show: true,
            option: {
              text: '111'
            }
        };
      },
      /**
       * 表单提交
       */
      onSubmit(form) {
        console.log('[DemoEdit.vue]: onSubmit');
        alert(JSON.stringify(form));
      },

      refreshItems(items) {
        console.log('[DemoEdit.vue]: refreshItems');
        this.formOptions.items = items.filter(_item => {
          if (_item.name === 'option') {
            return !!this.formType;
          }
          return true;
        });
      }
    }
  })
  </script>
<style>

</style>
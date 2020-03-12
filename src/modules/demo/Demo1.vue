<template>
  <page>
    <tpulse-table ref="typeTable" :options="tableOptions">
      
    </tpulse-table>
  </page>
</template>
<script lang="ts">


import {PageComponent as Page,PageOptions} from '@/modules'
import {TableComponent as TpulseTable, TableOptions} from '@/modules'
import {FormComponent as TpulseForm, FormOptions} from '@/modules'
import {ModalComponent as Modal, ModalOptions} from '@/modules'


import Vue from 'vue';
export default Vue.extend({
  components: {
    Page,
    TpulseTable,
    TpulseForm,
    Modal
  },
  data(){
    return{
      pageOptions: {},
      tableOptions: new TableOptions(),
      formOptions: new FormOptions(),
      modalOptions: new ModalOptions({title: '活动类型信息', width: 60}),
      formData: {},
    }
  },
  created() {

    this.tableDefined();
    // this.formDefined();

  },
  methods: {
    /**
    * 表格定义
    */
    tableDefined(): void {
      // 列定义
      this.tableOptions.columns = [
          {
            type: TableOptions.COLUMN_TYPE_SELECTION
          },
          {
            label: '类型名称',
            // type: 'href',
            name: 'name'
          },
          {
            label: '模板数量',
            name: 'templateCount',
            sortable: true
          },
          {
            label: '操作',
            type: TableOptions.COLUMN_TYPE_BTNS,
            btns: [
                
            ]
          }
      ];

      // 搜索字段
      this.tableOptions.searches = [
          {
              type: 'text',
              label: '类型名称',
              name: 'name'
          },
          {
              type: 'select',
              label: '状态',
              name: 'state',
              options: [
                  {
                      label: '已上架',
                      value: 'ACTIVE'
                  },
                  {
                      label: '未上架',
                      value: 'INACTIVE'
                  }
              ]
          }
      ];

      // 搜索函数
      this.tableOptions.searchHander = (searchForm) => {
        console.log('searchHander');
        return this.getTableData(searchForm);
      }
    },

    /**
     * 获取表格数据
     */
    getTableData(searchForm) {
      console.log('[activityType]: getTableData');
      let data = {"data":[{"typeId":"5e621db4fcb56473064a7c9a","name":"首充23","templateCount":0,"state":"ACTIVE"},{"typeId":"5e61c876fcb5647235073026","name":"1","templateCount":0,"state":"ACTIVE"},{"typeId":"5e61c86dfcb5647235073025","name":"11","templateCount":0,"state":"ACTIVE"},{"typeId":"5e60ce4ffcb5646d1132c980","name":"首充1","templateCount":0,"state":"INACTIVE"},{"typeId":"5e58be80fcb5642d0e0784bb","name":"首充","templateCount":125,"state":"ACTIVE"},{"typeId":"5e60c724fcb5646cd054c722","name":"首充2222","templateCount":0,"state":"ACTIVE"},{"typeId":"5e5f84c5fcb56458438f4821","name":"xxx","templateCount":0,"state":"ACTIVE"},{"typeId":"5e58c6c7fcb5642d7ce55f43","name":"首充测试tes","templateCount":0,"state":"ACTIVE"},{"typeId":"5e58c65efcb5642d7ce55f42","name":"首充测试test","templateCount":0,"state":"ACTIVE"},{"typeId":"5e58c447fcb5642d0e0784c3","name":"首充feac6914-7b16-4f37-a3bd-292c7905be76","templateCount":0,"state":"ACTIVE"}],"total":12}
      return Promise.resolve(data)
    },
  }
})
</script>
<style scoped>

</style>
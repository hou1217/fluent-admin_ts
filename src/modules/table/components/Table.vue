<template>
  <div class="table">
    <div class="table__title" v-if="options.title">{{options.title}}</div>
    <div class="table__header" v-if="options.searches">
      <!-- 搜索 -->
      <el-form :inline="true" v-model="searchForm" class="table__search" >
        <template v-for="(search, index) of options.searches" >
          <el-form-item :key="index">
            <!-- 文本 -->  
            <el-input v-if="(!search.type || search.type === 'text')" v-model="customSearchForm['$' + index]" :placeholder="search.label"></el-input>
            <!-- 新增：下拉选择 -->
            <el-select v-if="search.type === 'select'" v-model="customSearchForm['$' + index]" :placeholder="search.label" clearable>
              <el-option v-for="item in search.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <!-- TODO 其他表单类型-->  
          </el-form-item>
        </template>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 新增：搜索栏与表格本体之间的默认插槽 -->
      <slot></slot>
    </div>
    <div class="table__body">

      <el-table :style="elTableStyle" :border="true" :data="tableData" @selection-change="onSelectionChange" v-if="state === 'show'" @sort-change="onSortChange" :default-sort="getDefaultSort()">
        <!-- 列定义 -->
        <template v-for="(column, index) of options.columns" >

          <el-table-column 
            v-if="column.type !== 'selection'"
            :key="index"
            :label="column.label" 
            :prop="column.name"
            :min-width="calColumnWidth(column)"
            :sortable="column.sortable ? 'custom' : false"
          >
            <template slot-scope="scope" >
              <!-- 文本类型 -->
              <span v-if=" !column.type || column.type === 'text'">{{getCellValue(scope.row, column)}}</span>
              <!-- icon -->
              <i class="table__cell_icon" v-if="column.type === 'icon'" :style="iconStyle(getCellValue(scope.row, column))" />
              <!-- btns-->
              <template v-if="column.type === 'btns'">
                <!-- 新增：通过filter控制按钮的显示隐藏 -->
                <!-- 新增：按钮禁用 -->
                <div class="table__btn-column" v-for="(btn, index) of column.btns" :key="index">
                  <el-button 
                      class="table__btn-column_btn" 
                      v-if="!btn.filter||btn.filter(scope.row, scope.index)" 
                      :disabled="btn.disabled!=null&&btn.disabled(scope.row, scope.index)"
                      @click="onBtnClick(btn, scope.row)" 
                      type="text" 
                      size="small">
                  {{btn.label}}
                </el-button>
                </div>
              </template>
              <!-- 新增：可点击的文本类型 -->
              <span class="table__cell_href" v-if="column.type === 'href'" @click.stop="onHrefClick(scope.row)">{{getCellValue(scope.row, column)}}</span>

            </template>
          </el-table-column>

          <!-- 默认类型 -->
          <el-table-column 
            v-else
            :key="index"
            type="selection"
          >
          </el-table-column>
        </template>
        
      </el-table>
    </div>
    <div class="table__footer">
      <!-- 底部 -->
      <div class="table__shortcut">
        <slot name="shortcut"></slot>
      </div>
      <div class="table__pagination">
        <el-pagination background layout="total, sizes, prev, pager, next" :total="total" :current-page="parseInt(searchForm.page)" :page-sizes="[10, 20, 50, 100]" @size-change="onPageSizeChange" @current-change="onPageChange"></el-pagination>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

import {TableOptions, ColumnOptions} from '../components/TableOptions'
import MapUtils from '../../common/utils/MapUtils'
const STATE_HIDDEN = "hidden";
const STATE_SHOW = "show";
export default Vue.extend({
  props:{
    /**
     * 表格参数
     */
    options: {type: TableOptions},
  },
  data(){
    return {
      state: STATE_HIDDEN,
      selectionColumn: null as any,
      tableWidth: 0,
      tableSize: 0, //用户定义的表格总尺寸
      sizeWidth: 0, //1单位size的宽度
      total: 0,
      tableData: [],
      /**
       * TODO 无法动态注入变量，需要查看Vue,暂时用变量映射的方式
       */
      customSearchForm: {
        $0: "",
        $1: "",
        $2: "",
        $3: "",
        $4: "",
        $5: "",
      },
      searchForm: {
        page: 1,
        pageSize: 10, 
        sortField: '',
        reverse: false
      },
      /**
       * 已选择的行
       */
      selection: []
    }
  },
  created(){

    if(!this.options) throw "TableOptions对象为空，无法初始化";
    

    for(let column of this.options.columns){
      
      //获取选择列
      if(column.type === TableOptions.COLUMN_TYPE_SELECTION){
        this.selectionColumn = column;
      }
      //累计用户定义的表格总尺寸
      this.tableSize += column.size || 1;
    }
    

    //搜索字段处理
    // if(this.options.searches){
    //   for(let search of this.options.searches){
    //     this.searchForm[search.name] = "";
    //   }
    //   console.debug("[table.vue] this.searchForm: %o", this.searchForm);
    // }

    //搜索表单初始化
    this.options.searchForm && Object.assign(this.searchForm, this.options.searchForm);

    //数据处理
    this.refreshTableData();


  },
  mounted(){
    this.$nextTick(() => {

      //获取table的宽度
      this.tableWidth = this.$el.getBoundingClientRect().width - 30;
      this.sizeWidth = this.tableWidth / this.tableSize;
      console.debug("tableWidth: %s, sizeWidth: %s", this.tableWidth, this.sizeWidth);
      
      //状态打开      
      this.state = STATE_SHOW;

    });
  },
  computed:{
    elTableStyle(){
      return {
        width: "100%"
      }
    }
  },
  methods:{
    calColumnWidth(column:any){

      let size = column.size || 1;
      return this.sizeWidth * size;
    },
    onSelectionChange(rows:any){
      this.selection = rows;
      //this.selectionColumn && this.selectionColumn.handler && this.selectionColumn.handler(rows);
      this.$emit("on-select", this.selection);
    },
    onBtnClick(btn:any, row:any){
      if(btn.tips){
        this.$confirm(btn.tips, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          btn.handler(row);  
        }).catch(() => {})
      }else{
        btn.handler(row);
      }
    },
    onHrefClick(row) {
      this.$emit('on-href-click', row);
    },
    refreshTableData(): void{
      // console.log("refreshTableData, searchForm: {}", this.searchForm);
      if(this.options.searchHander){
        this.options.searchHander(this.searchForm).then((res) => {
          console.debug("[table.vue]", "res: %o", res);
          let page = res;
          this.total = page.total;
          this.tableData = page.data;
        });
      }
      
      
      
      this.selection = [];
    },
    onSearch(){
      //搜索字段映射处理
      let customForm = {};
      this.options.searches.forEach((search:any, index:number) => {
        customForm[search.name] = this.customSearchForm['$' + index] || null;
      });
      this.searchForm.page = 1;
      Object.assign(this.searchForm, customForm);

      this.refreshTableData();
    },
    /**
     * 页请求数量改变
     */
    onPageSizeChange(pageSize){
      
      this.searchForm.pageSize = pageSize;
      this.refreshTableData();
    },
    /**
     * 页码改变
     */
    onPageChange(page){
      
      this.searchForm.page = page;
      this.refreshTableData();
    },
    /**
     * 获取已经选择的行
     */
    $getSelection(){
      return this.selection;
    },
    /**
     * 获取cell的值
     * @param {{}} 当前行对象
     * @param {ColumnOptions} column 当前列定义
     */
    getCellValue(row, column){
      let cellValue = MapUtils.getNestValue(row, column.name);
      column.format && (cellValue = column.format(cellValue, row));
      // console.log("[table.vue] 获取数据: column.name: %s, value: %s", column.name, cellValue);
      return cellValue;
    },
    iconStyle(url){
      return {
        backgroundImage: `url('${url}')`
      }
    },
    /**
     * 排序改变
     */
    onSortChange(sort){
      // console.log("[table.vue]sort: %o", sort);
      this.searchForm.sortField = sort.order ? sort.prop : "";
      this.searchForm.reverse = (sort.order === 'descending');
      this.refreshTableData();
      // console.log("[table.vue]searchForm: %o", this.searchForm);
    },
    /**
     * 获取默认排序
     */
    getDefaultSort(){
      if(this.searchForm.sortField){
        return {
          prop: this.searchForm.sortField,
          order: this.searchForm.reverse ? 'descending' : 'ascending'
        }
      }else{
        return {}
      }
    },
    /**
     * 数据刷新
     */
    $refreshData(){
      this.refreshTableData();
    }
  }
})
</script>
<style scoped>
.table{
  padding: 15px 15px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 5px;
}
.table__footer{
  display: flex;
  padding: 20px 0;
}
.table__shortcut{
  flex: 1;
}
.table__title{
  margin: 0px auto 20px;
}
.table__cell_icon{
  display: inline-block;
  width: 3em;
  height: 3em;
  line-height: 1em;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}
i::after{
  content: '\3000'
}
/* 新增：表格按钮列样式 */
.table__btn-column {
  display: inline-block;
}
.table__btn-column_btn {
  margin: 0 10px;
}
.table__btn-column_btn:first-child {
  margin-right: 0;
}
.table__cell_href {
  text-decoration: underline;
  color: #5cb6ff;
  cursor: pointer;
}
</style>
// 枚举
export enum ColumTypes{
  TEXT,
  SELECTION,
  BTNS,
  ICON
}
// 接口
export interface searchHanderInterface{
  (x:any): any
}
export interface objInterface{
  title?: string
  columns?: Array<ColumnOptions>
  searches?: Array<SearchOptions>
  searchHander?: searchHanderInterface 
  searchForm?: {
    page: number
    pageSize:  number
    sortField: string
    reverse: boolean
  }
}

export interface ColumnFormat{
  (cell: any): string 
}
/**
 * 表格参数
 */
export class TableOptions{
  
  /**
   * 字段类型,多选按钮
   */
  static COLUMN_TYPE_SELECTION: ColumTypes = ColumTypes.SELECTION;
  /**
   * 字段类型, 按钮数组
   * data字段为[{label, handler, action}]
   */
  static COLUMN_TYPE_BTNS: ColumTypes = ColumTypes.BTNS;

  /**
   * 图标
   */
  static COLUMN_TYPE_ICON: ColumTypes = ColumTypes.ICON;
  
  /**
   * 标题
   * @type {string}
   */
  title?: string;

  /**
   * 列定义
   * @type {Array<ColumnOptions>}
   */
  columns: Array<ColumnOptions> = [];

  /**
   * 搜索字段定义
   * @type {Array<SearchOptions>}
   */
  searches: Array<SearchOptions> = [];

  /**
   * 查询处理器
   * @type {Function({page:number, pageSize:number, ...searchses})} 
   */
  searchHander?: searchHanderInterface;

  /**
   * 基础查询表单
   * @type {{page:number, pageSize: number, sortField: string, reverse: boolean}}
   */
  searchForm?: object;

  /**
   * 构造函数，通过对象构造类型
   * @param {{title:string, columns:Array<ColumnOptions>, searches: Array<SearchOptions>, searchHander: Function, searchForm: {page:number, pageSize: number, sortField: string, reverse: boolean}} obj 
   */
  constructor(obj: objInterface = {}){
    Object.assign(this, obj);
  }

}

/**
 * 列选项
 */
export class ColumnOptions{

  /**
   * 类型，可选 selection|btns
   */
  type?: ColumTypes;
  /**
   * 显示名
   */
  label?: string = "";
  /**
   * 绑定字段
   */
  name?: string = "";

  /**
   * 尺寸单位，类似于flex用法，默认为1
   */
  size?: number = 1;

  /**
   * 格式化函数接受参数, cell, row
   * @type {Function}
   */
  format?: ColumnFormat;

  // /**
  //  * 处理函数
  //  * @type {Function}
  //  */
  // handler;
  /**
   * 数组集合,type=btns专用,
   * 1. handler(row): 接受当前选中的行
   * 2. tips: 如果存在在handler触发先，先行弹出提示框
   * @type {Array<{label:string, handler:function, tips: string}>}
   */
  btns?: any[];

  /**
   * 是否排序
   * @type {boolean}
   */
  sortable?: boolean = false;

  /**
   * 构造函数，对象转类型
   * @param {*} obj 
   */
  constructor(obj = {}){
    Object.assign(this, obj);
  }
}



/**
 * 搜索选项
 */
export class SearchOptions{

  /**
   * 表单元素元素类型
   */
  type?: string;
  /**
   * placeholder
   */
  label?: string;
  /**
   * 属性名
   */
  name?: string;

  options?
}
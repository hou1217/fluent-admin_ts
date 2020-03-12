import {FormType} from '../FormItemFactory'

/**
 * 表单选项
 */
export class FormOptions{

  /**
   * 标题
   */
  title?: string;
  /**
   * @type {Array<FormItemOptions>}
   */
  items: Array<FormItemOptions> = [];

  showButton: boolean = false;

  /**
   * 
   * @param {{title: string, items: Array<FormItemOptions>}} obj 
   */
  constructor(obj = {}){
    Object.assign(this, obj);
  }
}
// interface 
export interface changeFunc{
  (newValue: string): void
}

export class FormItemOptions{

  /**
   * 元素类型,默认支持类型详见FormItemFactory.FormType
   */
  type = FormType.TEXT;
  /**
   * 组
   */
  group = "";
  /**
   * 标签
   */
  label = "";
  /**
   * 绑定的变量名
   */
  name = "";
  /**
   * 当有组的时候，存在
   * @type {Array<FormItemOptions>}
   */
  subs: Array<FormItemOptions> = []

  /**
   * 针对不同类型自定义的一些数据
   */
  data: object = {};

  /**
   * 规则集合
   * @type {Array<FormItemRuleOptions>}
   */
  rules: Array<FormItemRuleOptions> = [];

  /**
   * @type {Function(newValue)}
   */
  onChange?: changeFunc;
  
}

export class FormItemRuleOptions{
  name:any;
}
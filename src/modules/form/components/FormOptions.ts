import {FormType} from '../FormItemFactory'
// interface 
export interface changeFunc{
  (newValue: string): void
}
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

  showButton: boolean = true;

  /**
   * 
   * @param {{title: string, items: Array<FormItemOptions>}} obj 
   */
  constructor(obj = {}){
    Object.assign(this, obj);
  }
}


export class FormItemOptions{

  /**
   * 元素类型,默认支持类型详见FormItemFactory.FormType
   */
  type? = FormType.TEXT;
  /**
   * 组
   */
  group?: string = "";
  /**
   * 标签
   */
  label: string = "";
  /**
   * 绑定的变量名
   */
  name: string = "";
  /**
   * 当有组的时候，存在
   * @type {Array<FormItemOptions>}
   */
  subs?: Array<FormItemOptions> = []

  /**
   * 针对不同类型自定义的一些数据
   */
  data?: object = {};

  /**
   * 规则集合
   * @type {Array<FormItemRuleOptions>}
   */
  rules?: Array<FormItemRuleOptions> = [];

  /**
   * @type {Function(newValue)}
   */
  onChange?: changeFunc;
  
}

export class FormItemRuleOptions{
  name:any;
}
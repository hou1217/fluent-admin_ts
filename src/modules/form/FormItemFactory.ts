import FormItemText from './components/FormItemText.vue'
export {FormItemText}
/**
 * 默认支持的表单元素类型
 */
export const FormType = {
  TEXT: "text"
}

/**
 * 表单元素工厂
 * 1. 注册自定义类型元素组件
 * 2. 获取支持的
 */
export class FormItemFactory{

  static items: object = {};
  
  /**
   * 注册组件
   * @param {string} type 类型
   * @param {{Vue}} component Vue组件需要有props:{params},并且有on-change事件用于抛出更改的值
   */
  static register(type: string, component: any){
    FormItemFactory.items[type] = component;
  }
  
  /**
   * 根据类型获取组件
   * @param {string} type 
   */
  static get(type: string){

    let component = FormItemFactory.items[type];
    if(!component){
      throw "组件不存在, type: " + type
    }
    return component;
  }
}


//默认元素注册
FormItemFactory.register(FormType.TEXT, FormItemText);

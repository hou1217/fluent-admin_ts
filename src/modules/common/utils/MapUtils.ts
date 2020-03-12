/**
 * 对象操作
 */
export default class MapUtils{

  /**
   * 嵌套设置值
   * @param {{}} map
   * @param {string} name 可以是多级嵌套key
   * @param {*} 需要设置的值
   */
  static setNestValue(map: any, name: string, value: any){

    let container = map;
    let itemNames = name.split(".");
    let len = itemNames.length;
    itemNames.forEach((name: string, index: number) => {
      if(index < (len - 1)){
        container[name] =  container[name] || {}
        container = container[name]; 
      }else{
        container[name] = value;
      }
    });
  }

  /**
   * 获取嵌套值
   * @param {*} map 
   * @param {string} name 
   */
  static getNestValue(map: any, name: string){

    let container = map;
    let itemNames = name.split(".");
    let len = itemNames.length;
    itemNames.forEach((name: string, index: number) => {
      if(index < (len - 1)){
        container = container[name] || {}; 
      }
    });

    return container[itemNames[itemNames.length - 1]]

  }

}

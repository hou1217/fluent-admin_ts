export interface optionInterface{
  title?: string;
  width?: number; 
  show?: boolean;
}
export class ModalOptions{
  
  /**
   * 标题
   */
  title: string = "";
  /**
   * 百分比值，默认为50
   */
  width: number = 90;
  
  /**
   * 是否显示
   */
  show: boolean = false;

  /**
   * @param {{title:string, width: number, show: boolean}} options 支持从对象到类对象转换
   */
  constructor(options: optionInterface = {}){
    Object.assign(this, options);
  }
}
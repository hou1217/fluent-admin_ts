
import HomeDemo from './HomeDemo.vue'
import TableDemo from './TableDemo.vue'
import FormDemo from './FormDemo.vue'
import ModalDemo from './ModalDemo.vue'

import {FormItemFactory} from '../index'
import FormRadio from './components/FormItemRadio.vue'
import FormItemOption from './components/FormItemOption.vue'

export const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeDemo
  },
  {
    path: '/table',
    name: 'table',
    component: TableDemo
  },
  {
    path: '/form',
    name: 'form',
    component: FormDemo
  },
  {
    path: '/modal',
    name: 'modal',
    component: ModalDemo
  }
];

export const FormItemTypeRadio = 'radio'
export const FormItemTypeOption = 'option'

FormItemFactory.register(FormItemTypeRadio, FormRadio);
FormItemFactory.register(FormItemTypeOption, FormItemOption);



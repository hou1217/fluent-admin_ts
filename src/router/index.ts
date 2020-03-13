import Vue from 'vue'
import VueRouter from 'vue-router'
import {routes as demoRoutes} from '../modules/demo'

Vue.use(VueRouter)

let routes = [
  ...demoRoutes
  
]

const router = new VueRouter({
  routes
})

export default router
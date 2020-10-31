import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Detail from '../views/Detail.vue'
import Car from '../views/Car.vue'
import Login from '../views/Login.vue'
import Sign from '../views/Sign.vue'
import My from '../views/My.vue'
import preference from '../views/preference.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/index:tab?',
    name: 'index',
    component: Index,

  },
  {
    path: '/Detail/:id',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/Car/:id',
    name: 'Car',
    component: Car
  },
  {
    path: '/Login:tab?',
    name: 'Login',
    component: Login
  },
  {
    path: '/Sign',
    name: 'Sign',
    component: Sign
  },
  {
    path: '/My/:id',
    name: 'My',
    component: My
  },
  {
    path: '/preference',
    name: 'preference',
    component: preference
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

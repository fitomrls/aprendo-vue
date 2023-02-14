import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Suma from '../views/Suma.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/suma',
    name: 'suma',
    component: Suma 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

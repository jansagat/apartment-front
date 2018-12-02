import Vue from 'vue'
import Router from 'vue-router'
import HomeScreen from '../views/HomeScreen.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'HomeScreen',
    component: HomeScreen
  }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

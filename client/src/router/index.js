import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login'),
    },
  ],
  mode: 'history',
})

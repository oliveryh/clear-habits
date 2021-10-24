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
      path: '/planner',
      name: 'planner',
      component: () => import('@/views/Planner'),
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import('@/views/Stats'),
    },
    {
      path: '/targets',
      name: 'targets',
      component: () => import('@/views/Targets'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/Settings'),
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

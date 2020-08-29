import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { A_AUTH_CHECK } from './store/actions.type'
import ApiService from './common/api.service'
import JwtService from '@/common/jwt.service'
import ErrorFilter from './common/error.filter'
import './quasar'

// Quasar.lang.set(Quasar.lang.enGb)
// Quasar.iconSet.set(Quasar.iconSet.materialIconsOutlined)

Vue.config.productionTip = false
Vue.filter('error', ErrorFilter)

ApiService.init()

// Guard protected routes and forward to login page
router.beforeEach((to, from, next) => {
  if (!['login', 'register'].includes(to.name) && !JwtService.getToken())
    next({ name: 'login' })
  else next()
})

// Ensure we checked auth before each page load.
router.beforeEach((to, from, next) =>
  Promise.all([store.dispatch(A_AUTH_CHECK)]).then(next),
)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

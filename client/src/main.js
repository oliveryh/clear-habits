import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ApiService from './common/api.service'
import JwtService from '@/common/jwt.service'
import ErrorFilter from './common/error.filter'
import './quasar'
import { createProvider } from './vue-apollo'

Vue.config.productionTip = false
Vue.filter('error', ErrorFilter)

ApiService.init()

// Guard protected routes and forward to login page
router.beforeEach((to, from, next) => {
  if (!['login', 'register'].includes(to.name) && !JwtService.getToken())
    next({ name: 'login' })
  else next()
})

Vue.mixin({
  methods: {
    dateSpread(startDate) {
      return Array.from(Array(7).keys()).map(num =>
        new Date(new Date(startDate).getTime() + num * 86400000)
          .toISOString()
          .substring(0, 10),
      )
    },
    secondsToTimestamp(val) {
      var tt = val
      var hours = this.$options.filters.zeroPad(parseInt(tt / 3600))
      var minutes = this.$options.filters.zeroPad(parseInt((tt % 3600) / 60))
      var seconds = this.$options.filters.zeroPad(parseInt(tt % 60))
      return `${hours}:${minutes}:${seconds}`
    },
    timestampToSeconds(val) {
      var parts = val.split(':')
      var hours = parseInt(parts[0])
      var minutes = parseInt(parts[1])
      var seconds = parseInt(parts[2])
      return hours * 3600 + minutes * 60 + seconds
    },
    minutesToTimestamp(val) {
      var tt = val
      var hours = this.$options.filters.zeroPad(parseInt(tt / 3600))
      var minutes = this.$options.filters.zeroPad(parseInt((tt % 3600) / 60))
      return `${hours}:${minutes}`
    },
    timestampToMinutes(val) {
      var parts = val.split(':')
      var hours = parseInt(parts[0])
      var minutes = parseInt(parts[1])
      return hours * 3600 + minutes * 60
    },
    showErrors(error) {
      const messages = error.graphQLErrors[0].message
      messages.split('\n').map(message =>
        this.$q.notify({
          group: false,
          message,
          type: 'negative',
        }),
      )
    },
  },
  filters: {
    zeroPad: function(value, num) {
      num = typeof num !== 'undefined' ? num : 2
      return value.toString().padStart(num, '0')
    },
  },
})

new Vue({
  router,
  apolloProvider: createProvider(),
  render: h => h(App),
}).$mount('#app')

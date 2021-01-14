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

export const mixins = {
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
      var hours = parseInt(tt / 3600)
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
    hexToRgb(hex) {
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
      hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b
      })

      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : 'none'
    },
    highContrastText(rgb) {
      const brightness = Math.round(
        (parseInt(rgb.r) * 299 +
          parseInt(rgb.g) * 587 +
          parseInt(rgb.b) * 114) /
          1000,
      )
      const textColour = brightness > 125 ? 'black' : 'white'
      return textColour
    },
  },
  filters: {
    zeroPad: function(value, num) {
      num = typeof num !== 'undefined' ? num : 2
      return value.toString().padStart(num, '0')
    },
    allCapitals: function(value) {
      if (!value) return ''
      return value.toString().toUpperCase()
    },
    getDate: date => {
      return date.substring(8, 10)
    },
  },
}

Vue.mixin(mixins)

new Vue({
  router,
  apolloProvider: createProvider(),
  render: h => h(App),
}).$mount('#app')

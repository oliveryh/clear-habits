import Vue from 'vue'
import App from './App.vue'
import router from './router'

import JwtService from '@/common/jwt.service'
import ErrorFilter from './common/error.filter'
import './quasar'
import { createProvider } from './vue-apollo'

Vue.config.productionTip = false
Vue.filter('error', ErrorFilter)

// Guard protected routes and forward to login page
router.beforeEach((to, from, next) => {
  if (!['login', 'register'].includes(to.name) && !JwtService.getToken())
    next({ name: 'login' })
  else next()
})

import {
  F_CATEGORY,
  F_CATEGORY_PROJECTS,
  F_PROJECT,
  F_PROJECT_TASKS,
  F_TASK,
  F_TASK_ENTRIES,
  F_ENTRY,
} from '@/graphql/fragments'
import {
  M_ENTRY_CREATE,
  M_ENTRY_UPDATE,
  M_ENTRY_COMPLETE,
  M_ENTRY_STOP,
  M_ENTRY_START,
  M_ENTRY_RESTART,
  M_ENTRY_DELETE,
  M_TASK_CREATE,
  M_TASK_UPDATE,
  M_PROJECT_CREATE,
  M_PROJECT_UPDATE,
  M_PROJECT_DELETE,
  M_CATEGORY_CREATE,
  M_CATEGORY_UPDATE,
  M_CATEGORY_DELETE,
  M_SETTINGS_UPDATE,
} from '@/graphql/mutations'
import { Q_CATEGORY, Q_ENTRY, Q_TASK, Q_PROJECT } from '@/graphql/queries'

const objectParts = {
  Entry: {
    parent: 'Task',
    children: 'entries',
    fragment: F_ENTRY,
    query: Q_ENTRY,
  },
  Task: {
    parent: 'Project',
    children: 'tasks',
    fragment: F_TASK,
    query: Q_TASK,
  },
  Project: {
    parent: 'Category',
    children: 'projects',
    fragment: F_PROJECT,
    query: Q_PROJECT,
  },
  Category: { children: 'categories', fragment: F_CATEGORY, query: Q_CATEGORY },
}

export const mixins = {
  methods: {
    dateSpread(startDate) {
      return Array.from(Array(7).keys()).map(num =>
        new Date(new Date(startDate).getTime() + num * 86400000)
          .toISOString()
          .substring(0, 10),
      )
    },
    hoursToReadable(value) {
      var hours = parseInt(value)
      var mins = parseInt((value * 60) % 60)
      var retString = `${mins}m`
      if (hours) {
        retString = `${hours}h` + ' ' + retString
      }
      return retString
    },
    secondsToTimestamp(val, { zeroPad = false, includeSeconds = false } = {}) {
      var tt = val
      var hours = zeroPad
        ? this.$options.filters.zeroPad(parseInt(tt / 3600))
        : parseInt(tt / 3600)
      var minutes = this.$options.filters.zeroPad(parseInt((tt % 3600) / 60))
      if (includeSeconds) {
        var seconds = this.$options.filters.zeroPad(parseInt(tt % 60))
        return `${hours}:${minutes}:${seconds}`
      } else {
        return `${hours}:${minutes}`
      }
    },
    timestampToSeconds(timestamp) {
      var parts = timestamp.split(':')
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
    highContrastText(colorRGB) {
      const brightness = Math.round(
        (parseInt(colorRGB.r) * 299 +
          parseInt(colorRGB.g) * 587 +
          parseInt(colorRGB.b) * 114) /
          1000,
      )
      const textColour = brightness > 125 ? 'black' : 'white'
      return textColour
    },
    highContrastColor(colorHEX) {
      const colorRGB = this.hexToRgb(colorHEX)
      return this.highContrastText(colorRGB)
    },
    createFragment(variables, mutation, fragment, objectType) {
      // TODO: Add to flattened structure too
      const parent = objectParts[objectType]?.parent
      const children = objectParts[objectType]?.children
      this.$apollo
        .mutate({
          mutation,
          variables,
          update: (store, { data }) => {
            const fragmentUpdate = data[objectType]
            const fragmentId =
              parent + ':' + fragmentUpdate[parent.toLowerCase()].id
            const fragmentNew = store.readFragment({
              id: fragmentId,
              fragment,
            })
            fragmentNew[children].push(fragmentUpdate)
            store.writeFragment({
              id: fragmentId,
              fragment,
              data: fragmentNew,
            })
          },
        })
        .catch(error => {
          this.showErrors(error)
        })
    },
    updateFragment(variables, mutation, objectType) {
      const fragment = objectParts[objectType].fragment
      this.$apollo
        .mutate({
          mutation,
          variables,
          update: (store, { data }) => {
            const fragmentUpdate = data[objectType]
            const fragmentId = objectType + ':' + fragmentUpdate.id
            const fragmentNew = store.readFragment({
              id: fragmentId,
              fragment,
            })
            Object.assign(fragmentNew, fragmentUpdate)
            store.writeFragment({
              id: fragmentId,
              fragment,
              data: fragmentNew,
            })
          },
        })
        .catch(error => {
          this.showErrors(error)
        })
    },
    // Category
    categoryCreate(category) {
      this.$apollo
        .mutate({
          mutation: M_CATEGORY_CREATE,
          variables: category,
          update: (store, { data: { Category } }) => {
            const data = store.readQuery({
              query: Q_CATEGORY,
            })
            data.categories.push(Category)
            store.writeQuery({
              query: Q_CATEGORY,
              data,
            })
          },
        })
        .catch(error => {
          this.showErrors(error)
        })
    },
    categoryUpdate(category) {
      this.updateFragment(category, M_CATEGORY_UPDATE, 'Category')
    },
    categoryDelete(category) {
      this.deleteFragment(category, M_CATEGORY_DELETE, null, 'Category')
    },
    deleteFragment(variables, mutation, fragment, objectType) {
      const parent = objectParts[objectType]?.parent
      const children = objectParts[objectType]?.children
      const query = objectParts[objectType]?.query
      this.$apollo.mutate({
        mutation,
        variables,
        update: (store, { data }) => {
          const isDeleted = data[objectType]
          console.log(isDeleted)
          if (isDeleted) {
            // Remove from hierarchical structure
            if (objectParts[objectType]?.parent) {
              const fragmentId =
                parent + ':' + variables[parent.toLowerCase()].id
              const fragmentNew = store.readFragment({
                id: fragmentId,
                fragment,
              })
              fragmentNew[children] = fragmentNew[children].filter(c => {
                return c.id !== variables.id
              })
              store.writeFragment({
                id: fragmentId,
                fragment,
                data: fragmentNew,
              })
            }
            // Remove from flattened structure
            const data = store.readQuery({
              query,
            })
            console.log('data', data)
            data[children] = data[children].filter(p => {
              return p.id !== variables.id
            })
            store.writeQuery({
              query,
              data,
            })
          }
        },
      })
    },
    // Project
    projectCreate(project) {
      this.createFragment(
        project,
        M_PROJECT_CREATE,
        F_CATEGORY_PROJECTS,
        'Project',
      )
    },
    projectUpdate(project) {
      this.updateFragment(project, M_PROJECT_UPDATE, 'Project')
    },
    projectDelete(project) {
      this.deleteFragment(
        project,
        M_PROJECT_DELETE,
        F_CATEGORY_PROJECTS,
        'Project',
      )
    },
    // Task
    taskCreate(task) {
      this.createFragment(task, M_TASK_CREATE, F_PROJECT_TASKS, 'Task')
    },
    taskUpdate(task) {
      this.updateFragment(task, M_TASK_UPDATE, 'Task')
    },
    // Entry
    entryCreate(entry) {
      this.createFragment(entry, M_ENTRY_CREATE, F_TASK_ENTRIES, 'Entry')
    },
    entryUpdate(entry) {
      this.updateFragment(entry, M_ENTRY_UPDATE, 'Entry')
    },
    entryTimerStop(entry) {
      this.updateFragment({ id: entry.id }, M_ENTRY_STOP, 'Entry')
    },
    entryTimerStart(entry) {
      this.updateFragment({ id: entry.id }, M_ENTRY_START, 'Entry')
    },
    entryRestart(entry) {
      this.updateFragment({ id: entry.id }, M_ENTRY_RESTART, 'Entry')
    },
    entryComplete(id) {
      this.updateFragment({ id }, M_ENTRY_COMPLETE, 'Entry')
    },
    entryDelete(entry) {
      this.deleteFragment(entry, M_ENTRY_DELETE, F_TASK_ENTRIES, 'Entry')
    },
    settingsUpdate(variables) {
      this.$apollo.mutate({
        mutation: M_SETTINGS_UPDATE,
        variables,
      })
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

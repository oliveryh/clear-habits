import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import App from './App.vue'
import router from './router'

import JwtService from '@/common/jwt.service'
import ErrorFilter from './common/error.filter'
import './quasar'
import utils from '@/common/utils'
import { createProvider } from './vue-apollo'

Vue.config.productionTip = false
Vue.filter('error', ErrorFilter)

// Guard protected routes and forward to login page
router.beforeEach((to, from, next) => {
  if (!['login', 'register'].includes(to.name) && !JwtService.getToken())
    next({ name: 'login' })
  else next()
})

Vue.use(VueCompositionAPI)

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
  M_ENTRY_CREATE_WITH_TASK,
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
import {
  Q_CATEGORY,
  Q_ENTRY,
  Q_TASK,
  Q_PROJECT,
  Q_SETTINGS,
} from '@/graphql/queries'

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
    dateSpread: utils.dateSpread,
    secondsToTimestamp: utils.secondsToTimestamp,
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
    createFragment(variables, mutation, fragment, objectType) {
      // TODO: Add to flattened structure too
      const parent = objectParts[objectType]?.parent
      const children = objectParts[objectType]?.children
      this.$apollo
        .mutate({
          mutation,
          variables,
          update: (store, { data }) => {
            const fragmentUpdate = data[objectType][objectType.toLowerCase()]
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
            const fragmentUpdate = data[objectType][objectType.toLowerCase()]
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
            if (objectType == 'Entry') {
              const weekVariables = this.getWeekDates(store, fragmentNew.date)
              const storeData = store.readQuery({
                query: Q_ENTRY,
                variables: weekVariables,
              })
              const upsert = (array, element) => {
                const i = array.findIndex(
                  _element => _element.id === element.id,
                )
                if (i > -1) Object.update(array[i], element)
                else array.push(element)
              }
              upsert(storeData.entries, fragmentNew)
              store.writeQuery({
                query: Q_ENTRY,
                variables: weekVariables,
                data: storeData,
              })
            }
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
          update: (
            store,
            {
              data: {
                category: { Category },
              },
            },
          ) => {
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
    createProject(project) {
      this.createFragment(
        project,
        M_PROJECT_CREATE,
        F_CATEGORY_PROJECTS,
        'Project',
      )
    },
    updateProject(project) {
      this.updateFragment(project, M_PROJECT_UPDATE, 'Project')
    },
    deleteProject(project) {
      this.deleteFragment(
        project,
        M_PROJECT_DELETE,
        F_CATEGORY_PROJECTS,
        'Project',
      )
    },
    // Task
    createTask(task) {
      this.createFragment(task, M_TASK_CREATE, F_PROJECT_TASKS, 'Task')
    },
    updateTask(task) {
      this.updateFragment(task, M_TASK_UPDATE, 'Task')
    },
    // Entry
    createEntryPaginated(entry) {
      this.$apollo
        .mutate({
          mutation: M_ENTRY_CREATE,
          variables: entry,
          update: (
            store,
            {
              data: {
                Entry: { entry },
              },
            },
          ) => {
            const variables = this.getWeekDates(store)
            const data = store.readQuery({
              query: Q_ENTRY,
              variables,
            })
            data.entries.push(entry)
            store.writeQuery({
              query: Q_ENTRY,
              variables,
              data,
            })
          },
        })
        .catch(error => {
          this.showErrors(error)
        })
    },
    createEntryWithTask(entry) {
      this.$apollo
        .mutate({
          mutation: M_ENTRY_CREATE_WITH_TASK,
          variables: entry,
          update: (
            store,
            {
              data: {
                createEntryWithTask: { entry },
              },
            },
          ) => {
            const variables = this.getWeekDates(store)
            const data = store.readQuery({
              query: Q_ENTRY,
              variables,
            })
            data.entries.push(entry)
            store.writeQuery({
              query: Q_ENTRY,
              variables,
              data,
            })
          },
        })
        .catch(error => {
          this.showErrors(error)
        })
    },
    createEntry(entry) {
      this.createFragment(entry, M_ENTRY_CREATE, F_TASK_ENTRIES, 'Entry')
    },
    updateEntry(entry) {
      this.updateFragment(entry, M_ENTRY_UPDATE, 'Entry')
    },
    stopEntry(entry) {
      this.updateFragment({ id: entry.id }, M_ENTRY_STOP, 'Entry')
    },
    startEntry(entry) {
      this.updateFragment({ id: entry.id }, M_ENTRY_START, 'Entry')
    },
    restartEntry(entry) {
      this.updateFragment({ id: entry.id }, M_ENTRY_RESTART, 'Entry')
    },
    completeEntry(id) {
      this.updateFragment({ id }, M_ENTRY_COMPLETE, 'Entry')
    },
    deleteEntry(entry) {
      this.deleteFragment(entry, M_ENTRY_DELETE, F_TASK_ENTRIES, 'Entry')
    },
    deletePaginatedEntry(entry) {
      this.$apollo.mutate({
        mutation: M_ENTRY_DELETE,
        variables: {
          id: entry.id,
        },
        update: store => {
          const variables = this.getWeekDates(store)
          let data = store.readQuery({
            query: Q_ENTRY,
            variables,
          })

          let newEntries = data.entries

          data.entries = newEntries.filter(c => {
            return c.id !== entry.id
          })

          store.writeQuery({
            query: Q_ENTRY,
            data,
            variables,
          })
        },
      })
    },
    getWeekDates(store, providedDate) {
      const { settings } = store.readQuery({
        query: Q_SETTINGS,
      })
      let monday
      if (providedDate) {
        monday = this.mondayOfWeek(new Date(providedDate))
      } else if (settings.dateZoomed) {
        monday = this.mondayOfWeek(new Date(settings.dateZoomed))
      } else {
        monday = settings.startDate
      }
      return {
        datesIn: this.dateSpread(monday).concat(['backlog']),
      }
    },
    settingsUpdate(variables) {
      this.$apollo.mutate({
        mutation: M_SETTINGS_UPDATE,
        variables,
      })
    },
    isMobile() {
      return /Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|KAIOS/i.test(
        navigator.userAgent,
      )
    },
    mondayOfWeek(date) {
      var newDate = date
      const dayOffset = newDate.getDay()
      newDate.setDate(newDate.getDate() - ((dayOffset + 6) % 7))
      const tzOffset = newDate.getTimezoneOffset()
      newDate = new Date(newDate.getTime() - tzOffset * 60 * 1000)
      return newDate
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

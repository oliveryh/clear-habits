import ApiService from '@/common/api.service'
import {
  A_TASK_CREATE,
  A_TASK_DELETE,
  A_TASK_RETRIEVE,
  A_TASK_UPDATE,
  A_TASK_TIMER_START,
  A_TASK_TIMER_STOP,
  A_TASK_REORDER,
} from './actions.type'
import {
  M_ERROR_SET,
  M_TASK_CREATE,
  M_TASK_DELETE,
  M_TASK_RETRIEVE,
  M_TASK_UPDATE,
  M_CONTROL_ZOOM_ENABLE,
  M_CONTROL_ZOOM_DISABLE,
  M_CONTROL_PROJECT_SELECT,
} from './mutations.type'

const state = {
  errors: null,
  tasks: [],
  dateZoomed: null,
  projectSelected: null,
}

const actions = {
  [A_TASK_RETRIEVE](context) {
    return new Promise(resolve => {
      ApiService.get('tasks')
        .then(({ data }) => {
          context.commit(M_TASK_RETRIEVE, data)
          resolve(data)
        })
        .catch(({ response }) => {
          context.commit(M_ERROR_SET, response.data.errors)
        })
    })
  },
  [A_TASK_REORDER](context, tasks) {
    return new Promise(resolve => {
      ApiService.put(`tasks/reorder`, tasks)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(({ response }) => {
          context.commit(M_ERROR_SET, response.data.errors)
        })
    })
  },
  [A_TASK_CREATE](context, task) {
    return new Promise(resolve => {
      ApiService.post('tasks', task)
        .then(({ data }) => {
          context.commit(M_TASK_CREATE, data)
          resolve(data)
        })
        .catch(({ response }) => {
          context.commit(M_ERROR_SET, response.data.errors)
        })
    })
  },
  [A_TASK_UPDATE](context, task) {
    return new Promise(resolve => {
      ApiService.put(`tasks/${task._id}`, task)
        .then(({ data }) => {
          context.commit(M_TASK_UPDATE, data)
          resolve(data)
        })
        .catch(({ response }) => {
          context.commit(M_ERROR_SET, response.data.errors)
        })
    })
  },
  [A_TASK_TIMER_START](context, task) {
    return new Promise(resolve => {
      ApiService.put(`tasks/${task._id}/start`, task)
        .then(({ data }) => {
          context.commit(M_TASK_UPDATE, data)
          resolve(data)
        })
        .catch(({ response }) => {
          context.commit(M_ERROR_SET, response.data.errors)
        })
    })
  },
  [A_TASK_TIMER_STOP](context, task) {
    return new Promise(resolve => {
      ApiService.put(`tasks/${task._id}/stop`, task)
        .then(({ data }) => {
          context.commit(M_TASK_UPDATE, data)
          resolve(data)
        })
        .catch(({ response }) => {
          context.commit(M_ERROR_SET, response.data.errors)
        })
    })
  },
  [A_TASK_DELETE](context, task) {
    return new Promise(resolve => {
      ApiService.delete(`tasks/${task._id}`, task)
        .then(({ data }) => {
          context.commit(M_TASK_DELETE, task)
          resolve(data)
        })
        .catch(({ response }) => {
          context.commit(M_ERROR_SET, response.data.errors)
        })
    })
  },
}

const mutations = {
  [M_ERROR_SET](state, error) {
    state.errors = error
  },
  [M_TASK_RETRIEVE](state, tasks) {
    state.tasks = tasks
  },
  [M_TASK_CREATE](state, task) {
    state.tasks.push(task)
  },
  [M_TASK_UPDATE](state, data) {
    state.tasks = state.tasks.map(task => {
      if (task._id !== data._id) {
        return task
      }

      task.complete = data.complete
      task.date = data.date
      task.description = data.description
      task.timerActive = data.timerActive
      task.timerStartedAt = data.timerStartedAt
      task.timerTrackedTime = data.timerTrackedTime
      task.project = data.project
      return task
    })
  },
  [M_TASK_DELETE](state, data) {
    let i = state.tasks.map(task => task._id).indexOf(data._id)
    state.tasks.splice(i, 1)
  },
  [M_CONTROL_ZOOM_ENABLE](state, date) {
    state.dateZoomed = date
  },
  [M_CONTROL_ZOOM_DISABLE](state) {
    state.dateZoomed = null
  },
  [M_CONTROL_PROJECT_SELECT](state, projectId) {
    state.projectSelected = projectId
  },
}

export default {
  state,
  actions,
  mutations,
}

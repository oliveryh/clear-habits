import ApiService from '@/common/api.service'
import {
  A_CATEGORY_CREATE,
  A_CATEGORY_DELETE,
  A_CATEGORY_RETRIEVE,
  A_CATEGORY_UPDATE,
  A_PROJECT_CREATE,
  A_PROJECT_DELETE,
  A_PROJECT_RETRIEVE,
  A_PROJECT_UPDATE,
} from './actions.type'
import {
  M_CATEGORY_CREATE,
  M_CATEGORY_DELETE,
  M_CATEGORY_RETRIEVE,
  M_CATEGORY_UPDATE,
  M_CATEGORY_SELECT,
  M_PROJECT_CREATE,
  M_PROJECT_DELETE,
  M_PROJECT_RETRIEVE,
  M_PROJECT_UPDATE,
  M_ERROR_SET,
} from './mutations.type'

const state = {
  errors: null,
  categories: [],
  projects: [],
  categorySelected: null,
}

const actions = {
  [A_CATEGORY_CREATE](context, category) {
    return new Promise(resolve => {
      ApiService.post('categories', category)
        .then(({ data }) => {
          context.commit(M_CATEGORY_CREATE, data)
          resolve(data)
        })
        .catch(({ response }) => {
          context.commit(M_ERROR_SET, response.data.errors)
        })
    })
  },
  [A_CATEGORY_RETRIEVE](context) {
    return new Promise(resolve => {
      ApiService.get('categories')
        .then(({ data }) => {
          context.commit(M_CATEGORY_RETRIEVE, data)
          resolve(data)
        })
        .catch(({ response }) => {
          context.commit(M_ERROR_SET, response.data.errors)
        })
    })
  },
  [A_CATEGORY_UPDATE](context, category) {
    return new Promise(resolve => {
      ApiService.put(`categories/${category._id}`, category)
        .then(({ data }) => {
          context.commit(M_CATEGORY_UPDATE, data)
          resolve(data)
        })
        .catch(({ response }) => {
          context.commit(M_ERROR_SET, response.data.errors)
        })
    })
  },
  [A_CATEGORY_DELETE](context, category) {
    return new Promise(resolve => {
      ApiService.delete(`categories/${category._id}`, category)
        .then(({ data }) => {
          context.commit(M_CATEGORY_DELETE, category)
          resolve(data)
        })
        .catch(({ response }) => {
          context.commit(M_ERROR_SET, response.data.errors)
        })
    })
  },
  [A_PROJECT_CREATE](context, project) {
    return new Promise(resolve => {
      ApiService.post('projects', project)
        .then(({ data }) => {
          context.commit(M_PROJECT_CREATE, data)
          resolve(data)
        })
        .catch(({ response }) => {
          context.commit(M_ERROR_SET, response.data.errors)
        })
    })
  },
  [A_PROJECT_RETRIEVE](context) {
    return new Promise(resolve => {
      ApiService.get('projects')
        .then(({ data }) => {
          context.commit(M_PROJECT_RETRIEVE, data)
          resolve(data)
        })
        .catch(({ response }) => {
          context.commit(M_ERROR_SET, response.data.errors)
        })
    })
  },
  [A_PROJECT_UPDATE](context, project) {
    return new Promise(resolve => {
      ApiService.put(`projects/${project._id}`, project)
        .then(({ data }) => {
          context.commit(M_PROJECT_UPDATE, data)
          resolve(data)
        })
        .catch(({ response }) => {
          context.commit(M_ERROR_SET, response.data.errors)
        })
    })
  },
  [A_PROJECT_DELETE](context, project) {
    return new Promise(resolve => {
      ApiService.delete(`projects/${project._id}`, project)
        .then(({ data }) => {
          context.commit(M_PROJECT_DELETE, project)
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
  [M_CATEGORY_RETRIEVE](state, categories) {
    state.categories = categories
  },
  [M_CATEGORY_CREATE](state, category) {
    state.categories.push(category)
  },
  [M_CATEGORY_UPDATE](state, data) {
    state.categories = state.categories.map(category => {
      if (category._id !== data._id) {
        return category
      }

      category.description = data.description
      category.color = data.color
      return category
    })
  },
  [M_CATEGORY_DELETE](state, data) {
    let i = state.categories.map(category => category._id).indexOf(data._id)
    state.categories.splice(i, 1)
  },
  [M_PROJECT_RETRIEVE](state, projects) {
    state.projects = projects
  },
  [M_PROJECT_CREATE](state, project) {
    state.projects.push(project)
  },
  [M_PROJECT_UPDATE](state, data) {
    state.projects = state.projects.map(project => {
      if (project._id !== data._id) {
        return project
      }

      project.description = data.description
      project.color = data.color
      return project
    })
  },
  [M_PROJECT_DELETE](state, data) {
    let i = state.projects.map(project => project._id).indexOf(data._id)
    state.projects.splice(i, 1)
  },
  [M_CATEGORY_SELECT](state, data) {
    state.categorySelected = data
  },
}

export default {
  state,
  actions,
  mutations,
}

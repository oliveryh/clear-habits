import ApiService from '@/common/api.service'
import JwtService from '@/common/jwt.service'
import {
  A_AUTH_LOGIN,
  A_AUTH_LOGOUT,
  A_AUTH_REGISTER,
  A_AUTH_CHECK,
} from './actions.type'
import { M_AUTH_SET, M_AUTH_PURGE, M_ERROR_SET } from './mutations.type'

const state = {
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getToken(),
}

const getters = {
  currentUser(state) {
    return state.user
  },
  isAuthenticated(state) {
    return state.isAuthenticated
  },
}

const actions = {
  [A_AUTH_LOGIN](context, credentials) {
    return new Promise(resolve => {
      ApiService.post('users/login', { user: credentials })
        .then(({ data }) => {
          context.commit(M_AUTH_SET, data.user)
          resolve(data)
        })
        .catch(({ response }) => {
          context.commit(M_ERROR_SET, response.data.errors)
        })
    })
  },
  [A_AUTH_LOGOUT](context) {
    context.commit(M_AUTH_PURGE)
  },
  [A_AUTH_REGISTER](context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post('users', { user: credentials })
        .then(({ data }) => {
          context.commit(M_AUTH_SET, data.user)
          resolve(data)
        })
        .catch(({ response }) => {
          context.commit(M_ERROR_SET, response.data.errors)
          reject(response)
        })
    })
  },
  [A_AUTH_CHECK](context) {
    if (JwtService.getToken()) {
      ApiService.setHeader()
      ApiService.get('user')
        .then(({ data }) => {
          context.commit(M_AUTH_SET, data.user)
        })
        .catch(({ response }) => {
          context.commit(M_ERROR_SET, response.data.errors)
        })
    } else {
      context.commit(M_AUTH_PURGE)
    }
  },
}

const mutations = {
  [M_ERROR_SET](state, error) {
    state.errors = error
  },
  [M_AUTH_SET](state, user) {
    state.isAuthenticated = true
    state.user = user
    state.errors = {}
    JwtService.saveToken(state.user.token)
  },
  [M_AUTH_PURGE](state) {
    state.isAuthenticated = false
    state.user = {}
    state.errors = {}
    JwtService.destroyToken()
  },
}

export default {
  state,
  actions,
  mutations,
  getters,
}

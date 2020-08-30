import ApiService from '@/common/api.service'
import { A_STATS_RETRIEVE } from './actions.type'
import { M_STATS_RETRIEVE, M_ERROR_SET } from './mutations.type'

const state = {
  errors: null,
  stats: {},
}

const actions = {
  [A_STATS_RETRIEVE](context) {
    return new Promise(resolve => {
      ApiService.get('stats')
        .then(({ data }) => {
          context.commit(M_STATS_RETRIEVE, data)
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
  [M_STATS_RETRIEVE](state, stats) {
    state.stats = stats
  },
}

export default {
  state,
  actions,
  mutations,
}

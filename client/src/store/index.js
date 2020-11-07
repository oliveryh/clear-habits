import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth.module'
import home from './home.module'
import settings from './settings.module'
import stats from './stats.module'

import { getField, updateField } from 'vuex-map-fields'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    home,
    settings,
    stats,
  },
  getters: {
    getField,
  },
  mutations: {
    updateField,
  },
})

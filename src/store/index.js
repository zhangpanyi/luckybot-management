import Vue from 'vue'
import Vuex from 'vuex'

import NetworkModule from './modules/network'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    network: NetworkModule
  },
  strict: true
})

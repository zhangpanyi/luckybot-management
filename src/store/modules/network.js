export default {
  types: {
    code: '',
    server: '',
    session: ''
  },

  namespaced: true,

  mutations: {
    setCode (state, payload) {
      state.code = payload
    },
    setServer (state, payload) {
      state.server = payload
    },
    setSession (state, payload) {
      state.session = payload
    }
  },

  actions: {
    setCode: ({commit}, value) => {
      commit('setCode', value)
    },
    setServer: ({commit}, value) => {
      commit('setServer', value)
    },
    setSession: ({commit}, value) => {
      commit('setSession', value)
    }
  },

  getters: {
    code: state => state.code,
    server: state => state.server,
    session: state => state.session
  }
}

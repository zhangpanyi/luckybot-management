export default {
  state: {
    server: '',
    code: undefined,
    session: undefined
  },

  namespaced: true,

  mutations: {
    setCode (state, payload) {
      state.code = payload
      localStorage.setItem('network/code', payload)
    },
    setServer (state, payload) {
      state.server = payload
    },
    setSession (state, payload) {
      state.session = payload
      localStorage.setItem('network/session', payload)
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
    code: function (state) {
      return state.code
    },
    session: function (state) {
      return state.session
    },
    server: state => state.server
  }
}

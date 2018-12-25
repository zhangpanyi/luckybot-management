export default {
  state: {
    server: '',
    expire_at: 0,
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
    },
    setExpireAt (state, payload) {
      state.expire_at = payload
      localStorage.setItem('network/expire_at', payload)
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
    },
    setExpireAt: ({commit}, value) => {
      commit('setExpireAt', value)
    }
  },

  getters: {
    code: state => state.code,
    server: state => state.server,
    session: state => state.session,
    expire_at: state => state.expire_at
  }
}

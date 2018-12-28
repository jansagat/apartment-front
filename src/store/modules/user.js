const state = {
  isUserSignedIn: false
}

const getters = {
  getAuthState (state) {
    return state.isUserSignedIn
  }
}

const mutations = {
  setAuthState (state, authState) {
    state.isUserSignedIn = authState
  }
}

const actions = {
  setAuthState ({ commit }, authState) {
    commit('setAuthState', authState)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

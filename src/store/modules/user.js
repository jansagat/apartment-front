const state = {
  isUserSignedIn: false,
  userInfo: null
}

const getters = {
  getAuthState (state) {
    return state.isUserSignedIn
  },
  getUserInfo (state) {
    return state.userInfo
  }
}

const mutations = {
  setAuthState (state, authState) {
    state.isUserSignedIn = authState
  },
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
  }
}

const actions = {
  setAuthState ({ commit }, authState) {
    commit('setAuthState', authState)
  },
  setUserInfo ({ commit }, userInfo) {
    commit('setUserInfo', userInfo)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

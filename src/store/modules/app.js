const state = {
  drawer: false
}

const getters = {
  getDrawer (state) {
    return state.drawer
  }
}

const mutations = {
  setDrawer (state, drawer) {
    state.drawer = drawer
  }
}

const actions = {
  setDrawer ({ commit }, drawer) {
    commit('setDrawer', drawer)
  }
}

export default {
  namspaced: true,
  state,
  getters,
  mutations,
  actions
}

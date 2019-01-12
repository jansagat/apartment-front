const state = {
  announcements: []
}

const getters = {
  getAnnouncements (state) {
    return state.announcements
  }
}

const mutations = {
  setAnnouncements (state, announcements) {
    state.announcements = announcements
  },
  concatAnnouncements (state, announcements) {
    state.announcements = state.announcements.concat(announcements)
  }
}

const actions = {
  setAnnouncements ({ commit }, announcements) {
    commit('setAnnouncements', announcements)
  },
  concatAnnouncements ({ commit }, announcements) {
    commit('concatAnnouncements', announcements)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

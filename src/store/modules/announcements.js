const state = {
  announcements: []
}

const getters = {
  getAnnouncements (state) {
    return state.announcements
  }
}

const mutations = {
  setAnnouncements (state, announcement) {
    state.announcements = announcement
  },
  concatAnnouncements (state, announcement) {
    state.announcements = state.announcements.concat(announcement)
  }
}

const actions = {
  setAnnouncements ({ commit }, announcement) {
    commit('setAnnouncements', announcement)
  },
  concatAnnouncements ({ commit }, announcement) {
    commit('concatAnnouncements', announcement)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

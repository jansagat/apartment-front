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
    console.log(announcement)
    console.log(state.announcements)
    state.announcements = state.announcements.concat(announcement)
    console.log(state.announcements)
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

const state = {
  announcements: [],
  lastDoc: null
}

const getters = {
  getAnnouncements (state) {
    return state.announcements
  },
  getLastDoc (state) {
    return state.lastDoc
  }
}

const mutations = {
  setAnnouncements (state, announcements) {
    state.announcements = announcements
  },
  concatAnnouncements (state, announcements) {
    state.announcements = state.announcements.concat(announcements)
  },
  setLastDoc (state, lastDoc) {
    state.lastDoc = lastDoc
  }
}

const actions = {
  setAnnouncements ({ commit }, announcements) {
    commit('setAnnouncements', announcements)
  },
  concatAnnouncements ({ commit }, announcements) {
    commit('concatAnnouncements', announcements)
  },
  setLastDoc ({ commit }, lastDoc) {
    commit('setLastDoc', lastDoc)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

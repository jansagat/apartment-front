const state = {
  newAnnouncement: null,
  newAnnouncementImages: []
}

const getters = {
  getNewAnnouncement (state) {
    return state.newAnnouncement
  },
  getNewAnnouncementImages (state) {
    return state.newAnnouncementImages
  }
}

const mutations = {
  setNewAnnouncement (state, newAnnouncement) {
    state.newAnnouncement = newAnnouncement
  },
  setNewAnnouncementImages (state, newAnnouncementImages) {
    state.newAnnouncementImages = newAnnouncementImages
  }
}

const actions = {
  setNewAnnouncement ({ commit }, newAnnouncement) {
    commit('setNewAnnouncement', newAnnouncement)
  },
  setNewAnnouncementImages ({ commit }, newAnnouncementImages) {
    commit('setNewAnnouncementImages', newAnnouncementImages)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

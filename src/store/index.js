import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import newAnnouncement from './modules/newAnnouncement'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    newAnnouncement
  }
})

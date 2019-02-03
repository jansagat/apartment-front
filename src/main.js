import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import Vue from 'vue'
import '@/plugins/plugins'
import App from '@/App.vue'
import '@/components/_common/commonComponents'
import router from '@/router'
import store from '@/store'
import firebaseConfig from '@/config/firebase.config'

Vue.config.productionTip = false

firebase.initializeApp(firebaseConfig)
const firestore = firebase.firestore()
const settings = { timestampsInSnapshots: true }
firestore.settings(settings)
firebase.auth().languageCode = 'ru'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

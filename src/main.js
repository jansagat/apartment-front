import firebase from 'firebase/app'
import 'firebase/auth'
import Vue from 'vue'
import '@/plugins/vuetify'
import App from '@/App.vue'
import '@/components/_common/commonComponents'
import router from '@/router'
import store from '@/store'
import firebaseConfig from '@/config/firebase.config'

Vue.config.productionTip = false

firebase.initializeApp(firebaseConfig)
firebase.auth().languageCode = 'en'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

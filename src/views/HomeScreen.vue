<script>
import firebase from 'firebase/app'
import store from '@/store'
import { mapGetters } from 'vuex'
const USER_SIGNED_IN = true
const NO_USER_SIGNED_IN = false

export default {
  name: 'HomeScreen',
  computed: {
    ...mapGetters('user', ['getUserInfo'])
  },
  async beforeRouteEnter (to, from, next) {
    try {
      await new Promise((resolve) => {
        firebase.auth().onAuthStateChanged((user) => {
          user
            ? store.dispatch('user/setAuthState', USER_SIGNED_IN) &&
            store.dispatch('user/setUserInfo', {
              phone: user.phoneNumber,
              uid: user.uid
            })
            : store.dispatch('user/setAuthState', NO_USER_SIGNED_IN)
          resolve()
        })
      })
    } catch (e) {
      console.error(e)
    } finally {
      next()
    }
  }
}
</script>

<template>
  <router-view/>
</template>

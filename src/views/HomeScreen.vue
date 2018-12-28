<script>
import firebase from 'firebase/app'
import store from '@/store'
const USER_SIGNED_IN = true
const NO_USER_SIGNED_IN = false

export default {
  name: 'HomeScreen',
  async beforeRouteEnter (to, from, next) {
    try {
      await firebase.auth().onAuthStateChanged((user) => {
        user
          ? store.dispatch('user/setAuthState', USER_SIGNED_IN)
          : store.dispatch('user/setAuthState', NO_USER_SIGNED_IN)
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

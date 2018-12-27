<script>
import firebase from 'firebase/app'
export default {
  name: 'HomeScreen',
  beforeCreate () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        // User is signed in.
      } else {
        console.log('// No user is signed in.')
      }
    })
  }
}
</script>

<template>
  <router-view/>
</template>

<script>
import AppNavigationDrawer from '@/components/_common/AppNavigationDrawer'

export default {
  name: 'App',
  components: {
    AppNavigationDrawer
  },
  data () {
    return {
      drawer: false
    }
  }
}
</script>

<template>
  <v-app>
    <app-navigation-drawer
      :drawer.sync="drawer"
    />

    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

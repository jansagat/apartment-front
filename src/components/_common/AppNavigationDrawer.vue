<script>
export default {
  name: 'AppNavigationDrawer',
  props: {
    drawer: Boolean
  },
  data () {
    return {}
  },
  methods: {
    actionDrawer (value) {
      this.$emit('update:drawer', value)
    }
  }
}
</script>

<template>
  <v-navigation-drawer
      clipped
      fixed
      :value="drawer"
      @input="actionDrawer"
      app
  >
    <v-list dense>
      <v-list-tile >
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile >
        <v-list-tile-action>
          <v-icon>search</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Search</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<style>

</style>

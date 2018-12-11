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
    },
    addAnnouncement () {
      this.$router.push({ name: 'AddAnnouncement' })
    },
    moderateAnnouncements () {
      this.$router.push({ name: 'ModerateAnnouncements' })
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
      <v-list-tile
          @click="$router.push('/')"
      >
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Main</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        @click="addAnnouncement"
      >
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Add announcement</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        @click="moderateAnnouncements"
      >
        <v-list-tile-action>
          <v-icon>search</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Moderate Announcements</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<style>

</style>

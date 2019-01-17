<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AppNavigationDrawer',
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['getDrawer'])
  },
  methods: {
    actionDrawer (value) {
      this.setDrawer(value)
    },
    addAnnouncement () {
      this.$router.push({ name: 'AddAnnouncement' })
    },
    moderateAnnouncements () {
      this.$router.push({ name: 'ModerateAnnouncements' })
    },
    ...mapActions(['setDrawer'])
  }
}
</script>

<template>
  <v-navigation-drawer
    clipped
    fixed
    :value="getDrawer"
    @input="actionDrawer"
    app
    touchless
  >
    <v-list dense>
      <v-list-tile
          @click="$router.push('/')"
      >
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Главная</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        @click="addAnnouncement"
      >
        <v-list-tile-action>
          <v-icon>add</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Добавить объявление</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<style>

</style>

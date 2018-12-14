<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'AppToolbar',
  data () {
    return {
      isMainPage: true
    }
  },
  computed: {
    ...mapGetters(['getDrawer'])
  },
  watch: {
    '$route' () {
      this.checkPage()
    }
  },
  mounted () {
    this.checkPage()
  },
  methods: {
    checkPage () {
      this.isMainPage = this.$route.path === '/'
    },
    historyBack () {
      this.$router.go(-1)
    },
    clickSideIcon () {
      this.setDrawer(!this.drawer)
    },
    ...mapActions(['setDrawer'])
  }
}
</script>

<template>
  <v-toolbar app fixed clipped-left>
    <v-toolbar-side-icon
      v-if="isMainPage"
      @click.stop="clickSideIcon">
    </v-toolbar-side-icon>
    <v-btn
      v-if="!isMainPage"
      @click="historyBack"
      icon
    >
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-toolbar-title>
      Application
    </v-toolbar-title>
  </v-toolbar>
</template>

<style scoped>

</style>

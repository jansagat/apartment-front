<script>
import AppNavigationDrawer from '@/components/_common/AppNavigationDrawer'

export default {
  name: 'App',
  components: {
    AppNavigationDrawer
  }
}
</script>

<template>
  <v-app>
    <app-navigation-drawer/>

    <app-toolbar/>

    <v-content>
      <transition name="component-fade" mode="out-in">
        <router-view/>
      </transition>
    </v-content>
  </v-app>
</template>

<style lang="sass">
.component-fade-enter-active, .component-fade-leave-active
  transition: opacity .3s ease

.component-fade-enter, .component-fade-leave-to
  opacity: 0
</style>

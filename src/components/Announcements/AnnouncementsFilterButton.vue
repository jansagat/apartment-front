<script>
export default {
  name: 'AnnouncementsFilter',
  data () {
    return {
      //
    }
  }
}
</script>

<template>
  <div class="text-xs-center filter">
    <v-btn round color="primary" dark>
      <v-icon>search</v-icon>
      <span>Фильтр</span>
    </v-btn>
  </div>
</template>

<style lang="sass" scoped>
.filter
  position: fixed
  bottom: 20px
  left: 50%
  transform: translateX(-50%)
</style>

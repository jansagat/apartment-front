<script>
export default {
  name: 'FilterAnnouncements',
  data () {
    return {
      params: {
        id: 0 // example param
      }
    }
  },
  methods: {
    onClickOpenAnnouncementsListWithParams () {
      this.$router.push({
        name: 'AnnouncementsList',
        params: { filterParams: this.params }
      })
    }
  }
}
</script>

<template>
  <v-layout column>
    <v-flex text-xs-center>
      <h1>filter</h1>
    </v-flex>
    <v-flex text-xs-center>
      <div>
        <v-btn
          block
          color="primary"
          @click="onClickOpenAnnouncementsListWithParams"
        >
          Показать
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<style>

</style>

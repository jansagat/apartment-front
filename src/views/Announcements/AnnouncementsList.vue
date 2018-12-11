<script>
import AnnouncementCard from '@/components/Announcements/AnnouncementCard'
import AnnouncementsFilterButton from '@/components/Announcements/AnnouncementsFilterButton'

export default {
  name: 'AnnouncementsList',
  components: {
    AnnouncementCard,
    AnnouncementsFilterButton
  },
  props: {
    filterParams: Object // TODO filter parameter processing
  },
  data () {
    return {
      count: 5
    }
  },
  methods: {
    onClickOpenFilterAnnouncements () {
      this.$router.push({ name: 'FilterAnnouncements' })
    }
  }
}
</script>

<template>
  <div class="announcements-list">
    <h1>AnnouncementsList</h1>

    <announcement-card
      v-for="(announcement, index) in count"
      :announcement="announcement"
      :id="index"
      :key="index"
    />

    <announcements-filter-button
      @click.native="onClickOpenFilterAnnouncements"
    />
  </div>
</template>

<style lang="sass" scoped>
.announcements-list
  padding-bottom: 90px
</style>

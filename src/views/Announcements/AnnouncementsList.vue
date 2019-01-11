<script>
import AnnouncementCard from '@/components/Announcements/AnnouncementCard'
import AnnouncementsFilterButton from '@/components/Announcements/AnnouncementsFilterButton'
import firebase from 'firebase/app'
import { mapActions, mapGetters } from 'vuex'

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
      screenBottom: false,
      lastDoc: null
    }
  },
  computed: {
    ...mapGetters('announcements', ['getAnnouncements'])
  },
  watch: {
    screenBottom (val) {
      if (val) {
        this.fetchNextAnnouncements()
      }
    }
  },
  mounted () {
    document.addEventListener('scroll', this.isScreenBottomDisplayed)
    this.fetchAnnouncementsFirstPage()
  },
  destroyed () {
    document.removeEventListener('scroll', this.isScreenBottomDisplayed)
  },
  methods: {
    isScreenBottomDisplayed () {
      let rect = document.querySelector('.end').getBoundingClientRect()
      let elemTop = rect.top
      let elemBottom = rect.bottom

      this.screenBottom = elemTop < window.innerHeight && elemBottom >= 0
    },
    async fetchAnnouncementsFirstPage () {
      try {
        let announcements = []
        const db = firebase.firestore()
        const querySnapshots = await db.collection('announcements').limit(10).get()
        this.lastDoc = querySnapshots.docs[querySnapshots.docs.length - 1]
        querySnapshots.forEach((doc) => {
          announcements.push(doc.data())
        })
        this.setAnnouncements(announcements)
      } catch (e) {
        console.error(e)
      }
    },
    async fetchNextAnnouncements () {
      try {
        let announcements = []
        const db = firebase.firestore()
        if (!this.lastDoc) return
        const querySnapshots = await db.collection('announcements')
          .startAfter(this.lastDoc)
          .limit(10)
          .get()
        this.lastDoc = querySnapshots.docs[querySnapshots.docs.length - 1]
        querySnapshots.forEach((doc) => {
          announcements.push(doc.data())
        })
        this.concatAnnouncements(announcements)
      } catch (e) {
        console.error(e)
      }
    },
    onClickOpenFilterAnnouncements () {
      this.$router.push({ name: 'FilterAnnouncements' })
    },
    ...mapActions('announcements', ['setAnnouncements', 'concatAnnouncements'])
  }
}
</script>

<template>
  <div class="announcements-list">
    <announcement-card
      v-for="(announcement, index) in getAnnouncements"
      :announcement="announcement"
      :id="index"
      :key="index"
    />

    <announcements-filter-button
      @click.native="onClickOpenFilterAnnouncements"
    />

    <div class="end"></div>
  </div>
</template>

<style lang="sass" scoped>
.announcements-list
  padding-bottom: 90px
</style>

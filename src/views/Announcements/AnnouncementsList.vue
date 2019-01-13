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
      lastDoc: null,
      loading: false
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
      this.loading = true
      try {
        let announcements = []
        const db = firebase.firestore()
        const querySnapshots = await db.collection('announcements').limit(10).get()
        this.lastDoc = querySnapshots.docs[querySnapshots.docs.length - 1]
        querySnapshots.forEach((doc) => {
          const docData = doc.data()
          docData.id = doc.id
          announcements.push(docData)
        })
        this.setAnnouncements(announcements)
      } catch (e) {
        console.error(e)
      }
      this.loading = false
    },
    async fetchNextAnnouncements () {
      this.loading = true
      try {
        let announcements = []
        const db = firebase.firestore()
        if (!this.lastDoc) {
          this.loading = false
          return
        }
        const querySnapshots = await db.collection('announcements')
          .startAfter(this.lastDoc)
          .limit(10)
          .get()
        this.lastDoc = querySnapshots.docs[querySnapshots.docs.length - 1]
        querySnapshots.forEach((doc) => {
          const docData = doc.data()
          docData.id = doc.id
          announcements.push(docData)
        })
        this.concatAnnouncements(announcements)
      } catch (e) {
        console.error(e)
      }
      this.loading = false
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
      :key="index"
    />

    <announcements-filter-button
      @click.native="onClickOpenFilterAnnouncements"
    />

    <div class="loader">
      <v-progress-circular
        v-if="loading"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>

    <div class="end"></div>
  </div>
</template>

<style lang="sass" scoped>
.announcements-list
  padding-bottom: 90px
.loader
  text-align: center
  padding-top: 20px
  z-index: 0
</style>

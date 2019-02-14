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
    filteredQuerySnapshots: Object
  },
  data () {
    return {
      screenBottom: false,
      loading: false,
      querySnapshots: null
    }
  },
  computed: {
    ...mapGetters('announcements', ['getAnnouncements', 'getLastDoc'])
  },
  watch: {
    screenBottom (val) {
      if (val) {
        this.fetchNextAnnouncements()
      }
    }
  },
  async mounted () {
    this.$appToolbar.setTitle('Недвижимость')
    document.addEventListener('scroll', this.isScreenBottomDisplayed)
    if (this.filteredQuerySnapshots || !this.getAnnouncements.length > 0) {
      this.fetchAnnouncementsFirstPage()
    }
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
        if (this.filteredQuerySnapshots) {
          this.querySnapshots = await this.filteredQuerySnapshots.limit(10).get()
        } else {
          this.querySnapshots = await db.collection('announcements').limit(4).get()
        }
        const lastDoc = this.querySnapshots.docs[this.querySnapshots.docs.length - 1]
        this.setLastDoc(lastDoc)
        this.querySnapshots.forEach((doc) => {
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
      if (this.loading) return // prevent second loading // TODO set debounce in the screenBottom watcher
      this.loading = true
      try {
        let announcements = []
        const db = firebase.firestore()
        if (!this.getLastDoc) {
          this.loading = false
          return
        }
        if (this.filteredQuerySnapshots) {
          this.querySnapshots = await this.filteredQuerySnapshots
        } else {
          this.querySnapshots = await db.collection('announcements')
        }
        this.querySnapshots = await this.querySnapshots
          .startAfter(this.getLastDoc)
          .limit(10)
          .get()
        const lastDoc = this.querySnapshots.docs[this.querySnapshots.docs.length - 1]
        this.setLastDoc(lastDoc)
        this.querySnapshots.forEach((doc) => {
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
    ...mapActions('announcements', ['setAnnouncements', 'concatAnnouncements', 'setLastDoc'])
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

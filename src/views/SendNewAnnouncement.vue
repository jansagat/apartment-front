<script>
import firebase from 'firebase/app'
import {
  mapGetters,
  mapActions
} from 'vuex'
import uuidv4 from 'uuid/v4'
import AppSuccessAnimation from '@/components/_common/AppSuccessAnimation'
import { getDownloadLinks } from '../utils/firebaseUtils'

export default {
  name: 'SendNewAnnouncement',
  components: { AppSuccessAnimation },
  data () {
    return {
      uploadedImagesPaths: [],
      loadedCount: 0,
      loadingText: 'Отправка объявления...',
      imagesLength: 0,
      loadingStatus: 'progress'
    }
  },
  computed: {
    progressValue () {
      return this.loadedCount > 0 ? Math.floor(100 * this.loadedCount / (this.imagesLength + 1)) : 0
    },
    ...mapGetters('newAnnouncement', ['getNewAnnouncementImages', 'getNewAnnouncement']),
    ...mapGetters('user', ['getUserInfo'])
  },
  beforeMount () {
    this.imagesLength = this.getNewAnnouncementImages.length
  },
  async mounted () {
    if (!this.getNewAnnouncement) {
      this.$router.replace({ name: 'AddAnnouncement' })
    }
    await this.uploadImages()
  },
  methods: {
    async sendDataToStore (imagesDownloadLinks) {
      const db = firebase.firestore()
      db.settings({ timestampsInSnapshots: true })
      try {
        await db.collection('announcements').add({
          ...this.getNewAnnouncement,
          images: this.uploadedImagesPaths,
          imagesDownloadLinks,
          userId: this.getUserInfo.uid
        })
        this.loadedCount++
        setTimeout(() => {
          this.loadingStatus = 'success'
          this.setNewAnnouncement(null)
          this.setNewAnnouncementImages([])
        }, 600)
      } catch (e) {
        console.error('Error adding document: ', e)
      }
    },
    async getImagesDownloadLinks () {
      const imagesDownloadLinks = await getDownloadLinks(this.uploadedImagesPaths)
      this.sendDataToStore(imagesDownloadLinks)
    },
    async uploadImages () {
      try {
        await Promise.all(
          this.getNewAnnouncementImages.map(image => this.putImageToStorage(image))
        )
        this.getImagesDownloadLinks()
      } catch (e) {
        console.error(`Some failed: `, e.message)
      }
    },
    putImageToStorage (image) {
      let imageExt = this.getImageExt(image.image)
      return firebase.storage().ref().child(`images/${uuidv4() + imageExt}`).put(image.image)
        .then((snapshot) => {
          this.uploadedImagesPaths.push(snapshot.ref.fullPath)
          this.loadedCount++
        }).catch((e) => {
          console.error(e.message)
        })
    },
    getImageExt (image) {
      return /^image\/png$/.test(image.type) ? '.png' : '.jpg'
    },
    addAnnouncement () {
      this.$router.replace({ name: 'AddAnnouncement' })
    },
    goToMainPage () {
      this.$router.replace({ name: 'AnnouncementsList' })
    },
    ...mapActions('newAnnouncement', ['setNewAnnouncement', 'setNewAnnouncementImages'])
  }
}
</script>

<template>
  <div class="wrapper">
    <div
      v-if="loadingStatus === 'progress'"
      class="progress"
    >
      <v-progress-circular
        :rotate="-90"
        :size="200"
        :width="15"
        :value="progressValue"
        color="primary"
      >
        <span class="title">{{ progressValue + '%' }}</span>
      </v-progress-circular>
      <div class="loading-text mt-4">
        <span>
          {{ loadingText }}
        </span>
      </div>
    </div>
    <div
      v-else-if="loadingStatus === 'success'"
      class="success-loading"
    >
      <app-success-animation/>
      <div class="loading-text">
        <span>
          Объявление отправлено на модерацию
        </span>
        <v-flex xs12 pl-2 pr-2 mt-4>
          <v-btn
            round
            color="primary"
            block
            @click="addAnnouncement"
          >
            Добавить еще объявление
          </v-btn>
        </v-flex>
        <v-flex xs12 pl-2 pr-2 mt-3>
          <v-btn
            round
            color="primary"
            block
            @click="goToMainPage"
          >
            На главную
          </v-btn>
        </v-flex>
      </div>
    </div>
    <div
      v-else
      class="failed"
    >
      <div class="loading-text red--text">
        <span>
          Что-то пошло не так
        </span>
        <v-flex xs12 pl-2 pr-2>
          <v-btn
            round
            color="primary"
            block
            @click="addAnnouncement"
          >
            Отправить объявление еще раз
          </v-btn>
        </v-flex>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.wrapper
  height: 100%

.progress,
.success-loading,
.failed
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  height: 70%

.loading-text
  font-size: 18px
  font-weight: bold
  text-align: center
</style>

<script>
import { mapGetters } from 'vuex'
import { OFFER_TYPE, CITIES, PROPERTY_TYPE } from '@/constants/AppConstants'

export default {
  name: 'AnnouncementSingleFull',
  props: {
    id: String
  },
  data () {
    return {
      OFFER_TYPE,
      CITIES,
      PROPERTY_TYPE,
      currentImageIndex: null
    }
  },
  computed: {
    item () {
      return this.getAnnouncements.find(item => item.id === this.id) // TODO polyfill for find
    },
    itemCity () {
      return CITIES.find(item => item.id === this.item.cityId).name
    },
    itemThumbImages () {
      if (!this.item.imagesDownloadLinks) return []
      return this.item.imagesDownloadLinks.map(item => item.replace(/(images%2F)(.*(.jpg|.png|.jpeg))/, '$1thumb_$2'))
    },
    offerType () {
      return this.OFFER_TYPE.find(item => item.id === this.item.offerTypeId).name
    },
    ...mapGetters('announcements', ['getAnnouncements'])
  },
  mounted () {
    this.$appToolbar.setTitle(`${this.item.rooms} комн. за ${this.item.price} ₸`)
  },
  methods: {
    onImageClick () {
      this.$router.push({
        name: 'AnnouncementSingleImage',
        params: {
          images: this.item.imagesDownloadLinks,
          initImageIndex: this.currentImageIndex
        }
      })
    },
    openPhoneCallApp (phone) {
      this.$router.replace({ query: { CALL_PHONE: phone } })
      setTimeout(() => {
        this.$router.replace({ query: { clear: '' } }) // FIXME fix the hack
      }, 100)
    }
  }
}
</script>

<template>
  <div class="announcement-single">
    <v-carousel
      v-if="itemThumbImages.length > 0"
      :hide-controls="true"
      :hide-delimiters="true"
      height="200"
      v-model="currentImageIndex"
      @click.native="onImageClick"
      :cycle="false"
      class="announcement-carousel"
    >
      <v-carousel-item
        v-for="(image,i) in itemThumbImages"
        :key="i"
        :src="image"
        style="transform: translate3d(0, 0 ,0)"
      ></v-carousel-item>
    </v-carousel>
    <v-flex xs12 class="announcement-data">
      <v-card class="announcement-card">
        <v-card-title>
          <div>
            <div class="headline mt-1">{{ item.price }} ₸</div>
            <div class="mt-1">
              <span>{{offerType}} {{ item.rooms }} комн., {{ item.area }} м<sup>2</sup>, {{ item.floor }} этаж, г. {{ itemCity }}</span>
            </div>
            <div class="mt-1 mb-1"><span>{{ item.address }}</span></div>
          </div>
        <v-card-text class="pa-0">
          <p>{{ item.description }}</p>
        </v-card-text>
        </v-card-title>
        <v-card-actions
          class='card-actions'
        >
          <v-btn
            round
            color="primary"
            block
            @click="openPhoneCallApp(item.phone)"
          >
            Позвонить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </div>
</template>

<style lang="sass" scoped>
.items-list
  list-style: none
  margin: 0
  padding: 0
  width: 100%

.item
  display: flex
  justify-content: space-between

.announcement-single
  display: flex
  flex-direction: column
  height: 100%

.announcement-carousel
  transform: translate3d(0, 0 ,0)
  overflow: initial!important

.announcement-data
  flex: 1 100%
  display: flex

.announcement-card
  height: 100%
  width: 100%
  display: flex
  flex-direction: column
  justify-content: space-between

.card-actions
  padding-bottom: 40px
</style>

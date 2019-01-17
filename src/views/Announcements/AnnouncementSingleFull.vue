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
      return this.item.imagesDownloadLinks.map(item => item.replace(/(images%2F)(.*(.jpg|.png|.jpeg))/, '$1thumb_$2'))
    },
    ...mapGetters('announcements', ['getAnnouncements'])
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
    }
  }
}
</script>

<template>
  <div class="announcement-single">
    <v-carousel
      v-if="item"
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
              <span>{{ item.floor }} комн., {{ item.area }} м<sup>2</sup>, этаж {{ item.floor }}, г. {{ itemCity }}</span>
            </div>
            <div class="mt-1 mb-1"><span>{{ item.address }}</span></div>
          </div>
          <div>
            <p>{{ item.description }}</p>
          </div>
        </v-card-title>
        <v-card-actions
          class='card-actions'
        >
          <a
            style="width:100%"
            :href="'tel:' + item.phone"
          >
            <v-btn
              round
              color="primary"
              block
            >
              Позвонить
            </v-btn>
          </a>
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
  display: flex
  flex-direction: column
  justify-content: space-between
  
.card-actions
  padding-bottom: 40px
</style>

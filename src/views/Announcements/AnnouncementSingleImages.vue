<script>
import Swiper from 'swiper'
export default {
  name: 'AnnouncementSingleImage',
  props: {
    images: Array,
    initImageIndex: Number
  },
  data () {
    return {
      swiperInstance: null
    }
  },
  computed: {
    thumbImages () {
      return this.images.map(item => item.replace(/(images%2F)(.*(.jpg|.png|.jpeg))/, '$1thumb_$2'))
    }
  },
  mounted () {
    this.swiperInstance = new Swiper(this.$refs.swiper, {
      zoom: true
    })
  }
}
</script>

<template>
  <div class="images-container">
      <div ref="swiper" class="swiper-container">
        <div class="swiper-wrapper">
          <div
            v-for="(image, index) in thumbImages"
            :key="index"
            class="swiper-slide"
          >
            <div class="swiper-zoom-container">
              <img :src="image">
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<style lang="sass" scoped>
@import '@/styles/swiper.sass'

.swiper-container
  width: 100%
  height: 100%

.swiper-slide
  overflow: hidden
  
.images-container
  overflow: hidden
  position: absolute
  top: 0
  left: 0
  bottom: 0
  right: 0
  background: #000
  
</style>

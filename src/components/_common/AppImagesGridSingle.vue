<script>
export default {
  name: 'app-images-grid-single',
  props: {
    image: Object
  },
  data () {
    return {
      loading: false,
      img: this.image
    }
  },
  watch: {
    image () {
      this.img = this.image
      this.setImageOnLoad()
    }
  },
  mounted () {
    this.setImageOnLoad()
  },
  methods: {
    setImageOnLoad () {
      this.loading = true
      const img = new Image()
      img.src = this.img.url
      img.onload = () => {
        this.$refs.image.style.backgroundImage = `url(${img.src})`
        this.loading = false
      }
      img.onerror = () => {
        this.loading = false
      }
    }
  }
}
</script>

<template>
  <div>
    <div
      v-show="loading"
      class="loader"
    >
    </div>
    <div
      ref="image"
      class="image"
    >
    </div>
    <div
      v-if="img.main"
      class="main-image-title"
    >
      <span>Главное фото</span>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.main-image-title
  background-color: #1976d2
  padding: 0 2px
  width: 100%
  position: absolute
  top: 0
  color: white

.image
  transform: translate3d(0, 0, 0)
  width: 100%
  padding-top: 100%
  background-size: cover
  margin-right: 5px

.loader
  transform: translate3d(0, 0, 0)
  position: absolute
  top: 0
  border-radius: 50%
  width: 100%
  height: 100%
  font-size: 5px
  text-indent: -9999em
  border-top: 1.1em solid rgba(0, 0, 0, 0.2)
  border-right: 1.1em solid rgba(0, 0, 0, 0.2)
  border-bottom: 1.1em solid rgba(0, 0, 0, 0.2)
  border-left: 1.1em solid #000
  animation: load 1.1s infinite linear

@keyframes load
  0%
    -webkit-transform: rotate(0deg)
    transform: rotate(0deg)

  100%
    -webkit-transform: rotate(360deg)
    transform: rotate(360deg)

</style>

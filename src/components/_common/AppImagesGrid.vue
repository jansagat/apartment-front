<script>
import AppImagesGridSingle from './AppImagesGridSingle'

export default {
  name: 'AppImagesGrid',
  components: { AppImagesGridSingle },
  props: {
    imgs: Array
  },
  computed: {
    images () {
      return this.imgs
    }
  },
  methods: {
    deleteImage (index, $event) {
      console.log(index, 'index 1')
      this.$emit('deleteImage', index, $event)
    },
    setMainImage (index) {
      this.$emit('setMainImage', index)
    },
    randomKey () {
      return new Date().getTime()
    }
  }
}
</script>

<template>
  <v-flex xs12 sm6 offset-sm3>
    <v-container grid-list-sm fluid>
      <v-layout row wrap>
        <v-flex
          v-for="(image, index) in images"
          :key="index"
          xs4
          d-flex
        >
          <v-card flat tile class="d-flex">
            <div
              class="image-container"
              @click="setMainImage(index)"
            >
              <app-images-grid-single
                :image="image"
              />
              <div class="btn-wrap">
                <v-btn flat icon color="white" @click="deleteImage(index, $event)">
                  <v-icon>delete</v-icon>
                </v-btn>
              </div>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-flex>
</template>

<style lang="sass" scoped>
.btn-wrap
  background-color: #f44336
  width: 30px
  height: 30px
  border-radius: 50%
  overflow: hidden
  position: absolute
  bottom: 0
  left: 0
  display: flex
  justify-content: center
  align-items: center

.image-container
  position: relative

</style>

<script>
import firebase from 'firebase/app'
import { required } from '@/utils/validationRules'
import ImagesGrid from './AppImagesGrid'

export default {
  name: 'AppUploadImage',
  components: { ImagesGrid },
  data () {
    return {
      images: [],
      imageInput: null,
      btnLoading: false,
      required
    }
  },
  methods: {
    onImageLoaded (e) {
      let images = e.target.files
      this.imageInput = e.target
      if (!this.uploadedFilesIsImages(images)) {
        this.$appSnackbar.show({
          message: 'Загрузите только изображения',
          color: 'red'
        })
        this.cleatInput()
        return
      }
      if (images.length > 10) {
        images = Array.prototype.slice.call(images, 0, 10)
        this.showImagesLimitMessage()
      }
      if (this.images.length + images.length > 10) {
        this.showImagesLimitMessage()
        this.cleatInput()
        return
      }
      Array.prototype.forEach.call(images, (image, index) => {
        this.images.push({
          image,
          url: URL.createObjectURL(image),
          main: false
        })
        if (index === 0 && !this.hasMainImage()) this.setFirstImageAsMain()
      })
      this.cleatInput()
    },
    cleatInput () {
      this.imageInput.value = ''
    },
    showImagesLimitMessage () {
      this.$appSnackbar.show({
        message: 'К загрузке разрешено не более 10 изображений'
      })
    },
    uploadedFilesIsImages (files) {
      for (let i = 0; i < files.length; i++) {
        if (!/^image\/(jpeg|png)/.test(files[i].type)) return false
      }
      return true
    },
    uploadImagesToStorage () {
      const ref = firebase.storage().ref()
      const imagesRef = ref.child('images/somehash/image.jpg')
      const file = this.images[0]
      imagesRef.put(file.image).then(snapshot => {
        console.log(snapshot)
      })
    },
    setFirstImageAsMain () {
      this.images[0].main = true
    },
    deleteImage (index, e) {
      e.stopPropagation()
      e.preventDefault()
      this.images.splice(index, 1)
      if (!this.hasMainImage() && this.images.length > 0) this.setFirstImageAsMain()
      this.imageInput.value = ''
    },
    hasMainImage () {
      return this.images.find(image => image.main === true)
    },
    setMainImage (index) {
      this.images.map((image, i) => {
        if (image.main && i !== index) {
          image.main = false
        } else if (i === index) {
          image.main = true
        }
      })
    },
    async uploadImageBtn () {
      this.$refs.imageInput.click()
    }
  }
}
</script>

<template>
  <div class="upload-image-container">
    <images-grid
      @deleteImage="deleteImage"
      @setMainImage="setMainImage"
      :imgs="images"
    />

    <v-flex xs12 pl-2 pr-2>
      <v-btn
        color="primary"
        round
        class="white--text"
        block
        @click="uploadImageBtn"
        :loading="btnLoading"
      >
        Загрузить фото
        <v-icon right dark>cloud_upload</v-icon>
      </v-btn>
    </v-flex>
    <v-flex xs12 pl-2 pr-2 class="image-input">
      <input
        ref="imageInput"
        type="file"
        accept=".jpg, .jpeg, .png"
        @change="onImageLoaded"
        multiple
        :rules="required"
      >
    </v-flex>
  </div>
</template>

<style lang="sass" scoped>
.upload-image-container
  width: 100%

.image-input
  position: absolute
  left: -9999px
</style>

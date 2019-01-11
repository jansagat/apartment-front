<script>
import firebase from 'firebase/app'
import 'firebase/storage'

export default {
  name: 'AnnouncementCard',
  props: {
    id: Number,
    announcement: Object
  },
  data () {
    return {
      show: false,
      image: null
    }
  },
  computed: {
    item () {
      return this.announcement
    }
  },
  mounted () {
    if (this.item.images && this.item.images[0]) {
      const storage = firebase.storage()
      const storageRef = storage.ref()
      storageRef.child(this.item.images[0]).getDownloadURL()
        .then((url) => {
          this.image = url
        }).catch(function (error) {
          console.error(error)
        })
    }
  },
  methods: {
    onClickOpenSingleAnnouncement () {
      this.$router.push({
        name: 'AnnouncementSingle',
        params: {
          id: this.id
        }
      })
    }
  }
}
</script>

<template>
  <v-layout row @click="onClickOpenSingleAnnouncement">
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img
          v-if="image"
          :src="image"
          height="190px"
        />
        <v-img
          v-else
          :src="require('@/assets/no-image.jpg')"
          height="190px"
        />

        <v-card-title>
          <div>
            <div class="headline">{{ item.price }} ₸</div>
            <div><span class="">{{ item.floor }} комн., {{ item.area }} м<sup>2</sup>, этаж {{ item.floor }}</span></div>
            <div><span class="grey--text">{{ item.address }}</span></div>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<style>

</style>

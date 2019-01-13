<script>
import 'firebase/storage'

export default {
  name: 'AnnouncementCard',
  props: {
    announcement: Object
  },
  data () {
    return {
      show: false
    }
  },
  computed: {
    item () {
      return this.announcement
    },
    itemsFirstImage () {
      return this.announcement.imagesDownloadLinks[0]
    }
  },
  methods: {
    onClickOpenSingleAnnouncement () {
      this.$router.push({
        name: 'AnnouncementSingle',
        params: {
          announcement: this.announcement,
          id: this.announcement.id
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
          v-if="itemsFirstImage"
          :src="itemsFirstImage"
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

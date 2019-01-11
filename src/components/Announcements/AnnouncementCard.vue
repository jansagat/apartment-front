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
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img
          v-if="image"
          :src="image"
          height="200px"
        >
        </v-img>

        <v-card-title primary-title>
          <div>
            <div class="headline">{{ item.address }}</div>
            <span class="grey--text">1,000 miles of wonder</span>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn
            flat
          >
            Share
          </v-btn>
          <v-btn
            flat
            color="purple"
            @click="onClickOpenSingleAnnouncement"
          >
            Explore
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-slide-y-transition>
          <v-card-text v-show="show">
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<style>

</style>

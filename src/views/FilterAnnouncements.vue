<script>
import { OFFER_TYPE, CITIES, PROPERTY_TYPE, RENT_TIME } from '@/constants/AppConstants'
import firebase from 'firebase/app'

export default {
  name: 'FilterAnnouncements',
  data () {
    return {
      OFFER_TYPE,
      CITIES,
      PROPERTY_TYPE,
      RENT_TIME,
      payload: {
        offerTypeId: 1,
        cityId: 1,
        propertyTypeId: 1,
        fromPrice: null,
        tillPrice: null,
        fromFloor: null,
        tillFloor: null,
        rentTimeId: 1
      }
    }
  },
  computed: {
    isOfferTypeSharing () {
      return this.payload.offerTypeId === 2
    }
  },
  methods: {
    async onClickOpenAnnouncementsListWithParams () {
      const db = firebase.firestore()
      const querySnapshots = await db.collection('announcements')
        .where('cityId', '==', this.payload.cityId)
        .where('offerTypeId', '==', this.payload.offerTypeId)
        .where('propertyTypeId', '==', this.payload.propertyTypeId)
        .where('rentTimeId', '==', this.payload.rentTimeId)
      this.$router.push({
        name: 'AnnouncementsList',
        params: { filteredQuerySnapshots: querySnapshots }
      })
    }
  }
}
</script>

<template>
  <v-layout column fill-height>
    <v-form ref="announcementForm" row wrap>
      <v-layout row wrap>
        <v-flex :class="[isOfferTypeSharing ? 'xs12 pl-2 pr-2 pt-2' : 'xs6 pl-2 pr-1 pt-2']">
          <v-select
            :items="OFFER_TYPE"
            item-text="secondName"
            item-value="id"
            v-model="payload.offerTypeId"
          ></v-select>
        </v-flex>
        <v-flex
          v-if="!isOfferTypeSharing"
          xs6 pt-2 pl-1 pr-2
        >
          <v-select
            :items="PROPERTY_TYPE"
            item-text="name"
            item-value="id"
            v-model="payload.propertyTypeId"
          ></v-select>
        </v-flex>
        <v-flex xs12 pl-2 pr-2>
          <v-select
            label="Период"
            :items="RENT_TIME"
            item-text="name"
            item-value="id"
            v-model="payload.rentTimeId"
          ></v-select>
        </v-flex>
        <v-flex xs12 pl-2 pr-2>
          <v-select
            :items="CITIES"
            label="Город"
            item-text="name"
            item-value="id"
            v-model="payload.cityId"
          ></v-select>
        </v-flex>
      </v-layout>
    </v-form>
    
    <v-flex
      class="button-wrap"
    >
      <div class="pl-2 pr-2 pb-3">
        <v-btn
          block
          round
          color="primary"
          @click="onClickOpenAnnouncementsListWithParams"
        >
          Показать
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<style lang="sass" scoped>
.button-wrap
  display: flex
  justify-content: flex-end
  flex-direction: column
</style>

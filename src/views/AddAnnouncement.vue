<script>
import AppUploadImage from '@/components/_common/AppUploadImage'
import { OFFER_TYPE, CITIES, PROPERTY_TYPE } from '@/constants/AppConstants'
import {
  required,
  number,
  phone
} from '@/utils/validationRules'
import {
  mapActions,
  mapGetters
} from 'vuex'
export default {
  name: 'AddAnnouncement',
  components: { AppUploadImage },
  data () {
    return {
      CITIES,
      PROPERTY_TYPE,
      OFFER_TYPE,
      payload: {
        price: null,
        phone: '+',
        offerTypeId: 1,
        propertyTypeId: 1,
        area: null,
        cityId: 1,
        address: null,
        rooms: null,
        floor: null,
        description: null
      },
      required,
      number,
      phone
    }
  },
  computed: {
    ...mapGetters('user', ['getAuthState'])
  },
  watch: {
    'payload.phone' (value) {
      if (value.length < 2 && !value.startsWith('+')) {
        this.payload.phone = '+' + value
      }
    }
  },
  methods: {
    inputsValidation () {
      return this.$refs.announcementForm.validate()
    },
    sendNewAnnouncement () {
      if (!this.inputsValidation()) return
      this.setNewAnnouncement(this.payload)
      if (this.getAuthState) {
        this.$router.push({ name: 'SendNewAnnouncement' })
      } else {
        this.$router.push({
          name: 'SendSms',
          params: {
            redirectToUrlName: 'SendNewAnnouncement'
          }
        })
      }
    },
    ...mapActions('newAnnouncement', ['setNewAnnouncement'])
  }
}
</script>

<template>
<v-form ref="announcementForm" row wrap>
  <v-layout row wrap>
      <v-flex xs6 pt-2 pl-2 pr-1>
        <v-select
          :items="OFFER_TYPE"
          item-text="name"
          item-value="id"
          :rules="required"
          v-model="payload.offerTypeId"
        ></v-select>
      </v-flex>
      <v-flex xs6 pt-2 pl-1 pr-2>
        <v-select
          :items="PROPERTY_TYPE"
          item-text="name"
          item-value="id"
          :rules="required"
          v-model="payload.propertyTypeId"
        ></v-select>
      </v-flex>
      <v-flex xs6 pl-2 pr-1>
        <v-text-field
          label="Цена ₸"
          type="number"
          :rules="number"
          v-model="payload.price"
        ></v-text-field>
      </v-flex>
      <v-flex xs6 pl-1 pr-2>
        <v-text-field
          label="Площадь м2"
          type="number"
          :rules="number"
          v-model="payload.area"
        ></v-text-field>
      </v-flex>
      <v-flex xs6 pl-2 pr-1>
        <v-select
          :items="CITIES"
          label="Город"
          item-text="name"
          item-value="id"
          :rules="required"
          v-model="payload.cityId"
        ></v-select>
      </v-flex>
      <v-flex xs6 pl-1 pr-2>
        <v-text-field
          label="Адрес"
          :rules="required"
          v-model="payload.address"
        ></v-text-field>
      </v-flex>
      <v-flex xs6 pl-2 pr-1>
        <v-text-field
          label="Количество комнат"
          type="number"
          :rules="number"
          v-model="payload.rooms"
        ></v-text-field>
      </v-flex>
      <v-flex xs6 pl-1 pr-2>
        <v-text-field
          label="Этаж"
          type="number"
          :rules="number"
          v-model="payload.floor"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 pl-2 pr-2>
        <v-textarea
          label="Описание"
          auto-grow
          rows="1"
          :rules="required"
          v-model="payload.description"
        ></v-textarea>
      </v-flex>
      <v-flex xs12 pl-2 pr-2>
        <v-text-field
          label="Номер телефона"
          type="tel"
          :rules="phone"
          maxlength="12"
          v-model="payload.phone"
        ></v-text-field>
      </v-flex>
      <app-upload-image

      />
      <v-flex xs12 pl-2 pr-2>
        <v-btn
          round
          color="primary"
          block
          @click="sendNewAnnouncement"
        >
          Отправить
        </v-btn>
      </v-flex>
  </v-layout>
</v-form>
</template>

<style scoped lang="sass">

</style>

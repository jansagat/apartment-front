<script>
import AppUploadImage from '@/components/_common/AppUploadImage'
import {
  required,
  number,
  phone
} from '@/utils/validationRules'
export default {
  name: 'AddAnnouncement',
  components: { AppUploadImage },
  data () {
    return {
      cities: [
        { id: 1, name: 'Астана' },
        { id: 2, name: 'Алматы' }
      ],
      propertyType: [
        { id: 1, name: 'квартиру' },
        { id: 2, name: 'дом' },
        { id: 3, name: 'другой тип недвиж.' }
      ],
      offerType: [
        { id: 1, name: 'Сдаю' },
        { id: 2, name: 'Продаю' }
      ],
      payload: {
        price: null,
        phone: '+'
      },
      required,
      number,
      phone
    }
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
    uploadToFirestore () {
      if (!this.inputsValidation()) return

      console.log('test')
    }
  }
}
</script>

<template>
<v-form ref="announcementForm" row wrap>
  <v-layout row wrap>
      <v-flex xs6 pt-2 pl-2 pr-1>
        <v-select
          :items="offerType"
          :value="1"
          item-text="name"
          item-value="id"
          :rules="required"
        ></v-select>
      </v-flex>
      <v-flex xs6 pt-2 pl-1 pr-2>
        <v-select
          :items="propertyType"
          :value="1"
          item-text="name"
          item-value="id"
          :rules="required"
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
        ></v-text-field>
      </v-flex>
      <v-flex xs6 pl-2 pr-1>
        <v-select
          :items="cities"
          label="Город"
          :value="1"
          item-text="name"
          item-value="id"
          :rules="required"
        ></v-select>
      </v-flex>
      <v-flex xs6 pl-1 pr-2>
        <v-text-field
          label="Адрес"
          :rules="required"
        ></v-text-field>
      </v-flex>
      <v-flex xs6 pl-2 pr-1>
        <v-text-field
          label="Количество комнат"
          type="number"
          :rules="number"
        ></v-text-field>
      </v-flex>
      <v-flex xs6 pl-1 pr-2>
        <v-text-field
          label="Этаж"
          type="number"
          :rules="number"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 pl-2 pr-2>
        <v-textarea
          label="Описание"
          auto-grow
          rows="1"
          :rules="required"
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
          @click="uploadToFirestore"
        >
          Отправить
        </v-btn>
      </v-flex>
  </v-layout>
</v-form>
</template>

<style scoped lang="sass">

</style>

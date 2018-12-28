<script>
export default {
  name: 'AddAnnouncement',
  data () {
    return {
      cities: [
        { id: 1, name: 'Астана' },
        { id: 2, name: 'Алматы' }
      ],
      propertyType: [
        { id: 1, name: 'Квартира' },
        { id: 2, name: 'Дом' },
        { id: 3, name: 'Другое' }
      ],
      offerType: [
        { id: 1, name: 'Аренда' },
        { id: 2, name: 'Продажа' }
      ]
    }
  }
}
</script>

<template>
  <v-layout row wrap>
    <v-flex xs6 pt-2 pl-2 pr-1>
      <v-select
        :items="propertyType"
        :value="1"
        item-text="name"
        item-value="id"
      ></v-select>
    </v-flex>
    <v-flex xs6 pt-2 pl-1 pr-2>
      <v-select
        :items="offerType"
        :value="1"
        item-text="name"
        item-value="id"
      ></v-select>
    </v-flex>
    <v-flex xs6 pl-2 pr-1>
      <v-text-field
        label="Цена ₸"
      ></v-text-field>
    </v-flex>
    <v-flex xs6 pl-1 pr-2>
      <v-text-field
        label="Площадь м2"
      ></v-text-field>
    </v-flex>
    <v-flex xs6 pl-2 pr-1>
      <v-select
        :items="cities"
        label="Город"
        :value="1"
        item-text="name"
        item-value="id"
      ></v-select>
    </v-flex>
    <v-flex xs6 pl-1 pr-2>
      <v-text-field
        label="Адрес"
      ></v-text-field>
    </v-flex>
    <v-flex xs6 pl-2 pr-1>
      <v-text-field
        label="Количество комнат"
      ></v-text-field>
    </v-flex>
    <v-flex xs6 pl-1 pr-2>
      <v-text-field
        label="Этаж"
      ></v-text-field>
    </v-flex>
    <v-flex xs12 pl-2 pr-2>
      <v-textarea
        label="Описание"
        auto-grow
        rows="1"
      ></v-textarea>
    </v-flex>
    <v-flex xs12 pl-2 pr-2>
      <v-text-field
        label="Фото"
      ></v-text-field>
    </v-flex>
    <v-flex xs12 pl-2 pr-2>
      <v-text-field
        label="Номер телефона"
      ></v-text-field>
    </v-flex>
    <v-flex xs12 pl-2 pr-2>
      <v-btn
        round
        color="primary"
        block
      >
        Отправить
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<style>

</style>

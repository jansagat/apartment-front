<script>
export default {
  name: 'FilterApartments',
  data () {
    return {
      params: {
        id: 0 // example param
      }
    }
  },
  methods: {
    onClickOpenApartmentsListWithParams () {
      this.$router.push({
        name: 'ApartmentsList',
        params: { filterParams: this.params }
      })
    }
  }
}
</script>

<template>
  <v-layout column>
    <v-flex text-xs-center>
      <h1>filter</h1>
    </v-flex>
    <v-flex text-xs-center>
      <div>
        <v-btn
          block
          color="primary"
          @click="onClickOpenApartmentsListWithParams"
        >
          Показать
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<style>

</style>

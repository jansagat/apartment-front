<script>
import ApartmentCard from '@/components/Apartments/ApartmentCard'
import ApartmentsFilterButton from '@/components/Apartments/ApartmentsFilterButton'

export default {
  name: 'ApartmentsList',
  components: {
    ApartmentCard,
    ApartmentsFilterButton
  },
  props: {
    filterParams: Object // TODO filter parameter processing
  },
  data () {
    return {
      count: 5
    }
  },
  mounted () {
    console.log(this.$route.params)
  },
  methods: {
    onClickOpenFilterApartments () {
      this.$router.push({ name: 'FilterApartments' })
    }
  }
}
</script>

<template>
  <div class="apartments-list">
    <h1>ApartmentsList</h1>

    <apartment-card
      v-for="(apartment, index) in count"
      :apartment="apartment"
      :id="index"
      :key="index"
    />

    <apartments-filter-button
      @click.native="onClickOpenFilterApartments"
    />
  </div>
</template>

<style lang="sass" scoped>
.apartments-list
  padding-bottom: 90px
</style>

<script>
export default {
  name: 'SignIn',
  data () {
    return {
      confirmCode: null
    }
  },
  methods: {
    signIn () {
      this.$emit('signIn')
    },
    back () {
      this.$router.push({ name: 'SendSms' })
    }
  }
}
</script>

<template>
  <div>
    <app-logo/>
    <v-text-field
      label="Код подтверждения"
      v-model="confirmCode"
      type="tel"
      :messages="'sms sent text'"
    ></v-text-field>
    <v-btn
      block
      depressed
      color="yellow"
      @click="signIn"
    >
      NEXT
    </v-btn>
  </div>
</template>

<style scoped>

</style>

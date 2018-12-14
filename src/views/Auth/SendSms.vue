<script>
export default {
  name: 'SendSms',
  data () {
    return {
      phoneNumber: null,
      smsSent: false,
      phoneDisabled: false
    }
  },
  methods: {
    sendSMS () {
      this.$router.push({ name: 'SignIn' })
    }
  }
}
</script>

<template>
 <div>
   <app-logo/>
   <v-text-field
     label="Номер телефона"
     v-model="phoneNumber"
     type="tel"
     :disabled="phoneDisabled"
   ></v-text-field>
   <v-btn
     block
     depressed
     color="yellow"
     @click="sendSMS"
     v-show="!smsSent"
   >
     NEXT
   </v-btn>
 </div>
</template>

<style scoped>

</style>

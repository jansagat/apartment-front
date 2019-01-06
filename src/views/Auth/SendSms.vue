<script>
import firebase from 'firebase/app'
import { mapGetters } from 'vuex'

export default {
  name: 'SendSms',
  props: {
    redirectToUrlName: String
  },
  data () {
    return {
      phoneNumber: null,
      smsSent: false,
      phoneDisabled: false
    }
  },
  computed: {
    ...mapGetters('user', ['getAuthState'])
  },
  beforeMount () {
    if (this.getAuthState) this.$router.push({ name: 'AnnouncementsList' })
  },
  methods: {
    async sendSMS () {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(this.$refs.sendSmsButton.$el, {
        'size': 'invisible'
      })
      const appVerifier = window.recaptchaVerifier
      try {
        window.confirmationResult = await firebase.auth().signInWithPhoneNumber(this.phoneNumber, appVerifier)
        this.$router.push({
          name: 'SignIn',
          params: {
            redirectToUrlName: this.redirectToUrlName
          }
        })
      } catch (e) {
        console.error(e)
      }
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
     ref="sendSmsButton"
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

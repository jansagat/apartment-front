<script>
import firebase from 'firebase/app'
import { mapGetters } from 'vuex'
import { phone } from '@/utils/validationRules'

export default {
  name: 'SendSms',
  props: {
    redirectToUrlName: String
  },
  data () {
    return {
      phoneNumber: '+',
      smsSent: false,
      phoneDisabled: false,
      loading: false,
      phone
    }
  },
  computed: {
    ...mapGetters('user', ['getAuthState'])
  },
  watch: {
    phoneNumber (value) {
      if (value.length < 2 && !value.startsWith('+')) {
        this.phoneNumber = '+' + value
      }
    }
  },
  beforeMount () {
    if (this.getAuthState) this.$router.push({ name: 'AnnouncementsList' })
    this.$appToolbar.setTitle('Авторизация')
    document.addEventListener('click', this.recaptchaClosed)
  },
  destroyed () {
    document.removeEventListener('click', this.recaptchaClosed)
  },
  methods: {
    recaptchaClosed (e) {
      if (this.loading && !e.target.className.includes('v-btn')) this.loading = false
    },
    formValidation () {
      return this.$refs.phoneForm.validate()
    },
    addRecaptchaContainer () {
      this.$refs.recaptcha.innerHTML = "<div id='recaptcha-container'></div>"
    },
    async sendSMS () {
      if (!this.formValidation()) return
      this.addRecaptchaContainer()
      window.recaptchaVerifier = await new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible'
      })
      try {
        this.loading = true
        window.confirmationResult = await firebase.auth().signInWithPhoneNumber(this.phoneNumber, window.recaptchaVerifier)
        this.$router.push({
          name: 'SignIn',
          params: {
            redirectToUrlName: this.redirectToUrlName
          }
        })
      } catch (e) {
        console.error(e)
        this.$appSnackbar.showError(e)
      }
      this.loading = false
    }
  }
}
</script>

<template>
 <v-form
   ref="phoneForm"
 >
   <app-logo/>
   <v-text-field
     label="Номер телефона"
     v-model="phoneNumber"
     type="tel"
     :disabled="phoneDisabled"
     maxlength="12"
     :rules="phone"
     validate-on-blur
   ></v-text-field>
   <v-btn
     block
     depressed
     round
     color="primary"
     @click="sendSMS"
     v-show="!smsSent"
     :loading="loading"
   >
     Дальше
   </v-btn>
   <div ref="recaptcha"></div>
 </v-form>
</template>

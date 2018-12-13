<script>
import CountdownTimer from '@/utils/CountdownTimer'
const RESEND_SMS_TIME_MIN = 1

export default {
  name: 'AuthScreen',
  data () {
    return {
      phoneNumber: null,
      confirmCode: null,
      smsSent: false,
      phoneDisabled: false,
      timer: '',
      CountdownTimer: null,
      expiredTime: null,
      signInShown: false
    }
  },
  computed: {
    smsSentText () {
      return `Отправить SMS через: ${this.timer}`
    }
  },
  watch: {
    expiredTime (value) {
      if (value) {
        this.smsSent = true
        this.phoneDisabled = false
      }
    }
  },
  mounted () {
    this.CountdownTimer = new CountdownTimer(RESEND_SMS_TIME_MIN)
    this.CountdownTimer.subscribe(this.notifyTimer)
  },
  destroyed () {
    this.CountdownTimer.unsubscribe(this.notifyTimer)
  },
  methods: {
    notifyTimer ({ minutes, seconds, expiredTime }) {
      this.timer = minutes + ':' + seconds
      this.expiredTime = expiredTime
    },
    signIn () {

    },
    sendSMS () {
      this.CountdownTimer.runCountdown()

      // TODO validation
      this.smsSent = true
      this.phoneDisabled = true
      this.signInShown = true
    }
  }
}
</script>

<template>
  <v-container fill-height>
    <v-layout align-center>
      <v-flex>
        <v-img
          :src="require('@/assets/logo.png')"
          contain
          max-height="70"
        ></v-img>
        <v-text-field
          label="Номер телефона"
          v-model="phoneNumber"
          type="tel"
          :disabled="phoneDisabled"
        ></v-text-field>
        <v-text-field
          v-show="smsSent"
          label="Код подтверждения"
          v-model="confirmCode"
          type="tel"
          :messages="smsSentText"
        ></v-text-field>
        <v-btn
          block
          depressed
          color="yellow"
          @click="signIn"
          v-show="signInShown"
        >
          SIGN IN
        </v-btn>
        <v-btn
          block
          depressed
          color="yellow"
          @click="sendSMS"
          v-show="!smsSent"
        >
          SEND SMS
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style scoped>

</style>

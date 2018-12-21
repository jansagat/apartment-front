<script>
import CountdownTimer from '@/utils/CountdownTimer'
const COUNTDOWN_TIME_IN_MIN = 1

export default {
  name: 'SignIn',
  data () {
    return {
      confirmCode: null,
      countdownTimer: null,
      message: null,
      isTimerExpired: false
    }
  },
  mounted () {
    this.initCountdownTimer()
  },
  methods: {
    initCountdownTimer () {
      this.countdownTimer = new CountdownTimer(COUNTDOWN_TIME_IN_MIN)
      this.countdownTimer.subscribe(this.timer)
      this.countdownTimer.runCountdown()
    },
    async signIn () {
      try {
        const res = await window.confirmationResult.confirm(this.confirmCode)
        let user = res.user
      } catch (e) {
        console.error(e)
      }
    },
    goBack () {
      this.$router.push({ name: 'SendSms' })
    },
    timer (data) {
      this.isTimerExpired = data.isTimerExpired
      if (this.isTimerExpired) {
        this.message = null
      } else {
        this.message = `Отправить код повторно через: ${data.minutes}:${data.seconds}`
      }
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
      :messages="message"
    ></v-text-field>
    <v-btn
      block
      depressed
      color="yellow"
      @click="signIn"
    >
      NEXT
    </v-btn>
    <v-btn
      block
      depressed
      color="yellow"
      @click="goBack"
      v-show="isTimerExpired"
    >
      BACK
    </v-btn>
  </div>
</template>

<style scoped>

</style>

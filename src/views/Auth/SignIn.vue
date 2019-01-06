<script>
import CountdownTimer from '@/utils/CountdownTimer'
const COUNTDOWN_TIME_IN_MIN = 1
const DEFAULT_NEXT_ROUTE_NAME = 'AnnouncementsList'

export default {
  name: 'SignIn',
  props: {
    redirectToUrlName: String
  },
  data () {
    return {
      confirmCode: null,
      countdownTimer: null,
      message: null,
      isTimerExpired: false
    }
  },
  mounted () {
    if (!window.confirmationResult) {
      this.$router.replace({ name: 'SendSms' })
    }
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
        await window.confirmationResult.confirm(this.confirmCode)
        const nextRouteName = this.redirectToUrlName ? this.redirectToUrlName : DEFAULT_NEXT_ROUTE_NAME
        this.$router.replace({ name: nextRouteName })
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

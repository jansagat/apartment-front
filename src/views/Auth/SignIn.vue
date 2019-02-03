<script>
import CountdownTimer from '@/utils/CountdownTimer'
import { required } from '@/utils/validationRules'

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
      message: '',
      isTimerExpired: false,
      required
    }
  },
  mounted () {
    if (!window.confirmationResult) {
      this.$router.replace({ name: 'SendSms' })
    }
    this.initCountdownTimer()
  },
  methods: {
    formValidation () {
      return this.$refs.codeForm.validate()
    },
    initCountdownTimer () {
      this.countdownTimer = new CountdownTimer(COUNTDOWN_TIME_IN_MIN)
      this.countdownTimer.subscribe(this.timer)
      this.countdownTimer.runCountdown()
    },
    async signIn () {
      if (!this.formValidation()) return
      try {
        await window.confirmationResult.confirm(this.confirmCode)
        const nextRouteName = this.redirectToUrlName ? this.redirectToUrlName : DEFAULT_NEXT_ROUTE_NAME
        this.$router.replace({ name: nextRouteName })
      } catch (e) {
        console.error(e)
      }
    },
    goBack () {
      this.$router.replace({ name: 'SendSms' })
    },
    timer (data) {
      this.isTimerExpired = data.isTimerExpired
      if (this.isTimerExpired) {
        this.message = ''
      } else {
        this.message = `Отправить код повторно через: ${data.minutes}:${data.seconds}`
      }
    }
  }
}
</script>

<template>
  <v-form ref="codeForm">
    <app-logo/>
    <v-text-field
      label="Код подтверждения"
      v-model="confirmCode"
      type="tel"
      :messages="message"
      :rules="required"
      validate-on-blur
    ></v-text-field>
    <v-btn
      block
      depressed
      round
      color="primary"
      @click="signIn"
      class="mt-3"
    >
      Дальше
    </v-btn>
    <v-btn
      block
      depressed
      round
      color="primary"
      @click="goBack"
      v-show="isTimerExpired"
      class="mt-2"
    >
      Назад
    </v-btn>
  </v-form>
</template>

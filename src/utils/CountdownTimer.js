import Observable from './Observable'
import AppConstants from '@/constants/AppConstants'
const COUNTDOWN_INTERVAL = 100

class CountdownTimer extends Observable {
  constructor (minutes) {
    super()
    this.milliseconds = this.minutesToMs(minutes)
    this.endTime = this.computeEndTime(this.milliseconds)
  }

  minutesToMs (minutes) {
    return minutes * AppConstants.MIN_IN_SEC * AppConstants.SEC_IN_MS
  }

  startTime () {
    return new Date().getTime()
  }

  computeEndTime (milliseconds) {
    return new Date(this.startTime() + milliseconds)
  }

  runCountdown () {
    let interval = setInterval(() => {
      this.setIntervalHandler(interval)
    }, COUNTDOWN_INTERVAL)
  }

  setIntervalHandler (interval) {
    let duration = this.endTime - this.startTime()
    let expiredTime = false

    let minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60))
    let seconds = Math.floor((duration % (1000 * 60)) / 1000)

    if (minutes >= 0 && seconds >= 0) {
      if (seconds < 10) {
        seconds = this._addLeadingZero(seconds)
      }
      this.notify({ minutes, seconds, expiredTime })
    } else {
      expiredTime = true
      this.notify({ minutes: '0', seconds: '00', expiredTime })
      clearInterval(interval)
    }
  }

  _addLeadingZero (number) {
    return '0' + number
  }
}

export default CountdownTimer

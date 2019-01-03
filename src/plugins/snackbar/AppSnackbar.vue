<script>
export default {
  name: 'AppSnackbar',
  data () {
    return {
      snackbar: false,
      verticalPos: 'bottom',
      horizontalPos: 'right',
      multiLine: false,
      timeout: 6000,
      snackbarMessage: '',
      snackbarColor: 'info',
      closeBtnColor: 'white'
    }
  },
  methods: {
    show (options) {
      this.snackbarMessage = options.message
      this.snackbarColor = options.color
      if (options.timeout) {
        this.timeout = options.timeout
      }
      this.snackbar = true
    },
    hide () {
      this.snackbar = false
    }
  },
  mounted () {
    this.$appSnackbar._bind(this)
  },
  beforeDestroy () {
    this.$appSnackbar._unbind(this)
  }
}
</script>

<template>
  <v-snackbar
    v-model="snackbar"
    :top="verticalPos === 'top'"
    :bottom="verticalPos === 'bottom'"
    :left="horizontalPos === 'left'"
    :right="horizontalPos === 'right'"
    :multi-line="multiLine"
    :timeout="timeout"
    :color="snackbarColor"
  >
    {{ snackbarMessage }}
    <v-btn
      :color="closeBtnColor"
      flat
      @click="snackbar = false"
    >
      OK
    </v-btn>
  </v-snackbar>
</template>

<style scoped>

</style>

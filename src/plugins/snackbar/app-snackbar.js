export default {
  install (Vue) {
    Vue.prototype.$appSnackbar = {
      _bind (component) {
        if (this.component && this.component !== component) {
          throw new Error('App snackbar already bound')
        }
        this.component = component
      },
      _unbind (component) {
        if (this.component === component) {
          this.component = null
        } else {
          throw new Error('Invalid component supplied in unbind() call')
        }
      },
      show (options) {
        if (this.component) {
          this.component.show(options)
        } else {
          return Promise.reject(new Error('AppSnackbar component not bound'))
        }
      },
      showError (error) {
        if (this.component) {
          console.error(error)
          this.component.show({
            message: `Ошибка: ${error.message}`,
            color: 'error',
            timeout: 3000
          })
        } else {
          return Promise.reject(new Error('AppSnackbar component not bound'))
        }
      },
      hide () {
        if (this.component) {
          this.component.hide()
        } else {
          return Promise.reject(new Error('AppSnackbar component not bound'))
        }
      }
    }
  }
}

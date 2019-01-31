export default {
  install (Vue) {
    Vue.prototype.$appToolbar = {
      _bind (component) {
        if (this.component && this.component !== component) {
          throw new Error('App toolbar already bound')
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
      setTitle (title) {
        this.component.setTitle(title)
      }
    }
  }
}

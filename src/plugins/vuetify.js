import Vue from 'vue'
import Vuetify, {
  VApp, // required
  VNavigationDrawer,
  VFooter,
  VToolbar,
  VIcon,
  VBtn,
  VImg
} from 'vuetify/lib'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/src/stylus/app.styl'
import ru from 'vuetify/es5/locale/ru'
import transitions from 'vuetify/lib/components/transitions'

Vue.use(Vuetify, {
  iconfont: 'md',
  lang: {
    locales: { ru },
    current: 'ru'
  },
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VToolbar,
    VIcon,
    transitions,
    VBtn,
    VImg
  }
})

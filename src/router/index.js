import Vue from 'vue'
import Router from 'vue-router'
import HomeScreen from '@/views/HomeScreen'
import AnnouncementsList from '@/views/Announcements/AnnouncementsList'
import AnnouncementSingle from '@/views/Announcements/AnnouncementSingle'
import FilterAnnouncements from '@/views/FilterAnnouncements'
import AddAnnouncement from '@/views/AddAnnouncement'
import ModerateAnnouncements from '@/views/ModerateAnnouncements'
import AuthScreen from '@/views/AuthScreen'
import SendSms from '@/views/Auth/SendSms'
import SignIn from '@/views/Auth/SignIn'
import store from '@/store'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: '',
    component: HomeScreen,
    children: [
      {
        path: '',
        name: 'AnnouncementsList',
        component: AnnouncementsList,
        props: true
      },
      {
        path: 'announcement/:id',
        name: 'AnnouncementSingle',
        component: AnnouncementSingle,
        props: (route) => ({ id: route.params.id })
      },
      {
        path: 'filter-announcements',
        name: 'FilterAnnouncements',
        component: FilterAnnouncements
      },
      {
        path: 'add-announcement',
        name: 'AddAnnouncement',
        component: AddAnnouncement,
        meta: {
          authRequired: true
        }
      },
      {
        path: 'moderate-announcements',
        name: 'ModerateAnnouncements',
        component: ModerateAnnouncements,
        meta: {
          authRequired: true
        }
      },
      {
        path: 'auth',
        component: AuthScreen,
        children: [
          {
            path: '',
            name: 'SendSms',
            component: SendSms
          },
          {
            path: 'sign-in',
            name: 'SignIn',
            component: SignIn
          }
        ]
      }
    ]
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeResolve((to, from, next) => {
  let isUserSignedIn = store.getters['user/getAuthState']
  if (to.meta.authRequired) {
    if (isUserSignedIn) {
      next()
    } else {
      next('/auth')
    }
  } else {
    next()
  }
})

export default router

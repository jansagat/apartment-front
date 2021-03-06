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
import SendNewAnnouncement from '@/views/SendNewAnnouncement'
import store from '@/store'
import AnnouncementSingleImage from '../views/Announcements/AnnouncementSingleImages'
import AnnouncementSingleFull from '../views/Announcements/AnnouncementSingleFull'

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
        component: AnnouncementSingle,
        children: [
          {
            path: '',
            name: 'AnnouncementSingleFull',
            component: AnnouncementSingleFull,
            props: true
          },
          {
            path: 'image',
            name: 'AnnouncementSingleImage',
            component: AnnouncementSingleImage,
            props: true
          }
        ]
      },
      {
        path: 'filter-announcements',
        name: 'FilterAnnouncements',
        component: FilterAnnouncements
      },
      {
        path: 'add-announcement',
        name: 'AddAnnouncement',
        component: AddAnnouncement
      },
      {
        path: 'send-new-announcement',
        name: 'SendNewAnnouncement',
        component: SendNewAnnouncement,
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
            component: SendSms,
            props: true
          },
          {
            path: 'sign-in',
            name: 'SignIn',
            component: SignIn,
            props: true
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

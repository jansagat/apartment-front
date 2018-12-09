import Vue from 'vue'
import Router from 'vue-router'
import HomeScreen from '@/views/HomeScreen'
import ApartmentsList from '@/views/Apartments/ApartmentsList'
import ApartmentSingle from '@/views/Apartments/ApartmentSingle'
import FilterApartments from '@/views/FilterApartments'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'HomeScreen',
    component: HomeScreen,
    children: [
      {
        path: '',
        name: 'ApartmentsList',
        component: ApartmentsList,
        props: true
      },
      {
        path: 'apartment/:id',
        name: 'ApartmentSingle',
        component: ApartmentSingle,
        props: (route) => ({ id: route.params.id })
      },
      {
        path: 'filter-apartments',
        name: 'FilterApartments',
        component: FilterApartments
      }
    ]
  }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

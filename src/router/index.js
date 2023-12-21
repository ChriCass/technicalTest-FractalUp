// En tu archivo de configuración de Vue Router
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import panelCountriesComponentVue from '@/modules/Contries/components/panelCountriesComponent.vue'
import CountryLayoutVue from '@/modules/Contries/layouts/CountryLayout.vue'
import FirstView from '@/modules/Contries/components/firstView.vue'
import SecondView from '@/modules/Contries/components/SecondView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/CountryApp',
    name: 'countryApp',
    component: CountryLayoutVue,
    children: [
      {
        path: '',
        name: 'countryAppDefault',
        component: panelCountriesComponentVue 
      },
      {
        path: 'firstview',
        name: 'firstview',
        component: FirstView
      },
      {
        path: 'secondview',
        name: 'secondview',
        component: SecondView
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

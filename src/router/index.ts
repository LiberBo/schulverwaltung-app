import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/Kalender'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/Wallet'
      },
      {
        path: 'Kalender',
        component: () => import('@/views/KalenderPage.vue')
      },
      {
        path: 'Raumverwaltung',
        component: () => import('@/views/RaumverwaltungPage.vue')
      },
      {
        path: 'Verwaltung',
        component: () => import('@/views/VerwaltungPage.vue')
      }

      /*
      {
        path: 'Wallet',
        component: () => import('@/views/WalletPage.vue'),
        children: [
          {
            path: 'Geldeinzahlung',
            component: () => import('@/views/GeldeinzahlungPage.vue')
          },
        ]
      }, 
      {
        path: 'Kalender&Raumverwaltung',
        component: () => import('@/views/Kalender&RaumverwaltungPage.vue')
      },
      {
        path: 'Prüfungsleistung',
        component: () => import('@/views/PrüfungsleistungPage.vue')
      },
      
*/
    ]
  },/*
  {
    path:'/Geldeinzahlung',
    component: () => import('@/views/GeldeinzahlungPage.vue')
  },
  {
    path:'/Kalender',
    component: () => import('@/views/KalenderPage.vue')
  },
  {
    path:'/Raumverwaltung',
    component: () => import('@/views/RaumverwaltungPage.vue')
  }, */
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

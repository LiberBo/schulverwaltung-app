import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/Anmeldung'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/Anmeldung'
      },
      {
        path: 'Kalender',
        component: () => import('@/views/KalenderPage.vue')
      },
      {
        path: 'Verwaltung/Raumverwaltung',
        component: () => import('@/components/Raumverwaltung.vue')
      },
      {
        path: 'Verwaltung/Userverwaltung',
        component: () => import('@/components/Userverwaltung.vue')
      },
      {
        path: 'Verwaltung/Lehrverwaltung',
        component: () => import('@/components/Lehrverwaltung.vue')
      },
      {
        path: 'Verwaltung',
        component: () => import('@/views/VerwaltungPage.vue'),
      },/*
      {
        path: 'Raumverwaltung',
        component: () => import('@/components/Raumverwaltung.vue')
      }, */
      {
        path: 'Anmeldung',
        component: () => import('@/views/AnmeldungPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

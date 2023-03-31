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
        path: 'Assignments',
        component: () => import('@/views/AssignmentPage.vue'),
      },
      {
        path: 'Verwaltung/overview',
        component: () => import('@/views/VerwaltungPage.vue'),
      },
      {
        path: 'Verwaltung/Raumverwaltung',
        component: () => import('@/components/Raumverwaltung.vue')
      },/*
      {
        path: 'Verwaltung/Raumverwaltung/map',
        component: () => import('@/components/MapPage.vue')
      },      */
      {
        path: 'Verwaltung/Userverwaltung',
        component: () => import('@/components/Userverwaltung.vue')
      },
      {
        path: 'Verwaltung/Lehrverwaltung',
        component: () => import('@/components/Lehrverwaltung.vue')
      },
      {
        path: 'Verwaltung/Lehrverwaltung/Semesterverwaltung',
        component: () => import('@/components/Lehrverwaltung/Semesterverwaltung/SemesterVerwaltung.vue')
      },
      {
        path: 'Verwaltung/Lehrverwaltung/Modulverwaltung',
        component: () => import('@/components/Lehrverwaltung/Modulverwaltung/ModulVerwaltung.vue')
      },
      {
        path: 'Verwaltung/Lehrverwaltung/Studiengangverwaltung',
        component: () => import('@/components/Lehrverwaltung/Studiengangverwaltung/StudiengangVerwaltung.vue')
      },
      /*
      {
        path: 'Raumverwaltung',
        component: () => import('@/components/Raumverwaltung.vue')
      }, */
      {
        path: 'Anmeldung',
        component: () => import('@/views/AnmeldungPage.vue')
      },
      {
        path: 'Accountverwaltung',
        component: () => import('@/views/AccountAnzeigen.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/Wallet'
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
        path: 'Wallet',
        component: () => import('@/views/WalletPage.vue'), /*
        children: [
          {
            path: 'Geldeinzahlung',
            component: () => import('@/views/GeldeinzahlungPage.vue')
          },
        ]*/
      },
      {
        path: 'Verwaltung',
        component: () => import('@/views/VerwaltungPage.vue')
      },
      {
        path: 'Prüfungsleistung',
        component: () => import('@/views/PrüfungsleistungPage.vue')
      }
    ]
  },
  {
    path:'/Geldeinzahlung',
    component: () => import('@/views/GeldeinzahlungPage.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

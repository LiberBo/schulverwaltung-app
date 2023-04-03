import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import jwt_decode from "jwt-decode";

interface UserAuthorization {
  authorization: string;
}



const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/Anmeldung'
  },
  {
    path: '/Anmeldung',
    component: () => import('@/views/AnmeldungPage.vue')
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/Assignments'
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
        meta: { requiresAuth: true },
      },
      {
        path: 'Verwaltung/Raumverwaltung',
        component: () => import('@/components/Raumverwaltung.vue'),
        meta: { requiresAuth: true },
      },/*
      {
        path: 'Verwaltung/Raumverwaltung/map',
        component: () => import('@/components/MapPage.vue')
      },      */
      {
        path: 'Verwaltung/Userverwaltung',
        component: () => import('@/components/Userverwaltung.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'Verwaltung/Lehrverwaltung',
        component: () => import('@/components/Lehrverwaltung.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'Verwaltung/Lehrverwaltung/Semesterverwaltung',
        component: () => import('@/components/Lehrverwaltung/Semesterverwaltung/SemesterVerwaltung.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'Verwaltung/Lehrverwaltung/Modulverwaltung',
        component: () => import('@/components/Lehrverwaltung/Modulverwaltung/ModulVerwaltung.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'Verwaltung/Lehrverwaltung/Studiengangverwaltung',
        component: () => import('@/components/Lehrverwaltung/Studiengangverwaltung/StudiengangVerwaltung.vue'),
        meta: { requiresAuth: true },
      },
      /*
      {
        path: 'Raumverwaltung',
        component: () => import('@/components/Raumverwaltung.vue')
      }, */
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

function isAdminOrProfessor(user) {
  return user.authorization === 'Administrator' || user.authorization === 'Professor';
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const currentUser: UserAuthorization = {
        authorization: decodedToken.authorization,
      };
      
      if (isAdminOrProfessor(currentUser)) {
        next();
      } else {
        next('/tabs/Anmeldung');
      }
    } else {
      next('/tabs/Anmeldung');
    }
  } else {
    next();
  }
});



export default router

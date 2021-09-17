import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/HomePage.vue') },
      { path: '/series/:id', component: () => import('src/pages/Series.vue') },
    ],
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Auth.vue') },
      { path: '/auth/login', component: () => import('src/pages/Login.vue') },
      {
        path: '/auth/register',
        component: () => import('src/pages/Register.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;

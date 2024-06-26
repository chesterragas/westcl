import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
        { path: '', component: () => import('pages/navigation/Home.vue') },
        { path: 'tenant/', component: () => import('pages/navigation/Tenant.vue') },
        { path: 'tenantdetails/', component: () => import('pages/navigation/TenantDetails.vue') },

      
      ],
  },
  {
    path: '/login',
    component: () => import('pages/navigation/Login.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;

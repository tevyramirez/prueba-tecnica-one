import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/audit',
      name: 'audit',
      component: () => import('../views/AuditView.vue'),}

  ],
})

router.beforeEach((to, from, next) => {
  if (to.path === '/' || to.path === '/audit') {
    next();
  } else {
    next('/');
  }
})

export default router

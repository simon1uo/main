import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/test',
      name: 'Test',
      component: () => import('@/views/Test.vue'),
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
    },
  ],
})

export default router

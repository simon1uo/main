import { App } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { setupRouterGuard } from './guard'
import { basicRoutes as routes } from './routes'

const isHash = import.meta.env.VITE_USE_HASH === 'true'
export const router = createRouter({
  history: isHash ? createWebHashHistory('/') : createWebHistory('/'),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export function setupRouter(app: App) {
  app.use(router)
  setupRouterGuard(router)
}

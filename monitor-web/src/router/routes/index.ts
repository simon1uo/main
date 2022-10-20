import { RouteModule, RoutesType, RouteType } from '~/types/router'

export const basicRoutes: RoutesType = [
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    isHidden: true,
    meta: {
      title: '登录',
    },
  },
  {
    name: 'Dashboard',
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/preview',
    meta: {
      order: 0,
      title: '控制台',
      icon: 'mdi:home',
    },
    children: [
      {
        name: 'Preview',
        path: 'preview',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '概况分析',
          icon: 'mdi:magnify-expand',
        },
      },
    ],
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/error/404.vue'),
    isHidden: true,
  },
]

export const NOT_FOUND_ROUTE: RouteType = {
  name: 'NotFound',
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  isHidden: true,
}

const modules = import.meta.glob('@/views/**/route.ts', { eager: true }) as RouteModule
const asyncRoutes: RoutesType = []
Object.keys(modules).forEach(key => {
  asyncRoutes.push(modules[key].default)
})
export { asyncRoutes }

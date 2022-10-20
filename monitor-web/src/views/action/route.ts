export default {
  name: 'Action',
  path: '/action',
  component: () => import('@/layout/index.vue'),
  redirect: '/action/hash',
  meta: {
    icon: 'material-symbols:move-down',
    order: 4,
    title: '行为监控',
  },
  children: [
    {
      name: 'hash',
      path: 'hash',
      component: () => import('./hash/index.vue'),
      meta: { icon: 'material-symbols:area-chart', title: 'hash 路由监控' },
    },
    {
      name: 'history',
      path: 'history',
      component: () => import('./history/index.vue'),
      meta: { icon: 'material-symbols:area-chart', title: 'hisotry 路由监控' },
    },
  ],
}

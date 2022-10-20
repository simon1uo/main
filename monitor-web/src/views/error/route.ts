export default {
  name: 'Error',
  path: '/error',
  component: () => import('@/layout/index.vue'),
  redirect: '/error',
  meta: {
    icon: 'material-symbols:warning',
    order: 2,
    title: '异常监控',
  },
  children: [
    {
      name: 'error',
      path: 'monitor',
      component: () => import('./index.vue'),
      meta: {
        icon: 'material-symbols:warning',
        title: '异常监控',
      },
    },
  ],
}

export default {
  name: 'Performance',
  path: '/performance',
  component: () => import('@/layout/index.vue'),
  redirect: '/performance',
  meta: {
    icon: 'material-symbols:area-chart',
    order: 3,
    title: '性能监控',
  },
  children: [
    {
      name: 'performance',
      path: 'monitor',
      component: () => import('./index.vue'),
      meta: { icon: 'material-symbols:area-chart', title: '性能监控' },
    },
  ],
}

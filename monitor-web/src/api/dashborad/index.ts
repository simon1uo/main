import request from '@/utils/http'

export default {
  getDashboardData: () => request.get('/dashboard/console'),
  getPreviewFlowData: () => request.get('/preview/flow'),
  getPreviewFlowTrendencyData: () => request.get('/preview/trendency'),
}

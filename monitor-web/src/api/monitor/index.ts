import request from '@/utils/http'

export default {
  getJsErrorData: () => request.get('/monitor/jserror'),
  getPerformanceData: () => request.get('/monitor/performance'),
}

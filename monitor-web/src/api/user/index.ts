import request from '@/utils/http'

export default {
  getUser: () => request.get('/user'),
  login: (data: any) => request.post('/auth/login', data),
  refreshToken: () => request.post('/auth/refreshToken'),
}

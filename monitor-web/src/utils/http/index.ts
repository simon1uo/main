import axios from 'axios'
import { reqReject, reqResolve, resRejct, resResolve } from './interceptors'

export function createAxios(options = {}) {
  const defaultOptions = {
    baseURL: import.meta.env.VITE_BASE_API,
    timeout: 12000,
  }
  const service = axios.create({
    ...defaultOptions,
    ...options,
  })

  service.interceptors.request.use(reqResolve, reqReject)
  service.interceptors.response.use(resResolve, resRejct)

  return service
}

export default createAxios()

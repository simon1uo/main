import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { getToken } from '@/utils/auth/token'
import { isWithoutToken } from './helpers'
import { isNullOrUndef } from '../common'

export function reqResolve(config: AxiosRequestConfig) {
  // add timestamps to get request
  if (config.method === 'get') {
    config.params = { ...config.params, t: new Date() }
  }

  // without require token
  if (isWithoutToken(config)) {
    return config
  }

  const token = getToken()
  if (!token) {
    // to Login

    return Promise.reject(new Error('未登录'))
  }

  const Authorization = config.headers?.Authorization || `Bearer ${token}`
  if (config.headers) config.headers.Authorization = config.headers.Authorization || `Bearer ${token}`
  else config.headers = { Authorization }

  return config
}

export function reqReject(error: AxiosError) {
  return Promise.reject(error)
}

export function resResolve(response: AxiosResponse) {
  return response?.data
}

export function resRejct(error: AxiosError) {
  let { code, message }: any = error.response?.data || {}

  if (isNullOrUndef(code)) {
    code = -1
    message = '接口异常！'
  } else {
    switch (code) {
      case 400:
        message = message || ''
        break
      case 401:
        message = message || '登录已过期'
        break
      case 403:
        message = message || '没有权限'
        break
      case 404:
        message = message || '资源或接口不存在'
        break
      default:
        message = message || '未知异常'
        break
    }
  }
  console.error(`[${code}] ${error}`)
  return Promise.resolve({ code, message, error })
}

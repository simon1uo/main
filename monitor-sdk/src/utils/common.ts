import { httpMetrics } from '@types'
import axios from 'axios'

/**
 * 获取当前的时间戳
 * @param data data.hms === true 是 hh:mm:ss 格式，否则为毫秒格式
 * @returns hh:mm:ss 格式 或者 毫秒格式
 */
export function nowTime(data: {
  hms?: boolean
  time?: number
}): number | string {
  const { hms, time } = data
  if (hms === true) {
    const newTime = time ? new Date(time) : new Date()
    const hour = newTime.getHours()
    const minute = newTime.getMinutes()
    const second = newTime.getSeconds()
    const timer = hour + ':' + minute + ':' + second + ' '
    return timer
  }
  return new Date().getTime()
}

/**
 * 计算用时
 * @param metrics
 */
export function calcDuration(metrics: httpMetrics) {
  metrics.duration = metrics.responseTime - metrics.requestTime
}

// 判断白屏的时机
export function isLoad(callback) {
  if (document.readyState === 'complete') {
    callback()
  } else {
    window.addEventListener('load', callback)
  }
}

// todo
const LoadSourceMap = (url) => axios.get(url)

import { lazyReport } from '@monitor/report'
import { getBasicIndicator } from './basicIndicator'
import { getDomContentLoadIndicator } from './domContentLoadIndicator'
import { getLoadIndicator } from './loadIndicator'
import { getResourceIndicator } from './resourceIndicator'

export function getPerformance(): void {
  console.log('%c%s', 'font-size: 24px; color: green', '开始监控网页性能')

  window.addEventListener(
    'load',
    () => {
      // getPv();
    },
    true
  )

  function getPv() {
    const pvLog = {
      type: 'pv',
      startTime: performance.now(),
      pageURL: window.location.href,
      referrer: document.referrer,
      uuid: 0
    }
    console.log('%c%s%o', 'color: green', '获取 pv', pvLog)
    lazyReport('/pv', pvLog)
  }

  console.log(
    '%c%s%o',
    'color: green',
    '获取页面基本性能指标',
    getBasicIndicator()
  )
  console.log(
    '%c%s%o',
    'color: green',
    '获取页面资源指标',
    getResourceIndicator()
  )
  console.log('%c%s%o', 'color: green', '获取页面加载指标', getLoadIndicator())
  console.log(
    '%c%s%o',
    'color: green',
    '获取页面节点加载指标',
    getDomContentLoadIndicator()
  )
}

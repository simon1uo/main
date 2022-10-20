import { initOptions } from '@types'

import { blankScreen } from '@monitor/handler/baseHandler'
import { errorCatch } from '@monitor/handler/errorTracker'
import { hashPageTrack, historyPageTrack } from '@monitor/handler/pageTracker'
import { getPerformance } from '@monitor/handler/performance'

export function loadConfig(options: initOptions): void {
  const {
    appId,
    cookie,
    reportUrl,
    autoTracker,
    delay,
    hashPage,
    errorReport,
    performanceReport
  } = options

  // --------- appId ----------------
  if (appId) {
    window['_monitor_app_id_'] = appId
  }

  // --------- userId ----------------
  if (cookie) {
    window['_monitor_user_cookie_'] = cookie
  }

  // --------- 服务端地址 ----------------
  if (reportUrl) {
    window['_monitor_report_url_'] = reportUrl
  } else {
    window['_monitor_report_url_'] = 'http://localhost:8080/report'
  }

  // -------- 合并上报的间隔 ------------
  if (delay) {
    window['_monitor_delay_'] = delay
  }

  // --------- 是否开启错误监控和白屏监控 ------------
  if (errorReport) {
    errorCatch()
    blankScreen()
  }
  //
  // // --------- 是否开启无痕埋点 ----------
  // if (autoTracker) {
  //     autoTrackerReport();
  // }

  // ----------- 路由监听 --------------
  if (hashPage) {
    hashPageTrack() // hash路由上报
  } else {
    historyPageTrack() // history路由上报
  }

  // ----------- 性能监控 --------------
  if (performanceReport) {
    getPerformance()
  }
}

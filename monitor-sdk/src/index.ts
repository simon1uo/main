import { loadConfig } from '@monitor/loader'
import { initOptions } from '@types'
import { errorCatch } from '@monitor/handler/errorTracker'
import { getPerformance } from '@monitor/handler/performance'

function init(options: initOptions) {
  loadConfig(options)
}

getPerformance()

export { init, errorCatch }

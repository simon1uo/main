// 页面性能数据
export interface performanceType {
  redirect: number
  appCache: number
  DNS: number
  TCP: number
  SSL: number
  request: number
  response: number
  Trans: number
  DOM: number
  FirstByte: number
  processing: number
  Load: number
  Res: number
  DomReady: number
  domParse: number
  TTFB: number
  FP: number
  TTI: number
}

// 错误数据类型
export enum mechanismType {
  JS = 'jsError',
  RS = 'resourceError',
  UJ = 'unhandledrejectionError',
  HP = 'httpError',
  CS = 'corsError',
  VUE = 'vueError'
}

// 用户行为所做的参数
export enum metricsName {
  PI = 'page-information',
  OI = 'origin-information',
  RCR = 'router-change-record',
  CBR = 'click-behavior-record',
  CDR = 'custom-define-record',
  HT = 'http-record'
}

export interface httpMetrics {
  method: string
  url: string | URL
  body: Document | XMLHttpRequestBodyInit | null | undefined | ReadableStream
  requestTime: number
  responseTime?: number
  status?: number
  statusText?: string
  response?: any
  type?: string
  timeStamp?: string
  message?: string
  duration?: number
}

// 白屏初始化
export type BlackScreenDataType = {
  wrapperElements: string[]
  emptyPoints: number
}

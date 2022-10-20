// sdk 配置选项
export interface initOptions {
  appId?: string // 系统id
  cookie: string // 用户id
  reportUrl: string // 后端url
  delay?: number // 延迟和合并上报的功能
  autoTracker?: boolean // 自动埋点
  hashPage: boolean // 是否hash录有
  errorReport: boolean // 是否开启错误监控
  performanceReport: boolean // 是否开启性能监控
}

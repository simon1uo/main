import { createApp } from 'vue'
import App from './App.vue'

// 引入前端监控平台并进行初始化配置
import { init } from 'project-monitor-sdk'
import router from './router'

const app = createApp(App)

app.use(router)
app.mount('#app')

init({
  // appId,  // 系统id
  cookie: 'simon1uo', // 用户id
  // userId: window.localStorage.getItem('session_id') || 'foursheep', // 用户id
  reportUrl: 'http://localhost:8000/report', // 后端url
  autoTracker: true, // 自动埋点
  // delay: 0, // 延迟和合并上报的功能
  hashPage: true, // 是否是 hash 路由
  errorReport: true, // 是否开启错误监控
  performanceReport: true, // 是否开启性能监控
})

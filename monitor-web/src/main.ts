import { createApp } from 'vue'
import App from './App.vue'

// styles
import '@/styles/index.scss'
import 'uno.css'

import { setupRouter } from '@/router'
import { setupStore } from '@/store'

const app = createApp(App)

setupStore(app)
setupRouter(app)

app.mount('#app')

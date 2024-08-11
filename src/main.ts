import './assets/index.css'
import 'iconify-icon'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { PiniaAxiosPlugin } from './plugins/axios'

const app = createApp(App)
const pinia = createPinia()
pinia.use(PiniaAxiosPlugin)

app.use(pinia)
app.use(router)

app.mount('#app')

import './assets/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ApiService from './services/api.service'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

const app = createApp(App)
const pinia = createPinia()

// Persisted state plugin
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
ApiService.init(import.meta.env.VITE_SWAGGER_URL_API)

const authStore = useAuthStore()
if (authStore.token) {
  ApiService.setHeader(authStore.token)
}

app.mount('#app')

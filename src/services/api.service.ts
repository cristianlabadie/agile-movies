import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

const ApiService = {
  init(baseURL: string | undefined) {
    api.defaults.baseURL = baseURL
  },

  setHeader(token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  },

  removeHeader() {
    api.defaults.headers.common = {}
  },

  get(resource: string) {
    return api.get(resource)
  },

  post(resource: string, data: any) {
    return api.post(resource, data)
  }
}

api.interceptors.request.use(
  (config) => {
    return config // Add this line to return the config object
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log('interceptors response', response)

    return response
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const authStore = useAuthStore()
    // console.log('[interceptors response error]', error)

    // Si el status code es 401, significa que el token expiró
    if (error.response.status === 401) {
      await authStore.fetchNewAccessToken()

      // Una vez el token se vuelva a generar, necesito reenviar la misma petición
      // con el nuevo token
      let originalRequest = error.config
      originalRequest.headers.Authorization = `Bearer ${authStore.token}`

      return api(originalRequest)
    }

    return Promise.reject(error)
  }
)

export default ApiService

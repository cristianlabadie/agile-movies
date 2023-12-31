import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

// const baseUrl = import.meta.env.VITE_SWAGGER_URL_API
// const authStore = useAuthStore()

let requestConfig: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
}

const Api = axios.create(requestConfig)

Api.interceptors.request.use(
  (config) => {
    console.log('interceptors request', config)
    return config // Add this line to return the config object
  },
  (error) => {
    console.log('interceptors request error', error)

    return Promise.reject(error)
  }
)

Api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log('interceptors response', response)

    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('interceptors response error', error)
    return Promise.reject(error)
  }
)

export default Api

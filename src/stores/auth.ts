import type { ResponseObject, ResponseError, User } from '@/types/interfaces'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => ({
    logged: false,
    user: {} as User,
    token: null as string | null,
    refreshToken: null as string | null
  }),
  getters: {
    isLoggedIn: (state) => state.logged,
    fullName: (state) => `${state.user.firstName} ${state.user.lastName}`
  },
  actions: {
    setTokens(token: string, refreshToken: string) {
      this.token = token
      this.refreshToken = refreshToken
    },
    clearTokens() {
      this.token = null
      this.refreshToken = null
    },
    async checkTokenValidity() {
      const isTokenValid = false

      if (!isTokenValid && this.refreshToken) {
        const newAccessToken = await this.fetchNewAccessToken()
        if (newAccessToken) {
          this.token = newAccessToken
        }
      } else {
        console.log('El token de acceso es válido')
      }
    },
    async fetchNewAccessToken() {
      try {
        const base_url = import.meta.env.VITE_SWAGGER_URL_API

        const response = await fetch(base_url + '/auth/refresh', {
          method: 'POST',
          headers: {
            'x-hack-create': '',
            'Content-Type': 'application/json'
            // Authorization: `Bearer ${this.refreshToken}`
          },
          body: JSON.stringify({ refresh_token: this.refreshToken })
        })

        const { data }: ResponseObject = await response.json()
        const { payload } = data
        const { token } = payload

        return token
      } catch (error) {
        console.log(error)
        return null
      }
    },
    login(username: string, password: string): Promise<User | Error> {
      return new Promise(async (resolve, reject) => {
        try {
          const base_url = import.meta.env.VITE_SWAGGER_URL_API

          const response = await fetch(base_url + '/auth/login', {
            method: 'POST',
            headers: {
              'x-hack-create': '',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
          })

          if (!response.ok) {
            const { message }: ResponseError = await response.json()
            throw new Error(message)
          }
          const { data }: ResponseObject = await response.json()
          const { user, payload } = data
          const { token, refresh_token } = payload

          this.logged = true
          this.user = user
          this.token = token
          this.refreshToken = refresh_token
          resolve(this.user)
        } catch (error) {
          reject(error)
        }
      })
    },
    getUserInfo() {
      return new Promise(async (resolve, reject) => {
        try {
          const base_url = import.meta.env.VITE_SWAGGER_URL_API

          const response = await fetch(base_url + '/user/me', {
            method: 'GET',
            headers: {
              'x-hack-create': '',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.token}`
            }
          })

          const { data }: ResponseObject = await response.json()
          const { user } = data

          this.user = user
          resolve(this.user)
        } catch (error) {
          reject(error as ResponseError)
        }
      })
    },
    logout() {
      this.logged = false
      this.user = {} as User
      this.token = null
      this.refreshToken = null
    }
  }
})

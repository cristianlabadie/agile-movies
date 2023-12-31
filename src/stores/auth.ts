import type { ResponseLogin, ResponseError, User, Data } from '@/types/interfaces'
import { defineStore } from 'pinia'
import { AuthService } from '@/services/auth.service'
import Api from '@/services/api.service'
import { useMoviesStore } from './movies'

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
        const response = await AuthService.refreshToken(this.refreshToken as string)
        const { data } = response as ResponseLogin
        const { payload } = data
        const { token } = payload

        this.token = token
        Api.setHeader(token)
      } catch (error) {
        console.log(error)
        return null
      }
    },
    login(username: string, password: string): Promise<User | Error> {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await AuthService.login({
            username,
            password
          })
          if (!response.hasOwnProperty('data')) {
            const { message } = response as ResponseError
            throw new Error(message)
          }

          const { data } = response as ResponseLogin
          const { user, payload } = data
          const { token, refresh_token } = payload

          this.logged = true
          this.user = user
          this.token = token
          this.refreshToken = refresh_token

          Api.setHeader(token)
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

          const { data }: ResponseLogin = await response.json()
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

      const moviesStore = useMoviesStore()
      moviesStore.setMovie({} as any)
      moviesStore.setActors([])
      moviesStore.resetPage()
    }
  }
})

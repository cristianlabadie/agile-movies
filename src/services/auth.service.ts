import type { ResponseLogin, ResponseError } from '@/types/interfaces'
import ApiService from './api.service'

const AuthService = {
  async login({
    username,
    password
  }: {
    username: string
    password: string
  }): Promise<ResponseLogin | ResponseError> {
    const { data } = await ApiService.post('/auth/login', {
      username,
      password
    })
    return data
  },
  async refreshToken(refresh_token: string): Promise<ResponseLogin | ResponseError> {
    const { data } = await ApiService.post('/auth/refresh', {
      refresh_token
    })
    return data
  }
}

export { AuthService }

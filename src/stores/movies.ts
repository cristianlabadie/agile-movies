import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import type { ResponsePopularMovies } from '@/types/interfaces'

const base_url = import.meta.env.VITE_SWAGGER_URL_API

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movie: {},
    actors: []
  }),
  actions: {
    async getNowPlaying(page: number): Promise<ResponsePopularMovies> {
      const auth = useAuthStore()
      const { checkTokenValidity, token } = auth
      await checkTokenValidity()
      const response = await fetch(base_url + '/movies/now_playing?page=' + page, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()
      return data
    },
    async getPopular(page: number) {
      const auth = useAuthStore()
      const { checkTokenValidity, token } = auth
      await checkTokenValidity()
      const response = await fetch(base_url + '/movies/popular?page=' + page, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const { data } = await response.json()
      return data
    },
    async getActors(movieId: number) {
      const auth = useAuthStore()
      const { checkTokenValidity, token } = auth
      await checkTokenValidity()
      const response = await fetch(base_url + '/movies/' + movieId + '/actors', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const { data } = await response.json()
      this.actors = data
      return data
    },
    setMovie(movie: any) {
      this.movie = movie
    }
  }
})

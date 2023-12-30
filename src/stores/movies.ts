import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import type { Movie, ResponseMovies, Actor } from '@/types/interfaces'

const base_url = import.meta.env.VITE_SWAGGER_URL_API

export const useMoviesStore = defineStore('movies', {
  persist: true,
  state: () => ({
    movie: {} as Movie,
    actors: [] as Actor[],
    page: 1,
    basePath: ''
  }),
  getters: {
    getMovie: (state) => state.movie,
    currentPage: (state) => state.page,
    getBasePath: (state) => state.basePath
  },
  actions: {
    async getNowPlaying(page: number): Promise<ResponseMovies> {
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
    async getPopular(page: number): Promise<ResponseMovies> {
      const auth = useAuthStore()
      const { checkTokenValidity, token } = auth
      await checkTokenValidity()
      const response = await fetch(base_url + '/movies/popular?page=' + page, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      //TODO Revisar la manera de hacer esto mejor. quizas migrarlo a axios
      if (response.status === 401) {
        await checkTokenValidity()
      }

      const data = await response.json()
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
    },
    incrementPage() {
      this.page++
    },
    setBasePath(path: string) {
      this.basePath = path
    },
    setActors(actors: Actor[]) {
      this.actors = actors
    }
  }
})

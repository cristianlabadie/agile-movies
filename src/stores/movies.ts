import { defineStore } from 'pinia'
import type { Movie, Actor } from '@/types/interfaces'
import { MovieService } from '@/services/movie.service'

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movie: {} as Movie,
    actors: [] as Actor[],
    popularMovies: [] as Movie[],
    premiereMovies: [] as Movie[],
    pagePopular: 1,
    pagePremiere: 1,
    basePath: ''
  }),
  getters: {
    getMovie: (state) => state.movie,
    currentPagePopular: (state) => state.pagePopular,
    currentPagePremiere: (state) => state.pagePremiere,
    getBasePath: (state) => state.basePath,
    getPremiereMovies: (state) => state.premiereMovies,
    getPopularMovies: (state) => state.popularMovies
  },
  actions: {
    async getNowPlaying(): Promise<void> {
      const { data, imageBaseUrl } = await MovieService.getNowPlaying(this.pagePremiere)
      this.basePath = imageBaseUrl
      this.premiereMovies = [...this.premiereMovies, ...data]
    },
    async getPopular(): Promise<void> {
      const { data, imageBaseUrl } = await MovieService.getPopular(this.pagePopular)
      this.basePath = imageBaseUrl
      this.popularMovies = [...this.popularMovies, ...data]
    },
    async getActors(movieId: number): Promise<Actor[]> {
      const response = await MovieService.getActors(movieId)
      const { data } = response
      this.actors = data
      return data
    },
    setMovie(movie: any) {
      this.movie = movie
    },
    incrementPagePopular() {
      this.pagePopular++
    },
    incrementPagePremiere() {
      this.pagePremiere++
    },
    setBasePath(path: string) {
      this.basePath = path
    },
    setActors(actors: Actor[]) {
      this.actors = actors
    },
    resetPagesPopular() {
      this.pagePopular = 1
    },
    resetPagesPremiere() {
      this.pagePremiere = 1
    }
  }
})

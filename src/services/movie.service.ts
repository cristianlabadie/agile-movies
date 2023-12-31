import type { ResponseActors, ResponseMovies } from '@/types/interfaces'
import ApiService from './api.service'

const MovieService = {
  async getNowPlaying(page: number): Promise<ResponseMovies> {
    const { data } = await ApiService.get('/movies/now_playing?page=' + page)
    return data
  },
  async getPopular(page: number): Promise<ResponseMovies> {
    const { data } = await ApiService.get('/movies/popular?page=' + page)
    return data
  },
  async getActors(movieId: number): Promise<ResponseActors> {
    const { data } = await ApiService.get('/movies/' + movieId + '/actors')
    return data
  }
}

export { MovieService }

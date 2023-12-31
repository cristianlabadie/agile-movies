import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import MovieItem from '../MovieItem.vue'
import { OriginalLanguage } from '@/types/interfaces'
import { vi } from 'vitest'

describe('Pruebas en MovieItem component', () => {
  const movie = {
    id: 1,
    title: 'Spiderman',
    overview: 'Spiderman overview',
    backdrop_path: '/spiderman.jpg',
    poster_path: '/spiderman.jpg',
    vote_average: 5.5,
    release_date: new Date('2021-09-01'),
    adult: false,
    genre_ids: [],
    original_language: OriginalLanguage.En,
    original_title: '',
    popularity: 1,
    video: false,
    vote_count: 1
  }

  const wrapper = mount(MovieItem, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            movies: {
              movies: [movie]
            }
          }
        })
      ]
    },
    props: {
      movie: movie
    }
  })

  it('Debe de renderizar el componente correctamente', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Debe de mostrar el título de la película', () => {
    const title = wrapper.find('#title')
    expect(title.text()).toBe(movie.title)
  })

  it('Debe de mostrar el overview de la película', () => {
    const overview = wrapper.find('#overview')
    expect(overview.text()).toBe(movie.overview)
  })
})

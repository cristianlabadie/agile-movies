import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import ActorItem from '../ActorItem.vue'
import { vi } from 'vitest'
import { KnownForDepartment } from '@/types/interfaces'

describe('Pruebas en ActorItem component', () => {
  const actor = {
    adult: false,
    gender: 2,
    id: 117642,
    known_for_department: KnownForDepartment.Acting,
    name: 'Jason Momoa',
    original_name: 'Jason Momoa',
    popularity: 81.044,
    profile_path: '/6dEFBpZH8C8OijsynkSajQT99Pb.jpg',
    cast_id: 35,
    character: 'Arthur Curry / Aquaman',
    credit_id: '629e1e1ea284eb009df9bb9d',
    order: 0
  }

  const wrapper = mount(ActorItem, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            movies: {
              actors: [actor]
            }
          }
        })
      ]
    },
    props: {
      actor: actor,
      baseUrl: 'https://image.tmdb.org/t/p/w500'
    }
  })

  it('Debe de renderizar el componente correctamente', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Debe de mostrar el nombre del actor', () => {
    const name = wrapper.find('#name')
    expect(name.text()).toBe(actor.name)
  })

  it('Debe de mostrar el personaje del actor', () => {
    const character = wrapper.find('#character')
    expect(character.text()).toBe(actor.character)
  })
})

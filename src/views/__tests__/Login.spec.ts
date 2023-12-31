import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import Login from '../Login.vue'
import { vi } from 'vitest'

describe('Pruebas en el Login component', () => {
  const wrapper = mount(Login, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            auth: {
              user: {}
            }
          }
        })
      ]
    }
  })

  it('Debe de renderizar el componente correctamente', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Debe de mostrar el formulario de login', () => {
    const form = wrapper.find('#loginForm')
    expect(form.exists()).toBeTruthy()
  })

  it('Debe de ingresar un username y un password en el formulario', () => {
    const divContainerUsername = wrapper.find('#username')
    const divContainerpassword = wrapper.find('#password')

    const username = divContainerUsername.find('#username')
    const password = divContainerpassword.find('#password')

    username.setValue('agilesoft')
    password.setValue('agile1234')

    expect((username.element as HTMLInputElement).value).toBe('agilesoft')
    expect((password.element as HTMLInputElement).value).toBe('agile1234')
  })

  it('Debe de mostrar el boton de login', () => {
    const button = wrapper.find('#loginButton')
    expect(button.exists()).toBeTruthy()
  })
})

import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Login from '@/views/Login.vue'

describe('Login', () => {
  it('renders properly', () => {
    const wrapper = mount(Login, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})

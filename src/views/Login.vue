<template>
  <div class="flex w-full mt-32 justify-center items-center">
    <section
      class="max-w-sm p-6 border min-w-80 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700 border-gray-300 text-white"
    >
      <!-- <img src="../assets/logo.svg" alt="" class="w-24 m-auto mb-4 size-10" /> -->
      <Logo class="w-24 m-auto mb-4 size-10" />

      <form class="flex flex-col gap-5" @submit.prevent="handleLogin">
        <fwb-input
          v-model="form.username"
          required
          placeholder="Ingresa tu Username ej: agilesoft"
          label="Username"
          :validation-status="statusUsername || undefined"
        >
          <template #validationMessage v-if="statusUsername && statusUsername == 'error'">
            Por favor ingresa un username válido
          </template>
        </fwb-input>

        <fwb-input
          v-model="form.password"
          type="password"
          required
          placeholder="Ingresa tu contraseña eg: agile1234"
          label="Contraseña"
          autocomplete="on"
          :validation-status="statusPassword || undefined"
        >
          <template #validationMessage v-if="statusPassword && statusPassword == 'error'">
            Por favor ingresa una contraseña válida
          </template>
        </fwb-input>

        <Button class="mt-2 w-full" :loading="loading" type="submit">Iniciar Sesión</Button>
      </form>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { FwbInput } from 'flowbite-vue'
import Button from '@/components/Button.vue'
import Logo from '@/assets/logo.vue'
import { useRouter } from 'vue-router'

const form = ref({
  username: 'agilesoft',
  password: 'agile1234'
})
const loading = ref(false)
const statusUsername = ref<'success' | 'error' | ''>('')
const statusPassword = ref<'success' | 'error' | ''>('')

const store = useAuthStore()
const router = useRouter()
const { login } = store

const checkStatus = () => {
  if (statusUsername.value) statusUsername.value = ''
  if (statusPassword.value) statusPassword.value = ''
}

const handleLogin = async () => {
  try {
    const { username, password } = form.value
    checkStatus()

    if (!username) return (statusUsername.value = 'error')
    if (!password) return (statusPassword.value = 'error')
    loading.value = true

    const response = await login(username, password)

    if (response.hasOwnProperty('email')) {
      statusUsername.value = 'success'
      statusPassword.value = 'success'
    }

    loading.value = false

    router.push({ name: 'Home' })
  } catch (error) {
    loading.value = false
    statusUsername.value = 'error'
    statusPassword.value = 'error'
  }
}
</script>

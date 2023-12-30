<template>
  <div class="flex w-full mt-36 justify-center items-center">
    <section
      class="max-w-sm p-6 border rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700 border-gray-300 text-white"
    >
      <!-- <img src="../assets/logo.svg" alt="" class="w-24 m-auto mb-4 size-10" /> -->
      <Logo class="w-24 m-auto mb-4 size-10" />

      <form class="flex flex-col gap-5">
        <fwb-input
          v-model="form.username"
          required
          placeholder="enter your username eg: agilesoft"
          label="Username"
          :validation-status="statusUsername || undefined"
        />

        <fwb-input
          v-model="form.password"
          type="password"
          required
          placeholder="enter your password eg: agile1234"
          label="Password"
          :validation-status="statusPassword || undefined"
        />

        <Button class="mt-2 w-full" :loading="loading" @click="handleLogin">Login</Button>
      </form>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { FwbInput } from 'flowbite-vue'
import Button from '@/components/Button.vue'
// import Input from '@/components/Input.vue'
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

const handleLogin = async () => {
  const { username, password } = form.value

  //TODO: Add validation
  if (!username) return (statusUsername.value = 'error')
  if (!password) return (statusPassword.value = 'error')
  loading.value = true

  await login(username, password)

  loading.value = false

  router.push({ name: 'Home' })
}
</script>

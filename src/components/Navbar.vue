<template>
  <nav class="flex justify-between p-4 bg-gray-200/40 dark:bg-gray-800">
    <!-- Logo -->
    <RouterLink to="/" class="flex items-center">
      <!-- <img src="../assets/agilesoft-logo-white.png" alt="" class="w-24 h-auto" /> -->
      <Logo class="w-24 h-auto" />
    </RouterLink>

    <!-- UserInfo with Avatar? -->
    <div class="relative flex items-center gap-2">
      <button
        id="theme-toggle"
        type="button"
        class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2"
      >
        <svg
          id="theme-toggle-dark-icon"
          class="hidden w-5 h-5"
          fill="dark"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </svg>
        <svg
          id="theme-toggle-light-icon"
          class="hidden w-5 h-5"
          fill="white"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <button
        class="flex items-center gap-x-2"
        v-if="authStore.isLoggedIn"
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        @click="openDropdown = !openDropdown"
      >
        <span class="text-xs text-black dark:text-white">Hola {{ authStore.fullName }} </span>
        <!-- <User class="stroke-white" /> -->
      </button>
      <!-- Dropdown menu -->
      <div
        id="dropdown"
        v-if="authStore.isLoggedIn && openDropdown"
        class="z-50 bg-white divide-y shadow-lg absolute right-4 top-16 divide-gray-100 rounded-lg border dark:border-gray-800 w-44 dark:bg-gray-700"
      >
        <ul
          class="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <li>
            <button
              href="#"
              class="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Profile
            </button>
          </li>
          <li>
            <button
              @click="handleLogout"
              class="block py-2 px-4 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { RouterLink, useRouter } from 'vue-router'
import User from '@/components/icons/User.vue'
import { ref } from 'vue'
import Logo from '@/assets/logo.vue'

const authStore = useAuthStore()
const router = useRouter()
const { user } = authStore
const openDropdown = ref(false)

const handleLogout = () => {
  authStore.logout()
  router.push({ name: 'Login' })
  openDropdown.value = false
}
</script>

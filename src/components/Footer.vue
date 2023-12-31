<template>
  <footer class="bg-gray-100 rounded-lg shadow m-4 dark:bg-gray-800">
    <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
        >© 2023 <a href="https://www.agilesoft.cl/" class="hover:underline">AgileMovies</a>. Todos
        los derechos reservados.
      </span>
      <ul
        class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0"
      >
        <li>
          <RouterLink to="/" class="hover:underline me-4 md:me-6">Inicio</RouterLink>
        </li>
        <li>
          <a href="#" class="hover:underline">Contacto</a>
        </li>
      </ul>
    </div>
  </footer>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

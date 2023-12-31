<template>
  <section class="dark:text-white mt-32 flex items-center w-full">
    <div class="flex flex-col items-center w-full">
      <!-- <h1 class="text-5xl font-bold tracking-wide">404</h1> -->
      <img
        src="../assets/404.png"
        alt="Página no encontrada"
        class="w-56 md:w-72 transition-all duration-150"
      />
      <p class="text-xl -mt-6">Página no encontrada 😔</p>

      <div class="mt-20 w-full flex flex-col gap-2 items-center">
        <p class="text-pretty max-w-md px-8 text-sm">
          Te invitamos a volver a revisar nuestra cartelera de películas
        </p>
        <RouterLink
          to="/"
          class="text-white transition-all duration-150 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:border-gray-700"
          >Volver al inicio
        </RouterLink>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <header class="sticky top-0 z-50 shadow-md dark:shadow-none">
    <Navbar />
  </header>
  <main class="container m-auto">
    <RouterView />
  </main>
</template>

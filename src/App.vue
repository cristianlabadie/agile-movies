<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <header class="sticky top-0 z-50 shadow-md dark:shadow-none">
    <Navbar />
  </header>
  <main class="container m-auto flex-1">
    <RouterView />
  </main>
  <Footer />
</template>

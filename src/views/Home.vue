<template>
  <!-- Carousel Movies Estelar -->
  <GridMoviesVue class="px-4 overflow-y-scroll no-scrollbar" />
</template>
<script setup lang="ts">
import GridMoviesVue from '@/components/GridMovies.vue'
import { useMoviesStore } from '@/stores/movies'
import { onMounted } from 'vue'

onMounted(() => {
  const movieStore = useMoviesStore()

  if (Object.keys(movieStore.getMovie).length) {
    movieStore.setMovie(null)
    movieStore.setActors([])
  }
})
</script>

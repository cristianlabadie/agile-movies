<template>
  <fwb-carousel
    :pictures="pictures"
    :animation="true"
    noIndicators
    class="transition-all duration-200"
  />
</template>
<script setup lang="ts">
import { FwbCarousel } from 'flowbite-vue'
import { useMoviesStore } from '@/stores/movies'
import type { ResponsePopularMovies } from '@/types/interfaces'
import { computed, onMounted, ref } from 'vue'

const store = useMoviesStore()
const { getNowPlaying } = store

const movies = ref<ResponsePopularMovies>({
  imageBaseUrl: '',
  data: []
})
const page = ref(1)

const pictures = computed(() => {
  return movies.value.data.map((movie) => ({
    src: `${movies.value.imageBaseUrl}${movie.poster_path}`,
    alt: movie.title,
    title: movie.title,
    subtitle: movie.overview
  }))
})

onMounted(async () => {
  movies.value = await getNowPlaying(page.value)
})
</script>

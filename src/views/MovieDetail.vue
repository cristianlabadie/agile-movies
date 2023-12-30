<template>
  <section class="p-5">
    <div>
      <h1 class="dark:text-white text-xl uppercase">{{ movie.title }}</h1>

      <img
        :src="moviesStore.getBasePath + movie.backdrop_path"
        class="mt-10 m-auto w-full h-auto aspect-16/9 rounded-md"
        :alt="movie.title"
      />
    </div>

    <article class="mt-10">
      <img
        :src="moviesStore.getBasePath + movie.poster_path"
        class="w-32 h-32 md:w-52 rounded-md float-left mr-4 !aspect-[2/4]"
        :alt="movie.title"
        :style="getShapeOutside(moviesStore.getBasePath + movie.poster_path)"
      />
      <p class="dark:text-white text-xs leading-5">{{ movie.overview }}</p>
    </article>

    <article class="mt-10">
      <Actors :actors="moviesStore.actors" :baseUrl="moviesStore.getBasePath" />
    </article>
  </section>
</template>
<script setup lang="ts">
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { useMoviesStore } from '@/stores/movies'
import Actors from '@/components/Actors.vue'

const route = useRoute()
const moviesStore = useMoviesStore()
const movieId = route.params.id

const movie = moviesStore.getMovie

const getShapeOutside = (url: string) => {
  return {
    shapeOutside: `url(${url})`,
    shapeMargin: '14px'
  }
}

onBeforeRouteLeave((to, from) => {
  if (to.name == 'Home') {
    moviesStore.setMovie(null)
    moviesStore.setActors([])
  }
})
</script>

<template>
  <section class="p-5 max-w-4xl m-auto">
    <RouterLink
      to="/"
      class="dark:text-white opacity-70 hover:opacity-100 transition-all duration-150 dark:hover:text-white mb-5 flex items-center gap-2"
    >
      <ArrowBack class="size-4" />
      Volver
    </RouterLink>
    <div>
      <h1 class="dark:text-white text-xl uppercase md:text-3xl">{{ movie.title }}</h1>

      <div v-if="loadingFrontPage">
        <div class="animate-pulse mt-10">
          <div class="bg-gray-300 dark:bg-gray-600 aspect-16/9 h-48 w-full rounded-md"></div>
        </div>
      </div>
      <img
        v-else
        :src="imgFrontPage.src"
        class="mt-10 m-auto w-full h-auto aspect-16/9 rounded-md max-w-4xl"
        :alt="movie.title"
      />
    </div>

    <article class="mt-10">
      <h3 class="dark:text-white text-xl md:text-2xl mb-2">Sinopsis</h3>

      <div class="sm:flex">
        <div v-if="loadingPoster">
          <div class="animate-pulse">
            <div
              class="bg-gray-300 dark:bg-gray-600 w-44 h-64 md:w-52 rounded-md float-left mr-4"
            ></div>
          </div>
        </div>
        <img
          v-else
          :src="imgPoster.src"
          class="w-auto h-64 aspect-auto md:w-52 rounded-md float-left mr-4 sm:float-none"
          :alt="movie.title"
          :style="getShapeOutside(imgPoster.src)"
        />
        <p class="dark:text-white text-xs sm:text-base leading-5">
          {{ movie.overview }}
        </p>
      </div>
    </article>

    <article>
      <h3 class="dark:text-white text-xl md:text-2xl mb-2 mt-10">Información</h3>
      <div class="flex flex-col sm:flex-row gap-5">
        <div class="flex flex-col gap-2">
          <p class="dark:text-white text-xs sm:text-base">
            <span class="font-semibold">Fecha de estreno:</span>
            {{ movie.release_date }}
          </p>
          <p class="dark:text-white text-xs sm:text-base">
            <span class="font-semibold">Popularidad:</span>
            {{ movie.popularity }}
          </p>
          <p class="dark:text-white text-xs sm:text-base">
            <span class="font-semibold">Idioma:</span>
            {{ movie.original_language }}
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <p class="dark:text-white text-xs sm:text-base">
            <span class="font-semibold">Titulo original:</span>
            {{ movie.original_title }}
          </p>
          <p class="dark:text-white text-xs sm:text-base">
            <span class="font-semibold">Resumen de Votos:</span>
            {{ movie.vote_average }}
          </p>
          <p class="dark:text-white text-xs sm:text-base">
            <span class="font-semibold">Cantidad de Votos:</span>
            {{ movie.vote_count }}
          </p>
        </div>
      </div>
    </article>

    <article class="mt-32 sm:mt-20">
      <h3 class="dark:text-white text-xl mb-2 md:text-2xl">Reparto</h3>
      <Actors :actors="moviesStore.actors" :baseUrl="moviesStore.getBasePath" />
    </article>
  </section>
</template>
<script setup lang="ts">
import { RouterLink, onBeforeRouteLeave, onBeforeRouteUpdate, useRouter } from 'vue-router'
import { useMoviesStore } from '@/stores/movies'
import Actors from '@/components/Actors.vue'
import { computed, onMounted, ref } from 'vue'
import ArrowBack from '@/components/icons/ArrowBack.vue'

const moviesStore = useMoviesStore()
const loadingFrontPage = ref(true)
const loadingPoster = ref(true)
const imgFrontPage = new Image()
const imgPoster = new Image()
const router = useRouter()

const movie = computed(() => moviesStore.getMovie)

imgFrontPage.onload = () => {
  loadingFrontPage.value = false
}

imgPoster.onload = () => {
  loadingPoster.value = false
}

imgFrontPage.src = moviesStore.getBasePath + movie.value.backdrop_path
imgPoster.src = moviesStore.getBasePath + movie.value.poster_path

const getShapeOutside = (url: string) => {
  return {
    shapeOutside: `url(${url})`,
    shapeMargin: '14px'
  }
}

onMounted(() => {
  // Si no hay película, redirigir a la página 404
  if (!Object.keys(movie.value).length) {
    router.push('/404')
  }
})

onBeforeRouteUpdate((to, from) => {
  moviesStore.resetPagesPopular()
  moviesStore.resetPagesPremiere()
})
</script>

<template>
  <section class="mt-20 min-h-96">
    <Carousel />

    <div class="mt-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 lg:gap-5">
      <RouterLink
        :to="processUrl(movie.id)"
        v-for="movie in movies.data"
        :key="movie.id"
        class="relative rounded-xl h-80 backdrop-blur-md border border-black/10 shadow-inner shadow-white/10 overflow-hidden group"
      >
        <div
          class="absolute z-10 bottom-0 top-0 w-full h-full bg-gradient-to-b from-transparent from-40% via-[#151836]/50 to-[#151836]/80"
        ></div>

        <div
          class="absolute left-0 top-0 bottom-0 w-full h-full group-hover:scale-110 transition-scale duration-1000 ease-in-out opacity-90 bg-blend-luminosity bg-center bg-cover bg-no-repeat -z-10"
          :style="getBgUrl(movies.imageBaseUrl, movie)"
        ></div>

        <div
          class="relative group-hover:cursor-pointer select-none flex flex-col gap-1 p-6 text-lg z-20 justify-end h-full"
        >
          <h2 class="text-sm font-semibold line-clamp-2 text-balance text-white mb-4 uppercase">
            {{ movie.title }}
          </h2>

          <h3
            class="text-xs line-clamp-2 font-semibold text-sky-200/80 -mt-4 mb-4"
            v-if="movie.overview"
          >
            {{ movie.overview }}
          </h3>

          <slot name="content" />
        </div>
      </RouterLink>
    </div>
    <div
      ref="el"
      class="py-10 h-50 dark:text-white animate-bounce text-center w-full"
      v-show="movies.data.length"
    >
      <span>Loading more movies...</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useMoviesStore } from '@/stores/movies'
import type { ResponseMovies } from '@/types/interfaces'
import { computed, onMounted, ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import Carousel from './Carousel.vue'

const store = useMoviesStore()
const { getPopular } = store
const el = ref<HTMLElement | null>(null)

const movies = ref<ResponseMovies>({
  imageBaseUrl: '',
  data: []
})
const page = ref(1)

const getBgUrl = (imageBaseUrl: string, movie: any) => {
  return {
    backgroundImage: `url(${imageBaseUrl}${movie.poster_path})`
  }
}

const processUrl = (movieId: number) => {
  return '/movie/' + movieId
}

const moreMovies = async () => {
  page.value++
  const newMovies = await getPopular(page.value)
  movies.value.data = [...movies.value.data, ...newMovies.data]
  console.log('moreMovies')
}

useIntersectionObserver(el, moreMovies, { threshold: 0 })

onMounted(async () => {
  movies.value = await getPopular(page.value)
})
</script>

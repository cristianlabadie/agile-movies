<template>
  <section class="mt-10 min-h-96">
    <Carousel />

    <h2
      class="text-2xl mt-10 mb-5 text-center lg:text-4xl dark:text-white font-semibold text-balance tracking-wide"
    >
      Películas más populares 🤩
    </h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 lg:gap-5">
      <RouterLink
        :to="processUrl(movie.id)"
        v-for="movie in store.getPopularMovies"
        :key="movie.id"
        class="relative rounded-xl h-80 backdrop-blur-md border border-black/10 shadow-inner shadow-white/10 overflow-hidden group"
      >
        <MovieItem :movie="movie" />
      </RouterLink>
    </div>
    <div
      ref="el"
      class="py-10 h-50 dark:text-white animate-bounce text-center w-full"
      v-show="store.getPremiereMovies.length"
    >
      <span>Cargando más películas...</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeRouteLeave } from 'vue-router'
import { useMoviesStore } from '@/stores/movies'
import { useIntersectionObserver } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import Carousel from './Carousel.vue'
import MovieItem from './MovieItem.vue'

const store = useMoviesStore()
const { getPopular } = store
const el = ref<HTMLElement | null>(null)

const processUrl = (movieId: number) => {
  return '/movie/' + movieId
}

const moreMovies = async () => {
  if (store.getPopularMovies.length == 0) return
  store.incrementPagePopular()
  await getPopular()
}

useIntersectionObserver(el, moreMovies, { threshold: 0.5 })

onBeforeRouteLeave((to, from) => {
  if (to.name == 'MovieDetail') {
    const movieId = to.params.id
    let movie = store.getPremiereMovies.find((movie) => movie.id == Number(movieId))
    if (!movie) {
      movie = store.getPopularMovies.find((movie) => movie.id == Number(movieId))
    }

    if (movie) {
      store.setMovie(movie)
      store.getActors(Number(movieId))
    }
  }
})

onMounted(async () => {
  if (store.currentPagePopular != 1) {
    store.resetPagesPopular()
  }
  if (store.getPopularMovies.length == 0) {
    await getPopular()
  }
})
</script>

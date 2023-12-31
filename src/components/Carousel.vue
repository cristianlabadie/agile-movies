<template>
  <div>
    <h2 class="text-2xl lg:text-4xl dark:text-white mb-5 text-center font-semibold tracking-wide">
      Películas en estreno 🎬
    </h2>
    <swiper
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      @reachEnd="moreMovies"
      effect="coverflow"
      :grabCursor="true"
      :centeredSlides="true"
      slidesPerView="auto"
      :modules="[EffectCoverflow, Autoplay]"
      :autoplay="{
        delay: 4500,
        disableOnInteraction: false
      }"
      :coverflowEffect="{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
      }"
      class="mySwiper"
    >
      <swiper-slide
        v-for="movie in store.getPremiereMovies"
        :key="movie.id"
        class="relative rounded-xl h-80 backdrop-blur-md border border-black/10 shadow-inner shadow-white/10 overflow-hidden group"
      >
        <RouterLink :to="processUrl(movie.id)">
          <MovieItem :movie="movie" extend />
        </RouterLink>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCoverflow, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import { useMoviesStore } from '@/stores/movies'
import type { ResponseMovies } from '@/types/interfaces'
import { onMounted, ref } from 'vue'
import MovieItem from './MovieItem.vue'
import { RouterLink, onBeforeRouteLeave } from 'vue-router'

const store = useMoviesStore()
const { getNowPlaying } = store

const onSwiper = (swiper: any) => {
  console.log(swiper)
}
const onSlideChange = () => {
  console.log('slide change')
}

const processUrl = (movieId: number) => {
  return '/movie/' + movieId
}

const moreMovies = async () => {
  if (store.premiereMovies.length == 0) return
  store.incrementPagePremiere()
  await getNowPlaying()
}

onBeforeRouteLeave((to, from) => {
  if (to.name == 'MovieDetail') {
    const movieId = to.params.id
    const movie = store.getPremiereMovies.find((movie) => movie.id == Number(movieId))

    if (movie) {
      store.setMovie(movie)
      store.getActors(Number(movieId))
    }
  }
})

onMounted(async () => {
  await getNowPlaying()

  if (store.currentPagePremiere != 1) {
    store.resetPagesPremiere()
  }
  if (store.getPremiereMovies.length == 0) {
    await getNowPlaying()
  }
})
</script>

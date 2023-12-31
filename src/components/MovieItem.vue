<template>
  <div
    class="absolute z-10 bottom-0 top-0 w-full h-full bg-gradient-to-b from-transparent from-40% via-[#151836]/50 to-[#151836]/80"
  ></div>

  <div
    class="absolute left-0 top-0 bottom-0 w-full h-full group-hover:scale-110 transition-scale duration-1000 ease-in-out opacity-90 bg-blend-luminosity bg-center bg-cover bg-no-repeat -z-10"
    :class="{
      'animate-pulse bg-slate-500 transition-all': loadingImg
    }"
    :style="loadingImg ? '' : getBgUrl"
  ></div>

  <div
    class="relative group-hover:cursor-pointer select-none flex flex-col gap-1 p-6 text-lg z-20 justify-end h-full"
    :class="{ 'min-h-96': extend }"
  >
    <h2
      class="text-sm font-semibold line-clamp-2 text-balance text-white mb-4 uppercase"
      :class="{ 'md:text-3xl': extend }"
      id="title"
    >
      {{ movie.title }}
    </h2>

    <h3
      class="text-xs line-clamp-2 font-semibold text-sky-200/80 -mt-4 mb-4 sm:mb-0"
      v-if="movie.overview"
      id="overview"
    >
      {{ movie.overview }}
    </h3>
  </div>
</template>
<script setup lang="ts">
import { ref, type PropType, onMounted, computed } from 'vue'
import type { Movie } from '@/types/interfaces'
import { useMoviesStore } from '@/stores/movies'

const props = defineProps({
  movie: {
    type: Object as PropType<Movie>,
    required: true
  },
  extend: {
    type: Boolean,
    default: false
  }
})

const movieStore = useMoviesStore()

const imgMovie = new Image()
const loadingImg = ref(true)

imgMovie.onload = () => {
  loadingImg.value = false
}

const imageToShow = computed(() => {
  return props.extend
    ? movieStore.getBasePath + props.movie.backdrop_path
    : movieStore.getBasePath + props.movie.poster_path
})

onMounted(() => {
  imgMovie.src = imageToShow.value
})

const getBgUrl = computed(() => {
  return {
    backgroundImage: `url(${imgMovie.src})`
  }
})
</script>

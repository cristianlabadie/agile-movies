<template>
  <swiper
    slides-per-view="auto"
    :space-between="20"
    :freeMode="true"
    :autoplay="{
      delay: 3500,
      disableOnInteraction: false
    }"
    :breakpoints="{
      320: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      480: {
        slidesPerView: 4,
        spaceBetween: 35
      }
    }"
    :modules="[Autoplay]"
    class="mySwiper"
  >
    <swiper-slide v-for="actor in actors" :key="actor.id">
      <ActorItem :actor="actor" :baseUrl="baseUrl" />
    </swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import type { Actor } from '@/types/interfaces'
import type { PropType } from 'vue'
import ActorItem from './ActorItem.vue'
import 'swiper/css'

defineProps({
  actors: {
    type: Array as PropType<Actor[]>,
    required: true
  },
  baseUrl: {
    type: String,
    required: true
  }
})
</script>

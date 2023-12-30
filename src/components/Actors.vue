<template>
  <div class="flex flex-row overflow-y-scroll no-scrollbar gap-3 -mr-5">
    <ActorItem v-for="actor in actors" :key="actor.id" :actor="actor" :baseUrl="baseUrl" />
  </div>
</template>

<script setup lang="ts">
import type { Actor } from '@/types/interfaces'
import type { PropType } from 'vue'
import ActorItem from './ActorItem.vue'

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

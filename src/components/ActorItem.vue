<template>
  <div class="min-w-32 flex flex-col gap-1 dark:text-white items-center">
    <img
      v-if="actor.profile_path"
      :src="baseUrl + actor.profile_path"
      :alt="actor.name"
      class="w-full h-auto rounded-md"
    />

    <img
      v-else
      src="https://via.placeholder.com/300x450/000000/FFFFFF/?text=No%20Image"
      :alt="actor.name"
      class="w-full h-auto rounded-md"
    />

    <div class="w-full">
      <!-- Actor info -->
      <h3 class="text-xs text-pretty line-clamp-1">
        {{ actor.character }}
      </h3>

      <small class="text-gray-400 truncate">
        {{ actor.name }}
      </small>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Actor } from '@/types/interfaces'
import type { PropType } from 'vue'

defineProps({
  actor: {
    type: Object as PropType<Actor>,
    required: true
  },
  baseUrl: {
    type: String,
    required: true
  }
})
</script>

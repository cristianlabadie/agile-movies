<template>
  <div class="min-w-32 select-none flex flex-col gap-1 dark:text-white items-center">
    <div v-if="loadingImg">
      <div class="animate-pulse">
        <div class="bg-gray-300 dark:bg-gray-600 w-32 h-48 rounded-md"></div>
      </div>
    </div>

    <img
      v-else-if="!loadingImg && errorOnLoad"
      src="https://via.placeholder.com/300x450/000000/FFFFFF/?text=No%20Image"
      :alt="actor.name"
      class="w-full h-48 rounded-md"
    />

    <img
      v-else-if="!loadingImg && actor.profile_path"
      :src="imgActor.src"
      :alt="actor.name"
      class="w-auto h-48 rounded-md"
      id="actor-img"
    />

    <div class="w-full">
      <!-- Actor info -->
      <h3 class="text-xs text-pretty line-clamp-1" id="character">
        {{ actor.character }}
      </h3>

      <small class="text-gray-400 truncate" id="name">
        {{ actor.name }}
      </small>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Actor } from '@/types/interfaces'
import { ref, type PropType, onMounted } from 'vue'

const props = defineProps({
  actor: {
    type: Object as PropType<Actor>,
    required: true
  },
  baseUrl: {
    type: String,
    required: true
  }
})

const imgActor = new Image()
const loadingImg = ref(true)
const errorOnLoad = ref(false)

imgActor.onload = () => {
  loadingImg.value = false
}
imgActor.onerror = () => {
  errorOnLoad.value = false
}

onMounted(() => {
  if (!props.actor.profile_path) {
    loadingImg.value = false
    errorOnLoad.value = true
    imgActor.src = 'https://via.placeholder.com/300x450/000000/FFFFFF/?text=No%20Image'
  } else {
    imgActor.src = props.baseUrl + props.actor.profile_path
  }
})
</script>

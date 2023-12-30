<template>
  <button
    type="button"
    class="text-white flex items-center justify-center bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600"
    :disabled="loading"
    :class="[
      loading
        ? 'opacity-80 cursor-not-allowed'
        : 'hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
    ]"
  >
    <Spinner v-if="loading" />
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
import Spinner from '@/components/icons/Spinner.vue'

defineProps({
  loading: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>

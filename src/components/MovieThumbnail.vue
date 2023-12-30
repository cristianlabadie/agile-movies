<template></template>
<script setup lang="ts">
import type { Movie } from '@/types/interfaces'

defineProps({
  movie: {
    type: Object as () => Movie,
    required: true
  }
})
</script>

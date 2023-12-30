<template>
  <div>
    <label :for="label" class="block mb-2 text-sm font-medium text-white">{{ label }}</label>
    <input
      :type="type"
      :name="label"
      :value="modelValue"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      :placeholder="placeholder"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :required="required"
      :disabled="disabled"
      :autocomplete="autocomplete"
    />
    <slot name="alert"></slot>
  </div>
</template>
<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true
  },
  modelValue: {
    type: String
  },
  placeholder: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: false,
    default: 'text'
  },
  required: {
    type: Boolean,
    required: false,
    default: false
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  },
  autocomplete: {
    type: String,
    required: false,
    default: 'off'
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

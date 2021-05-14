<template>
  <input id="todo" name="todo" type="number" :value="value" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-12 shadow-sm sm:text-sm border-gray-300 rounded-md"/>
  <label for="todo" class="ml-3 block text-sm font-medium text-gray-700">{{ label }}</label>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  type: String,
  label: String,
  value: Number
})
</script>

<style scoped>
</style>
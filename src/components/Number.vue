<template>
  <div class="flex items-center">
    <input :id="name" :name="name" type="number" :value="value" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-16 shadow-sm sm:text-sm border-gray-300 rounded-md"/>
    <label :for="name" class="ml-3 block text-sm font-medium text-gray-700">{{ label }}</label>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  name: String,
  type: String,
  label: String,
  value: Number
})
</script>
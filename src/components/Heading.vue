<template>
  <h1 class="text-base font-medium text-gray-900">{{ title }}</h1>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  type: String,
  title: String
})
</script>

<style scoped>
</style>
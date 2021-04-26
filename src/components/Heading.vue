<template>
  <h1>{{ title }}</h1>
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
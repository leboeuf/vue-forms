<template>
  <h1>{{ title }}</h1>
</template>

<script setup>
import { defineAsyncComponent, defineComponent, reactive, onMounted } from 'vue'

defineProps({
  title: String,
  description: String
})

const components = reactive([])
</script>

<style scoped>
</style>
<template>
	<div class="flex items-start">
		<div class="flex items-center h-5">
			<input :id="name" :name="name" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
		</div>
		<div class="ml-3 text-sm">
			<label :for="name" class="font-medium text-gray-700">{{ label }}</label>
			<p class="text-gray-500">{{ description }}</p>
		</div>
	</div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
	name: String,
	type: String,
	label: String,
	description: String
})
</script>

<style scoped>
</style>
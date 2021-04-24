<template>
  <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
  <Form/>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import Form from './components/Form.vue'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  margin-left: 200px;
}
</style>
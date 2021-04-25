<template>
  <h1>{{ title }}</h1>
  <component
        v-for="component in components"
        :key="component.controlId"
        :is="component.type"
        v-bind="component.model"
    ></component>
</template>

<script>
import { defineComponent } from 'vue'
import ComponentsList from './ComponentsList.js'

export default defineComponent({
    components: ComponentsList,
    props: {
        title: String,
        description: String,
        components: Array
    }
})
</script>
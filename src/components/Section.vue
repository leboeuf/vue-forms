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
import { defineAsyncComponent, defineComponent, reactive, onMounted } from 'vue'

export default defineComponent({
    components: {
        TextBox: defineAsyncComponent(() => import('./TextBox.vue')),
        Heading: defineAsyncComponent(() => import('./Heading.vue')),
        Section: defineAsyncComponent(() => import('./Section.vue')),
    },
    props: {
        title: String,
        description: String,
        components: Array
    }
})
</script>
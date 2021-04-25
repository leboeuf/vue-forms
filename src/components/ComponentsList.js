import { defineAsyncComponent } from 'vue'

export default {
    TextBox: defineAsyncComponent(() => import('./TextBox.vue')),
    Heading: defineAsyncComponent(() => import('./Heading.vue')),
    Section: defineAsyncComponent(() => import('./Section.vue')),
}
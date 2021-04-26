import { defineAsyncComponent } from 'vue'

export default {
    CheckBox: defineAsyncComponent(() => import('./CheckBox.vue')),
    TextBox: defineAsyncComponent(() => import('./TextBox.vue')),
    Heading: defineAsyncComponent(() => import('./Heading.vue')),
    Section: defineAsyncComponent(() => import('./Section.vue')),
}
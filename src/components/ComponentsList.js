import { defineAsyncComponent } from 'vue'

export default {
    CheckBox: defineAsyncComponent(() => import('./CheckBox.vue')),
    Heading: defineAsyncComponent(() => import('./Heading.vue')),
    Number: defineAsyncComponent(() => import('./Number.vue')),
    Table: defineAsyncComponent(() => import('./Table.vue')),
    TableRow: defineAsyncComponent(() => import('./TableRow.vue')),
    TextBox: defineAsyncComponent(() => import('./TextBox.vue')),
    Section: defineAsyncComponent(() => import('./Section.vue')),
}
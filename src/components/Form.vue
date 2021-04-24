<template>
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
    },
    setup() {
        const components = reactive([])
        const schema = {
            product: {
                type: 'entity',
                label: 'product',
                schema: {
                    id: {
                        label: 'id',
                        type: 'text',
                        readonly: true,
                        value: '169c7c42-e93d-4ca4-9be5-63fea0532681'
                    },
                    name:
                    {
                        label: 'name',
                        type: 'text',
                        placeholder: 'Name'
                    }
                }
            }
            // auto_mode: {
            //     type: 'section',
            //     label: 'Automatic mode',
            //     description: 'This is the desc',
            //     schema: {
            //         events_header: {
            //             label: 'Events',
            //             type: 'header',
            //         },
            //         send_messages: {
            //             label: 'Send messages',
            //             type: 'checkbox',
            //             description: 'This text goes under the label'
            //         },
            //         send_read_receipts: {
            //             label: 'Send read receipts',
            //             type: 'checkbox',
            //             description: 'This text goes under the label'
            //         },
            //         delay_header: {
            //             label: 'Delay',
            //             type: 'header',
            //         },
            //         delay_text: {
            //             label: 'The time to wait between events.',
            //             type: 'paragraph',
            //         },
            //         delay: {
            //             label: 'seconds',
            //             type: 'number'
            //         }
            //     }
            // }
        }

        const generateControls = (parent) => {
            var node = parent ?? schema;
            Object.keys(node).forEach((key, index) => {
                var properties = node[key]
                var type = properties['type']
                if (type === undefined) {
                    throw `Expected property 'type' on node '${key}'.`
                }

                if (type === 'entity') {
                    var label = properties['label']
                    if (label === undefined) {
                        throw `Expected property 'label' on node '${key}' because type is 'entity'.`
                    }

                    components.push(generateControl({ type: 'Heading', model: { title: key } }))
                } else if (type === 'text') {
                    let model = properties
                    model.name = key
                    components.push(generateControl({ type: 'TextBox', model }))
                }

                var nestedSchema = properties['schema']
                if (nestedSchema !== undefined) {
                    generateControls(nestedSchema)
                }
            })

            // components.push({type:'TextBox', name:'asdasd', model: {msg: schema.product.label}})
        }

        onMounted(generateControls)

        return {
            generateControls,
            components
        }
    },
})

function generateControl(control) {
    control.id = control.name + 'asdasdasd'
    return control
}
</script>
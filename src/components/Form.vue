<template>
    <component
        v-for="component in components"
        :key="component.controlId"
        :is="component.type"
        v-bind="component.model"
    ></component>
</template>

<script>
import { defineComponent, reactive, onMounted } from 'vue'
import ComponentsList from './ComponentsList.js'

export default defineComponent({
    components: ComponentsList,
    setup() {
        const components = reactive([])
        const rootSchema = {
            // product: {
            //     type: 'heading',
            //     label: 'product',
            //     schema: {
            //         id: {
            //             label: 'id',
            //             type: 'text',
            //             readonly: true,
            //             value: '169c7c42-e93d-4ca4-9be5-63fea0532681'
            //         },
            //         name:
            //         {
            //             label: 'name',
            //             type: 'text',
            //             placeholder: 'Name'
            //         }
            //     }
            // }
            auto_mode: {
                type: 'section',
                label: 'Automatic mode',
                description: 'This is the desc',
                schema: {
                    events_header: {
                        label: 'Events',
                        type: 'heading',
                    },
                    send_messages: {
                        label: 'Send messages',
                        type: 'checkbox',
                        description: 'This text goes under the label'
                    },
                    send_read_receipts: {
                        label: 'Send read receipts',
                        type: 'checkbox',
                        description: 'This text goes under the label'
                    },
                    delay_header: {
                        label: 'Delay',
                        type: 'heading',
                    },
                    delay_text: {
                        label: 'The time to wait between events.',
                        type: 'paragraph',
                    },
                    delay: {
                        label: 'seconds',
                        type: 'number'
                    }
                }
            }
        }

        const generateControls = (componentList, schema) => {
            // This method is initially called by onMounted() without any arguments.
            // So the schema and componentList will be those of this Form instance.
            // Then for nested component this method is recursively called.
            // The schema and componentList are then those of the nested component.
            var node = schema ?? rootSchema
            componentList ??= components
            Object.keys(node).forEach((key, index) => {
                var properties = node[key]
                var type = properties['type']
                if (type === undefined) {
                    throw `Expected property 'type' on node '${key}'.`
                }

                if (type === 'section') {
                    var label = properties['label']
                    if (label === undefined) {
                        throw `Expected property 'label' on node '${key}' because type is 'section'.`
                    }

                    var description = properties['description']
                    var componentsTest = generateControls([], properties['schema'])
                    componentList.push(generateControl({ type: 'Section', model: { title: label, description: description, components: componentsTest } }))
                }
                else if (type === 'heading') {
                    var label = properties['label']
                    if (label === undefined) {
                        throw `Expected property 'label' on node '${key}' because type is '${type}'.`
                    }

                    componentList.push(generateControl({ type: 'Heading', model: { title: label } }))

                    // TODO: should be nested component-wise, like Section, but not for Heading
                    var nestedSchema = properties['schema']
                    if (nestedSchema !== undefined) {
                        generateControls(nestedSchema)
                    }
                } else if (type === 'text') {
                    let model = properties
                    model.name = key
                    componentList.push(generateControl({ type: 'TextBox', model }))
                } else if (type === 'checkbox') {
                    let model = properties
                    model.name = key
                    componentList.push(generateControl({ type: 'CheckBox', model }))
                }
            })

            return componentList

            // componentList.push({type:'TextBox', name:'asdasd', model: {msg: schema.product.label}})
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
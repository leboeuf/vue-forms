<template>
    <component
        v-for="component in components"
        :key="component.name"
        :is="component.type"
        v-bind="component.model"
    ></component>
</template>

<script>
import { defineComponent, reactive, onMounted } from 'vue'
import ComponentsList from './ComponentsList.js'

export default defineComponent({
    components: ComponentsList,
    props: {
		schema: Object,
	},
    setup(props) {
        const components = reactive([])

        const generateControls = (componentList, schema) => {
            // This method is initially called by onMounted() without any arguments.
            // So the schema and componentList will be those of this Form instance.
            // Then for nested component this method is recursively called.
            // The schema and componentList are then those of the nested component.
            var node = schema ?? props.schema
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
                    componentList.push({ type: 'Section', model: { title: label, description: description, components: componentsTest } })
                }
                else if (type === 'heading') {
                    var label = properties['label']
                    if (label === undefined) {
                        throw `Expected property 'label' on node '${key}' because type is '${type}'.`
                    }

                    componentList.push({ type: 'Heading', model: { title: label } })

                    // TODO: should be nested component-wise, like Section, but not for Heading
                    var nestedSchema = properties['schema']
                    if (nestedSchema !== undefined) {
                        generateControls(nestedSchema)
                    }
                } else {
                    let model = properties
                    model.name = key

                    switch (type) {
                        case 'text':
                            componentList.push({ type: 'TextBox', model })
                            break;
                        case 'checkbox':
                            componentList.push({ type: 'CheckBox', model })
                            break;
                        case 'number':
                            componentList.push({ type: 'Number', model })
                            break;
                    }
                }
            })

            return componentList
        }

        onMounted(generateControls)

        return {
            generateControls,
            components
        }
    },
})
</script>
<style>
[multiple],[type=date],[type=datetime-local],[type=email],[type=month],[type=number],[type=password],[type=search],[type=tel],[type=text],[type=time],[type=url],[type=week],select,textarea {
    border-width: 1px;
    border-radius: .375rem;
    padding: .5rem .75rem;
    font-size: 1rem;
    line-height: 1.5rem
}
</style>
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
import useDebugAdorners from '../composables/useDebugAdorners'

export default defineComponent({
    components: ComponentsList,
    props: {
		schema: Object,
	},
    setup(props) {
        const components = reactive([])

        const generateTableRow = (rowItem) => {
            // Used when parsing a table.
            // The Table component assumes its children are of type TableRow.
            // The TableRow component assumes its children are of type TableCell.
            return { model: { cells: rowItem.cells.map(generateTableRowCells) } }
        }

        const generateTableRowCells = (cells) => {
            return { model: { components: generateControls([], cells) }}
        }

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
                    var submitUrl = properties['submit_url']
                    var subComponents = generateControls([], properties['schema'])
                    componentList.push({ type: 'Section', model: { name: key, title: label, description: description, submitUrl: submitUrl, components: subComponents } })
                }
                if (type === 'table') {
                    var rows = properties['rows'].map(generateTableRow)
                    componentList.push({ type: 'Table', model: { name: key, rows: rows } })
                }
                else if (type === 'heading') {
                    var label = properties['label']
                    if (label === undefined) {
                        throw `Expected property 'label' on node '${key}' because type is '${type}'.`
                    }

                    componentList.push({ type: 'Heading', model: { name: key, title: label } })

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
                            break
                        case 'checkbox':
                            componentList.push({ type: 'CheckBox', model })
                            break
                        case 'number':
                            componentList.push({ type: 'Number', model })
                            break
                    }
                }
            })


            return componentList
        }  

        // Set the __DEBUG__ flag if we're inside a WebView
        // TODO: In the future, the WebView could pass a specific user-agent to tell us whether to enable debug.
        // Or it could set it using CoreWebView2.AddScriptToExecuteOnDocumentCreatedAsync("window.__DEBUG__ = true");
        window.__DEBUG__ = (window.chrome?.webview != undefined)

        // TODO: extract these WebView-related functions, only add if __DEBUG__
        const onWebViewMessageReceived = event => {
            let targetControl = findControlById(components, event.data.payload.control)
            if (targetcontrol) {
                targetControl.model.label = event.data.payload.value // TODO: check the property (inside payload) instead of assuming 'label'
            }
        }

        const findControlById = (components, controlToFind) => {
            for (var component of components) {
                if (component.model.name == controlToFind)
                    return component
                else if (component.model.components) {
                    let foundComponent = findControlById(component.model.components, controlToFind)
                    if (foundComponent)
                        return foundComponent
                }
            }

            return null
        }

        const addWebViewListeners = () => {
            if (window.chrome?.webview != undefined) {
                window.chrome.webview.addEventListener('message', onWebViewMessageReceived)
            }
        }

        onMounted([generateControls, useDebugAdorners, addWebViewListeners])

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

.debug-selected {
    position: relative;
}

.debug-selected::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #33d0ff45;
    opacity: .7;
}
</style>
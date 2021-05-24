<template>
	<td>
		<component
			v-for="component in components"
			:key="component.name"
			:is="component.type"
			v-bind="component.model"
		></component>
	</td>
</template>

<script>
import { defineComponent } from 'vue'
import ComponentsList from './ComponentsList.js'

export default defineComponent({
	components: ComponentsList,
	props: {
		type: String,
		components: Array
	}
})
</script>
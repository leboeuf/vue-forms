<template>
	<tr>
		<component
			v-for="component in cells"
			:key="component.name"
			:is="'TableCell'"
			v-bind="component.model"
		></component>
	</tr>
</template>

<script>
import { defineComponent } from 'vue'
import ComponentsList from './ComponentsList.js'

export default defineComponent({
	components: ComponentsList,
	props: {
		type: String,
		cells: Array
	}
})
</script>
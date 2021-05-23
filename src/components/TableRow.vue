<template>
<tr>
	<td v-for="component in components"
		:key="component.controlId">
		<component
			:is="component.type"
			v-bind="component.model"
		></component>
	</td>
</tr>
	
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
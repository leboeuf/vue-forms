<template>
	<div>
		<table>
			<thead></thead>
			<tbody>
				<component
					v-for="component in rows"
					:key="component.name"
					:is="'TableRow'"
					v-bind="component.model"
				></component>
			</tbody>
		</table>
	</div>
</template>

<script>
import { defineComponent } from 'vue'
import ComponentsList from './ComponentsList.js'

export default defineComponent({
	components: ComponentsList,
	props: {
		type: String,
		rows: Array
	}
})
</script>
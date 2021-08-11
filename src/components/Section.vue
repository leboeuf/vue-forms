<template>
	<div :id="name + '-container'">
		<div class="md:grid md:grid-cols-3 md:gap-6">
			<div class="md:col-span-1">
				<div class="px-4 sm:px-0">
					<h3 class="text-lg font-medium leading-6 text-gray-900">{{ title }}</h3>
					<p class="mt-1 text-sm text-gray-600">
						{{ description }}
					</p>
				</div>
			</div>
			<div class="mt-5 md:mt-0 md:col-span-2">
				<form :action="submitUrl" method="POST">
					<div class="shadow sm:rounded-md sm:overflow-hidden">
						<div class="px-4 py-5 bg-white space-y-6 sm:p-6">
							<component
								v-for="component in components"
								:key="component.controlId"
								:is="component.type"
								v-bind="component.model"
							></component>
						</div>
						<div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
							<button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
								Save
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>

	<div class="hidden sm:block" aria-hidden="true">
		<div class="py-5">
			<div class="border-t border-gray-200"></div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue'
import ComponentsList from './ComponentsList.js'

export default defineComponent({
	components: ComponentsList,
	props: {
		type: String,
		name: String,
		title: String,
		description: String,
		submitUrl: String,
		components: Array
	}
})
</script>
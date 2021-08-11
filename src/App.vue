<template>
<div class="mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gray-100 rounded-lg ring-1 ring-gray-900 ring-opacity-5" style="max-width: 85rem;">
	<Form :schema="schema" />
</div>
</template>

<script>
import { defineComponent } from 'vue'
import Form from './components/Form.vue'

export default defineComponent({
	components: { Form },
  	setup() {
    	const schema = {
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
                submit_url: 'https://example.com',
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
            },
            // table_section: {
            //     type: 'section',
            //     label: 'Table',
            //     schema: {
            //         table: {
            //             type: 'table',
            //             headers: [ 'Room', 'Members' ],
            //             row_template: {}, // Allows adding/removing rows
            //             rows: [
            //                 {
            //                     cells: [
            //                         {
            //                             test1: {
            //                                 type: 'text',
            //                                 value: 'test1'
            //                             },
            //                             test2: {
            //                                 type: 'text',
            //                                 value: 'test2'
            //                             }
            //                         },
            //                         {
            //                             test3: {
            //                                 type: 'text',
            //                                 value: 'test3'
            //                             }
            //                         }
            //                     ]
            //                 }
            //             ],
            //         }
            //     }
            // }
        }

      	return { schema }
	}
})
</script>

<style>
body {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	background-color: rgba(249, 250, 251, 1);
}
#app {
	margin: 1em;
}
</style>
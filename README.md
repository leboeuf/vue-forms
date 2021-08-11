# Vue Forms

Turns JSON into pretty forms using Vue 3 and Tailwind CSS.

## Usage

1. Install Tailwind CSS
2. Install and use this library

### Installing Tailwind CSS.

**Option 1: CDN**

```<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">```

**Option 2: npm**

```npm install tailwindcss```

main.js
```
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

createApp(App).mount('#app')
```

index.css
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Add `require('@tailwindcss/forms')` to plugins in `tailwind.config.js`
```
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
```

### Installing and using this library

`npm install @leboeuf/vue-forms`

```
<template>
	<Form :schema="schema" />
</template>

<script>
import { defineComponent } from 'vue'
import Form from '@leboeuf/vue-forms/Form.vue'

export default defineComponent({
	components: { Form },
  	setup() {
    	const schema = {
            product: {
                type: 'heading',
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
        }

      	return { schema }
	}
})
</script>
```

## Supported properties

See each component's `props` to know what's supported. The components are located under `src/lib-components`.

## Implementation notes

Each component currently has an unused prop called `type`. It must be there, otherwise `v-bind` would add the `type` attribute to the component's root element (see [Vue's documentation on attribute inheritance](https://v3.vuejs.org/guide/component-attrs.html#attribute-inheritance)). For example, it would generate

```
<div type="checkbox"></div>
```

and tailwind has a `[type='checkbox']`  rule not specific to input elements. This makes the whole div look like a checkbox, which is undesired.

## Publishing

1. Bump the version number in package.json
2. Run publish.sh

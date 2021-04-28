# Vue Forms

Turns JSON into pretty forms using Vue 3 and Tailwind CSS.

## Implementation notes

Each component currently has an unused prop called `type`. It must be there, otherwise `v-bind` would add the `type` attribute to the component's root element (see [Vue's documentation on attribute inheritance](https://v3.vuejs.org/guide/component-attrs.html#attribute-inheritance)). For example, it would generate

```
<div type="checkbox"></div>
```

and tailwind has a `[type='checkbox']`  rule not specific to input elements. This makes the whole div look like a checkbox, which is undesired.

## Publishing

Install `vue-sfc-rollup` globally: `npm install -g vue-sfc-rollup`

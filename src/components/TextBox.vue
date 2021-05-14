<template>
    <div class="control-group">
        <div>
            <label class="control-label" for="title">{{ label }}</label>
        </div>
        <div>
            <input type="text" :placeholder="placeholder" :value="value" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"/>
        </div>
        <div>
            <small class="form-text text-muted">Some description of the field here</small>
        </div>
        <div>
            <small class="text-danger">Validation message here</small>
        </div>
    </div>
</template>

<script setup>
import { defineProps, reactive } from 'vue'

defineProps({
    type: String,
    label: String,
    placeholder: String,
    value: String,
})

const state = reactive({ count: 0 })
</script>

<style scoped>
.control-label {
    font-weight: 600; /* TODO: extract Label to its own component */
}

.text-muted {
    color: #6c757d!important;
}

.text-danger {
    color: #dc3545!important;
}

.small, small {
    font-size: 80%;
    font-weight: 400;
}
</style>
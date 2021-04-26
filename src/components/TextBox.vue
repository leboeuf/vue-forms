<template>
    <div class="control-group">
        <div>
            <label class="control-label" for="title">{{ label }}</label>
        </div>
        <div>
            <input type="text" :placeholder="placeholder" :value="value"/>
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
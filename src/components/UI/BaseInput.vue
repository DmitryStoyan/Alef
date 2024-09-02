<script setup>
import { ref, watch, watchEffect } from 'vue';

const props = defineProps({
  modelValue: String,
  placeholder: String,
  label: String,
  id: String,
  type: {
    type: String,
    default: 'text'
  }
})

const emit = defineEmits(['update:modelValue'])
const inputValue = ref(props.modelValue)

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue)
})

watchEffect(() => {
  inputValue.value = props.modelValue;
});
</script>

<template>
  <div class="input-wrapper">
    <input :id="id" :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder" class="input" required>
    <label :for="id" class="label">{{ label }}</label>
  </div>
</template>

<style scoped>
.input-wrapper {
  position: relative;
  width: 100%;
}

.input {
  border: 1px solid #F1F1F1;
  border-radius: 4px;
  padding: 30px 16px 12px 16px;
  font-size: var(--font-size-medium);
  width: 100%;
  box-sizing: border-box;
}

.label {
  position: absolute;
  font-size: 20px;
  left: 16px;
  top: 15px;
  -webkit-transition: .2s;
  transition: .2s;
}


.input:valid+.label,
.input:focus+.label {
  top: 8px;
  font-size: var(--font-size-small);
  color: var(--secondary-text-color);
}
</style>

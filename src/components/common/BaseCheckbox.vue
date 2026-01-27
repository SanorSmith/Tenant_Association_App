<template>
  <div class="base-checkbox">
    <label class="flex items-center cursor-pointer">
      <input
        :id="checkboxId"
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        :class="checkboxClasses"
        @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      />
      <span v-if="label" class="ml-2 text-sm text-text-primary">{{ label }}</span>
    </label>
    <p v-if="error" class="mt-1 text-sm text-error ml-6">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue?: boolean;
  label?: string;
  disabled?: boolean;
  error?: string;
  checkboxId?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
  checkboxId: `checkbox-${Math.random().toString(36).substr(2, 9)}`,
});

defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const checkboxClasses = computed(() => {
  const base = 'w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed';
  return base;
});
</script>

<template>
  <div :class="cardClasses">
    <div v-if="$slots.header || title" class="card-header px-6 py-4 border-b border-border">
      <slot name="header">
        <h3 class="text-lg font-semibold text-text-primary">{{ title }}</h3>
      </slot>
    </div>
    <div class="card-body p-6">
      <slot />
    </div>
    <div v-if="$slots.footer" class="card-footer px-6 py-4 border-t border-border bg-background-secondary">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  title?: string;
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: true,
});

const cardClasses = computed(() => {
  const base = 'bg-surface rounded-xl overflow-hidden transition-all duration-300';
  const variants = {
    default: 'border border-border shadow-sm hover:shadow-md',
    outlined: 'border-2 border-border hover:border-primary',
    elevated: 'shadow-lg hover:shadow-xl hover:-translate-y-1',
  };
  return `${base} ${variants[props.variant]}`;
});
</script>

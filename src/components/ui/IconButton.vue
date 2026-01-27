<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled"
    :aria-label="ariaLabel"
    @click="$emit('click', $event)"
  >
    <component :is="icon" :class="iconSize" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  icon: any;
  variant?: 'default' | 'primary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  type: 'button',
  disabled: false,
});

defineEmits<{
  click: [event: MouseEvent];
}>();

const buttonClasses = computed(() => {
  const base = 'inline-flex items-center justify-center rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    default: 'text-text-secondary hover:text-text-primary hover:bg-background-secondary focus:ring-primary',
    primary: 'text-primary hover:bg-primary/10 focus:ring-primary',
    ghost: 'text-text-secondary hover:bg-background-secondary focus:ring-primary',
    danger: 'text-error hover:bg-error/10 focus:ring-error',
  };
  
  const sizes = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3',
  };
  
  return `${base} ${variants[props.variant]} ${sizes[props.size]}`;
});

const iconSize = computed(() => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };
  return sizes[props.size];
});
</script>

<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <LoadingSpinner v-if="loading" class="mr-2" size="sm" />
    <component v-if="icon && !loading" :is="icon" class="w-5 h-5 mr-2" />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import LoadingSpinner from './LoadingSpinner.vue';

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  icon?: any;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'outline',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
});

defineEmits<{
  click: [event: MouseEvent];
}>();

const buttonClasses = computed(() => {
  const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:transform hover:-translate-y-0.5';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark hover:text-white focus:ring-primary font-semibold',
    secondary: 'bg-secondary text-text-primary hover:bg-secondary/90 focus:ring-secondary',
    outline: 'bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white focus:ring-primary font-medium',
    ghost: 'text-primary hover:bg-primary/10 focus:ring-primary',
    danger: 'bg-error text-white hover:bg-error-light focus:ring-error',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  return `${base} ${variants[props.variant]} ${sizes[props.size]}`;
});
</script>

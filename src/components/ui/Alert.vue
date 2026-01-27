<template>
  <div :class="alertClasses" role="alert">
    <div class="flex items-start">
      <component v-if="icon" :is="icon" class="w-5 h-5 mr-3 flex-shrink-0" />
      <div class="flex-1">
        <h4 v-if="title" class="font-semibold mb-1">{{ title }}</h4>
        <div class="text-sm">
          <slot />
        </div>
      </div>
      <button
        v-if="dismissible"
        class="ml-3 flex-shrink-0 text-current opacity-70 hover:opacity-100"
        @click="$emit('dismiss')"
        aria-label="Stäng"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  icon?: any;
  dismissible?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'info',
  dismissible: false,
});

defineEmits<{
  dismiss: [];
}>();

const alertClasses = computed(() => {
  const base = 'p-4 rounded-lg border';
  
  const variants = {
    info: 'bg-info/10 border-info/20 text-info-light',
    success: 'bg-success/10 border-success/20 text-success-light',
    warning: 'bg-warning/10 border-warning/20 text-warning-light',
    error: 'bg-error/10 border-error/20 text-error-light',
  };
  
  return `${base} ${variants[props.variant]}`;
});
</script>

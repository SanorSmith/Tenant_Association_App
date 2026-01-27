<template>
  <div class="main-layout">
    <AppHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />
    <AppSidebar :is-open="sidebarOpen" @close="sidebarOpen = false" />
    
    <main class="main-content">
      <div class="content-container">
        <slot />
      </div>
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppHeader from './AppHeader.vue';
import AppSidebar from './AppSidebar.vue';
import AppFooter from './AppFooter.vue';

const sidebarOpen = ref(false);
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  margin-top: 4rem;
  padding-left: 0;
  transition: padding-left var(--transition-base);
}

@media (min-width: 768px) {
  .main-content {
    padding-left: 280px;
  }
}

.content-container {
  max-width: 1920px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

/* Ensure footer is always visible and not hidden behind sidebar */
.main-layout :deep(.app-footer) {
  margin-left: 0;
  transition: margin-left var(--transition-base);
  position: relative;
  z-index: 1;
}

@media (min-width: 768px) {
  .main-layout :deep(.app-footer) {
    margin-left: 280px;
  }
}
</style>

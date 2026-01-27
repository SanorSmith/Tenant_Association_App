<template>
  <div class="not-found">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <h1 class="error-title">Sidan hittades inte</h1>
      <p class="error-description">
        Den sida du söker finns inte eller har flyttats.
      </p>
      <div class="error-actions">
        <BaseButton variant="primary" @click="$router.push('/dashboard')">
          <Home class="w-4 h-4" />
          Tillbaka till översikten
        </BaseButton>
        <BaseButton variant="outline" @click="$router.go(-1)">
          <ArrowLeft class="w-4 h-4" />
          Gå tillbaka
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Home, ArrowLeft } from 'lucide-vue-next';
import BaseButton from '../components/common/BaseButton.vue';
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-background);
  padding: 2rem;
}

.not-found-content {
  text-align: center;
  max-width: 600px;
}

.error-code {
  font-size: 8rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  line-height: 1;
  margin-bottom: 1rem;
}

.error-title {
  font-size: 2rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 1rem 0;
}

.error-description {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  margin: 0 0 2rem 0;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .error-code {
    font-size: 6rem;
  }

  .error-title {
    font-size: 1.5rem;
  }

  .error-description {
    font-size: 1rem;
  }

  .error-actions {
    flex-direction: column;
  }
}
</style>

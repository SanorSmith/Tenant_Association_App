<template>
  <div class="public-premises-card">
    <div class="card-image">
      <ImageIcon class="w-12 h-12 text-text-tertiary" />
    </div>

    <div class="card-content">
      <div class="card-header">
        <h3 class="card-title">{{ premises.name }}</h3>
        <Badge variant="primary">{{ premises.spaceType }}</Badge>
      </div>

      <div class="card-details">
        <div class="detail-item">
          <MapPin class="w-4 h-4" />
          <span>{{ premises.address }}</span>
        </div>
        <div class="detail-item">
          <Users class="w-4 h-4" />
          <span>Max {{ premises.capacity }} personer</span>
        </div>
      </div>

      <div class="card-description">
        <p class="description-label">Avsedd användning:</p>
        <p class="description-text">{{ premises.intendedUse }}</p>
      </div>

      <div class="card-rules">
        <p class="rules-label">Regler:</p>
        <p class="rules-text">{{ premises.rules }}</p>
      </div>

      <BaseButton
        variant="primary"
        class="book-button"
        @click="$emit('book', premises)"
      >
        <Calendar class="w-4 h-4" />
        Boka lokal
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MapPin, Users, Calendar, Image as ImageIcon } from 'lucide-vue-next';
import Badge from '../ui/Badge.vue';
import BaseButton from '../common/BaseButton.vue';
import type { Premises } from '../../types';

interface Props {
  premises: Premises;
}

defineProps<Props>();

defineEmits<{
  'book': [premises: Premises];
}>();
</script>

<style scoped>
.public-premises-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
  display: flex;
  flex-direction: column;
}

.public-premises-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.card-image {
  height: 200px;
  background: var(--color-background-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--color-border);
}

.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.card-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

.card-description,
.card-rules {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.description-label,
.rules-label {
  font-size: 0.875rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
}

.description-text,
.rules-text {
  color: var(--color-text-primary);
  line-height: 1.6;
}

.book-button {
  margin-top: auto;
  width: 100%;
}
</style>

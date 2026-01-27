<template>
  <BaseCard class="premises-card">
    <div class="premises-header">
      <div class="premises-info">
        <h3 class="premises-title">{{ premises.name }}</h3>
        <div class="premises-meta">
          <div class="meta-item">
            <MapPin class="w-4 h-4" />
            <span>{{ premises.address }}</span>
          </div>
          <div class="meta-item">
            <Users class="w-4 h-4" />
            <span>Max {{ premises.capacity }} personer</span>
          </div>
        </div>
      </div>
      <div class="badges">
        <Badge variant="primary">{{ premises.spaceType }}</Badge>
        <Badge :variant="premises.isPublic ? 'success' : 'default'">
          {{ premises.isPublic ? 'Publik' : 'Privat' }}
        </Badge>
      </div>
    </div>

    <div class="premises-details">
      <div class="detail-section">
        <p class="detail-label">Avsedd användning:</p>
        <p class="detail-text">{{ premises.intendedUse }}</p>
      </div>
      <div class="detail-section">
        <p class="detail-label">Regler:</p>
        <p class="detail-text">{{ premises.rules }}</p>
      </div>
    </div>

    <div class="premises-actions">
      <BaseButton
        variant="outline"
        size="sm"
        @click="$emit('view', premises.id)"
      >
        Visa detaljer
      </BaseButton>
      <BaseButton
        v-if="canEdit"
        variant="outline"
        size="sm"
        @click="$emit('toggle-public', premises.id)"
      >
        <Globe class="w-4 h-4" />
        {{ premises.isPublic ? 'Gör privat' : 'Gör publik' }}
      </BaseButton>
      <IconButton
        v-if="canEdit"
        :icon="Edit"
        variant="default"
        size="sm"
        aria-label="Redigera"
        @click="$emit('edit', premises)"
      />
      <IconButton
        v-if="canDelete"
        :icon="Trash2"
        variant="danger"
        size="sm"
        aria-label="Ta bort"
        @click="$emit('delete', premises.id)"
      />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { MapPin, Users, Globe, Edit, Trash2 } from 'lucide-vue-next';
import BaseCard from '../common/BaseCard.vue';
import BaseButton from '../common/BaseButton.vue';
import Badge from '../ui/Badge.vue';
import IconButton from '../ui/IconButton.vue';
import { useMockDataStore } from '../../stores/mockData';
import type { Premises } from '../../types';

interface Props {
  premises: Premises;
}

defineProps<Props>();

defineEmits<{
  'view': [premisesId: string];
  'edit': [premises: Premises];
  'delete': [premisesId: string];
  'toggle-public': [premisesId: string];
}>();

const mockDataStore = useMockDataStore();
const { currentUser } = storeToRefs(mockDataStore);

const canEdit = computed(() => currentUser.value.role === 'administrator');
const canDelete = computed(() => currentUser.value.role === 'administrator');
</script>

<style scoped>
.premises-card {
  transition: all var(--transition-fast);
}

.premises-card:hover {
  box-shadow: var(--shadow-md);
}

.premises-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.premises-info {
  flex: 1;
}

.premises-title {
  font-size: 1.25rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 0.5rem 0;
}

.premises-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

.badges {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
}

.premises-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: var(--color-background-secondary);
  border-radius: var(--radius-md);
}

.detail-section {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-size: 0.875rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
}

.detail-text {
  color: var(--color-text-primary);
  line-height: 1.6;
}

.premises-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
</style>

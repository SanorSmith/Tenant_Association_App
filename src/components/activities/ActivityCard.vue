<template>
  <BaseCard class="activity-card">
    <div class="activity-header">
      <div class="activity-info">
        <h3 class="activity-title">{{ activity.title }}</h3>
        <div class="activity-meta">
          <div class="meta-item">
            <Calendar class="w-4 h-4" />
            <span>{{ formatDate(activity.activityDate) }}</span>
          </div>
          <div v-if="activity.location" class="meta-item">
            <MapPin class="w-4 h-4" />
            <span>{{ activity.location }}</span>
          </div>
        </div>
      </div>
      <Badge :variant="getStatusVariant(activity.status)">
        {{ getStatusLabel(activity.status) }}
      </Badge>
    </div>

    <p class="activity-description">{{ activity.description }}</p>

    <div class="activity-actions">
      <BaseButton
        variant="outline"
        size="sm"
        @click="$emit('view', activity.id)"
      >
        Visa detaljer
      </BaseButton>
      <BaseButton
        v-if="activity.status === 'planned' && canEdit"
        variant="primary"
        size="sm"
        @click="$emit('mark-complete', activity.id)"
      >
        <Check class="w-4 h-4" />
        Markera som genomförd
      </BaseButton>
      <IconButton
        v-if="canEdit"
        :icon="Edit"
        variant="default"
        size="sm"
        aria-label="Redigera"
        @click="$emit('edit', activity)"
      />
      <IconButton
        v-if="canDelete"
        :icon="Trash2"
        variant="danger"
        size="sm"
        aria-label="Ta bort"
        @click="$emit('delete', activity.id)"
      />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { Calendar, MapPin, Check, Edit, Trash2 } from 'lucide-vue-next';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import BaseCard from '../common/BaseCard.vue';
import BaseButton from '../common/BaseButton.vue';
import Badge from '../ui/Badge.vue';
import IconButton from '../ui/IconButton.vue';
import { useMockDataStore } from '../../stores/mockData';
import type { Activity } from '../../types';

interface Props {
  activity: Activity;
}

defineProps<Props>();

defineEmits<{
  'view': [activityId: string];
  'edit': [activity: Activity];
  'delete': [activityId: string];
  'mark-complete': [activityId: string];
}>();

const mockDataStore = useMockDataStore();
const { currentUser } = storeToRefs(mockDataStore);

const canEdit = computed(() => currentUser.value.role === 'administrator');
const canDelete = computed(() => currentUser.value.role === 'administrator');

const formatDate = (date: Date) => {
  return format(new Date(date), 'PPP \'kl.\' HH:mm', { locale: sv });
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    planned: 'Planerad',
    ongoing: 'Pågående',
    completed: 'Genomförd',
    cancelled: 'Inställd',
  };
  return labels[status] || status;
};

const getStatusVariant = (status: string) => {
  const variants: Record<string, 'default' | 'primary' | 'success' | 'error'> = {
    planned: 'primary',
    ongoing: 'default',
    completed: 'success',
    cancelled: 'error',
  };
  return variants[status] || 'default';
};
</script>

<style scoped>
.activity-card {
  transition: all var(--transition-fast);
}

.activity-card:hover {
  box-shadow: var(--shadow-md);
}

.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.activity-info {
  flex: 1;
}

.activity-title {
  font-size: 1.25rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 0.5rem 0;
}

.activity-meta {
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

.activity-description {
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.activity-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
</style>

<template>
  <BaseCard class="meeting-card">
    <div class="meeting-header">
      <div class="meeting-info">
        <h3 class="meeting-title">{{ meeting.title }}</h3>
        <div class="meeting-meta">
          <div class="meta-item">
            <Calendar class="w-4 h-4" />
            <span>{{ formatDate(meeting.date) }}</span>
          </div>
          <div class="meta-item">
            <MapPin class="w-4 h-4" />
            <span>{{ meeting.location }}</span>
          </div>
          <div class="meta-item">
            <Users class="w-4 h-4" />
            <span>{{ meeting.attendees.length }} deltagare</span>
          </div>
        </div>
      </div>
      <Badge :variant="getStatusVariant(meeting.status)">
        {{ getStatusLabel(meeting.status) }}
      </Badge>
    </div>

    <div class="meeting-type">
      <Badge :variant="getTypeVariant(meeting.type)">
        {{ getTypeLabel(meeting.type) }}
      </Badge>
    </div>

    <p v-if="meeting.description" class="meeting-description">
      {{ meeting.description }}
    </p>

    <div class="meeting-actions">
      <BaseButton
        v-if="meeting.status === 'scheduled' && canCreateAgenda"
        variant="outline"
        size="sm"
        @click="$emit('create-agenda', meeting.id)"
      >
        <FileText class="w-4 h-4" />
        Skapa dagordning
      </BaseButton>
      <BaseButton
        variant="primary"
        size="sm"
        @click="$emit('view-details', meeting.id)"
      >
        Visa detaljer
      </BaseButton>
      <IconButton
        v-if="canEdit"
        :icon="Edit"
        variant="default"
        size="sm"
        aria-label="Redigera möte"
        @click="$emit('edit', meeting.id)"
      />
      <IconButton
        v-if="canDelete"
        :icon="Trash2"
        variant="danger"
        size="sm"
        aria-label="Ta bort möte"
        @click="handleDelete"
      />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { Calendar, MapPin, Users, FileText, Edit, Trash2 } from 'lucide-vue-next';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import BaseCard from '../common/BaseCard.vue';
import BaseButton from '../common/BaseButton.vue';
import Badge from '../ui/Badge.vue';
import IconButton from '../ui/IconButton.vue';
import { useMockDataStore } from '../../stores/mockData';
import type { Meeting } from '../../types';

interface Props {
  meeting: Meeting;
}

const props = defineProps<Props>();

defineEmits<{
  'view-details': [meetingId: string];
  'create-agenda': [meetingId: string];
  'edit': [meetingId: string];
  'delete': [meetingId: string];
}>();

const mockDataStore = useMockDataStore();
const { currentUser } = storeToRefs(mockDataStore);

const canEdit = computed(() => currentUser.value.role === 'administrator');
const canDelete = computed(() => currentUser.value.role === 'administrator');
const canCreateAgenda = computed(() => 
  currentUser.value.role === 'administrator' || currentUser.value.role === 'secretary'
);

const formatDate = (date: Date) => {
  return format(new Date(date), 'PPP \'kl.\' HH:mm', { locale: sv });
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    scheduled: 'Planerat',
    completed: 'Genomfört',
    cancelled: 'Inställt',
  };
  return labels[status] || status;
};

const getStatusVariant = (status: string) => {
  const variants: Record<string, 'default' | 'success' | 'error' | 'warning'> = {
    scheduled: 'default',
    completed: 'success',
    cancelled: 'error',
  };
  return variants[status] || 'default';
};

const getTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    board_meeting: 'Styrelsemöte',
    annual_meeting: 'Årsmöte',
    extraordinary_meeting: 'Extra möte',
  };
  return labels[type] || type;
};

const getTypeVariant = (type: string) => {
  const variants: Record<string, 'primary' | 'success' | 'warning'> = {
    board_meeting: 'primary',
    annual_meeting: 'success',
    extraordinary_meeting: 'warning',
  };
  return variants[type] || 'primary';
};

const handleDelete = () => {
  if (confirm('Är du säker på att du vill ta bort detta möte?')) {
    mockDataStore.removeMeeting(props.meeting.id);
  }
};
</script>

<style scoped>
.meeting-card {
  transition: all var(--transition-fast);
}

.meeting-card:hover {
  box-shadow: var(--shadow-md);
}

.meeting-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.meeting-info {
  flex: 1;
}

.meeting-title {
  font-size: 1.25rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 0.5rem 0;
}

.meeting-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

.meeting-type {
  margin-bottom: 1rem;
}

.meeting-description {
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.meeting-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .meeting-header {
    flex-direction: column;
  }

  .meeting-meta {
    flex-direction: column;
    gap: 0.5rem;
  }

  .meeting-actions {
    flex-direction: column;
  }
}
</style>

<template>
  <BaseCard class="document-card">
    <div class="document-icon">
      <FileText class="w-8 h-8 text-primary" />
    </div>
    
    <div class="document-info">
      <h3 class="document-title">{{ document.title }}</h3>
      <div class="document-meta">
        <Badge :variant="getTypeVariant(document.documentType)">
          {{ getTypeLabel(document.documentType) }}
        </Badge>
        <Badge :variant="getStatusVariant(document.status)">
          {{ getStatusLabel(document.status) }}
        </Badge>
      </div>
      <p class="document-version">Version {{ document.version }}</p>
    </div>

    <div class="document-actions">
      <BaseButton
        v-if="document.status === 'draft'"
        variant="primary"
        size="sm"
        @click="$emit('edit', document.id)"
      >
        Fortsätt redigera
      </BaseButton>
      <BaseButton
        v-else
        variant="outline"
        size="sm"
        @click="$emit('view', document.id)"
      >
        Visa
      </BaseButton>
      <BaseButton
        variant="outline"
        size="sm"
        @click="$emit('download', document.id)"
      >
        <Download class="w-4 h-4" />
        Ladda ner PDF
      </BaseButton>
      <IconButton
        v-if="canDelete"
        :icon="Trash2"
        variant="danger"
        size="sm"
        aria-label="Ta bort"
        @click="$emit('delete', document.id)"
      />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { FileText, Download, Trash2 } from 'lucide-vue-next';
import BaseCard from '../common/BaseCard.vue';
import BaseButton from '../common/BaseButton.vue';
import Badge from '../ui/Badge.vue';
import IconButton from '../ui/IconButton.vue';
import { useMockDataStore } from '../../stores/mockData';
import type { Document } from '../../types';

interface Props {
  document: Document;
}

defineProps<Props>();

defineEmits<{
  'view': [documentId: string];
  'edit': [documentId: string];
  'delete': [documentId: string];
  'download': [documentId: string];
}>();

const mockDataStore = useMockDataStore();
const { currentUser } = storeToRefs(mockDataStore);

const canDelete = computed(() => currentUser.value.role === 'administrator');

const getTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    agenda: 'Dagordning',
    minutes: 'Protokoll',
    annual_minutes: 'Årsmötesprotokoll',
    annual_report: 'Årsrapport',
  };
  return labels[type] || type;
};

const getTypeVariant = (type: string) => {
  const variants: Record<string, 'primary' | 'success' | 'warning' | 'info'> = {
    agenda: 'primary',
    minutes: 'success',
    annual_minutes: 'warning',
    annual_report: 'info',
  };
  return variants[type] || 'primary';
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    draft: 'Utkast',
    finalized: 'Slutförd',
    archived: 'Arkiverad',
  };
  return labels[status] || status;
};

const getStatusVariant = (status: string) => {
  const variants: Record<string, 'default' | 'success' | 'warning'> = {
    draft: 'warning',
    finalized: 'success',
    archived: 'default',
  };
  return variants[status] || 'default';
};
</script>

<style scoped>
.document-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all var(--transition-fast);
}

.document-card:hover {
  box-shadow: var(--shadow-md);
}

.document-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background: var(--color-primary-light);
  border-radius: var(--radius-md);
}

.document-info {
  flex: 1;
}

.document-title {
  font-size: 1.125rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 0.5rem 0;
}

.document-meta {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}

.document-version {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.document-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
</style>

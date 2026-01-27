<template>
  <MainLayout>
    <div class="document-preview-view">
      <div class="preview-header">
        <BaseButton variant="outline" @click="$router.back()">
          <ArrowLeft class="w-4 h-4" />
          Tillbaka
        </BaseButton>
        <div class="header-actions">
          <BaseButton variant="outline" @click="downloadPDF">
            <Download class="w-4 h-4" />
            Ladda ner PDF
          </BaseButton>
          <BaseButton
            v-if="document && document.status === 'draft'"
            variant="primary"
            @click="editDocument"
          >
            <Edit class="w-4 h-4" />
            Redigera
          </BaseButton>
        </div>
      </div>

      <div v-if="document" class="document-content">
        <BaseCard class="document-preview">
          <div class="document-header">
            <h1>{{ document.title }}</h1>
            <div class="document-meta">
              <Badge :variant="getTypeVariant(document.documentType)">
                {{ getTypeLabel(document.documentType) }}
              </Badge>
              <Badge :variant="getStatusVariant(document.status)">
                {{ getStatusLabel(document.status) }}
              </Badge>
            </div>
          </div>

          <div class="document-body">
            <div class="preview-notice">
              <Info class="w-5 h-5" />
              <p>Detta är en förhandsvisning av dokumentet. Använd "Ladda ner PDF" för att få den slutgiltiga versionen.</p>
            </div>

            <div class="document-sections">
              <div v-for="(value, key) in document.content" :key="key" class="section">
                <h3>{{ getSectionTitle(key) }}</h3>
                <div v-if="Array.isArray(value)" class="section-content">
                  <ul v-if="value.length > 0">
                    <li v-for="(item, index) in value" :key="index">
                      {{ typeof item === 'string' ? item : getMemberName(item) }}
                    </li>
                  </ul>
                  <p v-else class="empty-content">Ingen information</p>
                </div>
                <div v-else class="section-content">
                  <p>{{ value || 'Ingen information' }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="document-footer">
            <p class="version-info">Version {{ document.version }}</p>
            <p v-if="document.finalizedAt" class="finalized-info">
              Slutförd: {{ formatDate(document.finalizedAt) }}
            </p>
          </div>
        </BaseCard>
      </div>

      <div v-else class="loading-state">
        <p>Laddar dokument...</p>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { ArrowLeft, Download, Edit, Info } from 'lucide-vue-next';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import MainLayout from '../../components/layout/MainLayout.vue';
import BaseCard from '../../components/common/BaseCard.vue';
import BaseButton from '../../components/common/BaseButton.vue';
import Badge from '../../components/ui/Badge.vue';
import { useMockDataStore } from '../../stores/mockData';
import { mockDownloadDocument } from '../../services/mockPdf.service';
import type { Document } from '../../types';

const route = useRoute();
const router = useRouter();
const mockDataStore = useMockDataStore();
const { documents, boardMembers } = storeToRefs(mockDataStore);

const document = ref<Document | null>(null);

onMounted(() => {
  const docId = route.params.id as string;
  document.value = documents.value.find(d => d.id === docId) || null;
});

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

const getSectionTitle = (key: string) => {
  // Extract section title from key
  return key.replace('section-', '§').replace(/-/g, ' ');
};

const getMemberName = (memberId: string) => {
  const member = boardMembers.value.find(m => m.id === memberId);
  return member ? member.fullName : memberId;
};

const formatDate = (date: Date) => {
  return format(new Date(date), 'PPP', { locale: sv });
};

const downloadPDF = async () => {
  if (document.value) {
    await mockDownloadDocument(document.value);
  }
};

const editDocument = () => {
  router.push(`/documents/${document.value!.id}/edit`);
};
</script>

<style scoped>
.document-preview-view {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

.document-preview {
  background: white;
}

.document-header {
  padding-bottom: 1.5rem;
  border-bottom: 2px solid var(--color-border);
  margin-bottom: 2rem;
}

.document-header h1 {
  margin: 0 0 1rem 0;
  font-size: 2rem;
}

.document-meta {
  display: flex;
  gap: 0.5rem;
}

.preview-notice {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--color-info-light);
  border-radius: var(--radius-md);
  margin-bottom: 2rem;
  color: var(--color-info);
}

.preview-notice p {
  margin: 0;
}

.document-sections {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.section h3 {
  margin: 0 0 1rem 0;
  color: var(--color-primary);
}

.section-content {
  padding-left: 1rem;
}

.section-content ul {
  margin: 0;
  padding-left: 1.5rem;
}

.section-content li {
  margin-bottom: 0.5rem;
}

.section-content p {
  margin: 0;
  line-height: 1.6;
}

.empty-content {
  color: var(--color-text-secondary);
  font-style: italic;
}

.document-footer {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

.loading-state {
  display: flex;
  justify-content: center;
  padding: 4rem;
}

@media (max-width: 768px) {
  .preview-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .document-footer {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>

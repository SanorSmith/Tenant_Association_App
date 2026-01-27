<template>
  <MainLayout>
    <div class="documents-view">
      <div class="documents-header">
        <h1 class="text-3xl font-bold text-text-primary">Dokument</h1>
        <BaseButton variant="primary" @click="handleCreateDocument">
          <FileText class="w-4 h-4" />
          Skapa dokument
        </BaseButton>
      </div>

      <div class="tabs">
        <!-- Mobile Dropdown -->
        <div class="mobile-tabs-dropdown md:hidden">
          <select 
            v-model="activeTab" 
            class="tab-select"
            @change="handleTabChange"
          >
            <option 
              v-for="tab in tabs" 
              :key="tab.id" 
              :value="tab.id"
            >
              {{ tab.label }}
            </option>
          </select>
        </div>

        <!-- Desktop Tabs -->
        <div class="desktop-tabs hidden md:flex">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            :class="['tab', { active: activeTab === tab.id }]"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <DocumentFilters
        v-model:search="searchQuery"
        v-model:status="statusFilter"
        v-model:type="typeFilter"
        @clear="clearFilters"
      />

      <div class="documents-grid">
        <div v-if="filteredDocuments.length === 0" class="empty-state">
          <FileText class="w-12 h-12 text-text-tertiary" />
          <p class="text-text-secondary">Inga dokument hittades</p>
        </div>
        <DocumentCard
          v-for="doc in filteredDocuments"
          :key="doc.id"
          :document="doc"
          @view="viewDocument"
          @edit="editDocument"
          @delete="deleteDocument"
          @download="downloadDocument"
        />
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { FileText } from 'lucide-vue-next';
import MainLayout from '../../components/layout/MainLayout.vue';
import BaseButton from '../../components/common/BaseButton.vue';
import DocumentFilters from '../../components/documents/DocumentFilters.vue';
import DocumentCard from '../../components/documents/DocumentCard.vue';
import { useMockDataStore } from '../../stores/mockData';

const router = useRouter();
const mockDataStore = useMockDataStore();
const { documents } = storeToRefs(mockDataStore);

const activeTab = ref('all');
const searchQuery = ref('');
const statusFilter = ref('');
const typeFilter = ref('');

const tabs = [
  { id: 'all', label: 'Alla dokument' },
  { id: 'agenda', label: 'Dagordningar' },
  { id: 'minutes', label: 'Protokoll' },
  { id: 'annual_report', label: 'Årsrapporter' },
];

const filteredDocuments = computed(() => {
  let filtered = documents.value;

  if (activeTab.value !== 'all') {
    filtered = filtered.filter(doc => doc.documentType === activeTab.value);
  }

  if (searchQuery.value) {
    filtered = filtered.filter(doc =>
      doc.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (statusFilter.value) {
    filtered = filtered.filter(doc => doc.status === statusFilter.value);
  }

  if (typeFilter.value) {
    filtered = filtered.filter(doc => doc.documentType === typeFilter.value);
  }

  return filtered;
});

const handleCreateDocument = () => {
  router.push('/documents/create');
};

const viewDocument = (documentId: string) => {
  router.push(`/documents/${documentId}`);
};

const editDocument = (documentId: string) => {
  router.push(`/documents/${documentId}/edit`);
};

const deleteDocument = (documentId: string) => {
  if (confirm('Är du säker på att du vill ta bort detta dokument?')) {
    const index = documents.value.findIndex(d => d.id === documentId);
    if (index > -1) {
      documents.value.splice(index, 1);
    }
  }
};

const downloadDocument = async (documentId: string) => {
  const doc = documents.value.find(d => d.id === documentId);
  if (doc) {
    const { mockDownloadDocument } = await import('../../services/mockPdf.service');
    await mockDownloadDocument(doc);
  }
};

const clearFilters = () => {
  searchQuery.value = '';
  statusFilter.value = '';
  typeFilter.value = '';
};

const handleTabChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  activeTab.value = target.value;
};
</script>

<style scoped>
.documents-view {
  width: 100%;
}

.documents-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  border-bottom: 2px solid var(--color-border);
  margin-bottom: 2rem;
}

.tab {
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
  margin-bottom: -2px;
}

.tab:hover {
  color: var(--color-text-primary);
  background: var(--color-background-secondary);
}

.tab.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

.documents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.empty-state {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  gap: 1rem;
}

/* Mobile Dropdown Styles */
.mobile-tabs-dropdown {
  width: 100%;
}

.tab-select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  background: white;
  color: var(--color-text-primary);
  font-size: 1rem;
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.tab-select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(0, 95, 115, 0.1);
}

.tab-select option {
  padding: 0.5rem;
  background: white;
  color: var(--color-text-primary);
}

/* Desktop Tabs Styles */
.desktop-tabs {
  width: 100%;
}

@media (max-width: 768px) {
  .documents-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .tabs {
    flex-direction: column;
    border-bottom: none;
    margin-bottom: 1rem;
  }

  .tab {
    display: none; /* Hide desktop tabs on mobile */
  }

  .documents-grid {
    grid-template-columns: 1fr;
  }
}
</style>

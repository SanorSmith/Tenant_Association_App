<template>
  <MainLayout>
    <div class="create-document-view">
      <div class="wizard-header">
        <h1 class="text-2xl font-bold">{{ isEditing ? 'Redigera dokument' : 'Skapa nytt dokument' }}</h1>
        <BaseButton variant="outline" @click="$router.back()">
          Avbryt
        </BaseButton>
      </div>

      <div v-if="!selectedType" class="document-type-selection">
        <h2>Välj dokumenttyp</h2>
        <div class="type-cards">
          <div
            v-for="type in documentTypes"
            :key="type.value"
            class="type-card"
            @click="selectDocumentType(type.value)"
          >
            <FileText class="w-8 h-8" />
            <h3>{{ type.label }}</h3>
            <p>{{ type.description }}</p>
          </div>
        </div>
      </div>

      <div v-else class="document-wizard">
        <div class="wizard-progress">
          <div
            v-for="(section, index) in template.sections"
            :key="section.id"
            :class="['progress-step', {
              'active': index === currentStep,
              'completed': index < currentStep
            }]"
          >
            <span class="step-number">{{ index + 1 }}</span>
            <span class="step-title">{{ section.title }}</span>
          </div>
        </div>

        <div class="wizard-content">
          <BaseCard>
            <h2>{{ currentSection.title }}</h2>
            <p v-if="currentSection.required" class="required-indicator">* Obligatoriskt</p>

            <div class="section-content">
              <textarea
                v-if="currentSection.type === 'text'"
                v-model="sectionData[currentSection.id]"
                :placeholder="currentSection.placeholder"
                class="section-textarea"
                rows="6"
              ></textarea>

              <div v-else-if="currentSection.type === 'attendance'" class="attendance-section">
                <p class="section-description">Välj närvarande medlemmar:</p>
                <div class="members-list">
                  <label
                    v-for="member in boardMembers"
                    :key="member.id"
                    class="member-checkbox"
                  >
                    <input
                      type="checkbox"
                      :value="member.id"
                      :checked="isAttendeeSelected(member.id)"
                      @change="toggleAttendee(member.id)"
                    />
                    <span>{{ member.fullName }}</span>
                  </label>
                </div>
              </div>

              <div v-else-if="currentSection.type === 'list'" class="list-section">
                <div
                  v-for="(item, index) in getListItems()"
                  :key="index"
                  class="list-item"
                >
                  <input
                    v-model="getListItems()[index]"
                    type="text"
                    placeholder="Punkt..."
                    class="list-input"
                  />
                  <BaseButton
                    variant="outline"
                    size="sm"
                    @click="removeListItem(index)"
                  >
                    <Trash2 class="w-4 h-4" />
                  </BaseButton>
                </div>
                <BaseButton variant="outline" @click="addListItem">
                  <Plus class="w-4 h-4" />
                  Lägg till punkt
                </BaseButton>
              </div>

              <div v-else-if="currentSection.type === 'table'" class="table-section">
                <p class="section-description">Tabellredigering (förenklad)</p>
                <textarea
                  v-model="sectionData[currentSection.id]"
                  placeholder="Ange tabelldata..."
                  class="section-textarea"
                  rows="6"
                ></textarea>
              </div>
            </div>
          </BaseCard>
        </div>

        <div class="wizard-navigation">
          <BaseButton
            v-if="currentStep > 0"
            variant="outline"
            @click="previousStep"
          >
            <ChevronLeft class="w-4 h-4" />
            Föregående
          </BaseButton>
          <div class="nav-spacer"></div>
          <BaseButton
            v-if="currentStep < template.sections.length - 1"
            variant="primary"
            :disabled="!isSectionValid"
            @click="nextStep"
          >
            Nästa
            <ChevronRight class="w-4 h-4" />
          </BaseButton>
          <BaseButton
            v-else
            variant="primary"
            :disabled="!isDocumentValid"
            @click="finalizeDocument"
          >
            Slutför dokument
          </BaseButton>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { FileText, ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-vue-next';
import MainLayout from '../../components/layout/MainLayout.vue';
import BaseCard from '../../components/common/BaseCard.vue';
import BaseButton from '../../components/common/BaseButton.vue';
import { useMockDataStore } from '../../stores/mockData';
import type { DocumentTemplate } from '../../stores/mockData';

const route = useRoute();
const router = useRouter();
const mockDataStore = useMockDataStore();
const { boardMembers, documents } = storeToRefs(mockDataStore);

const selectedType = ref<string>('');
const currentStep = ref(0);
const template = ref<DocumentTemplate | null>(null);
const sectionData = ref<Record<string, any>>({});
const isEditing = ref(false);

const documentTypes = [
  { value: 'agenda', label: 'Dagordning', description: 'Skapa en dagordning för ett möte' },
  { value: 'minutes', label: 'Protokoll', description: 'Dokumentera ett genomfört möte' },
  { value: 'annual_report', label: 'Årsrapport', description: 'Sammanställ årets verksamhet' },
];

const currentSection = computed(() => {
  if (!template.value) return null;
  return template.value.sections[currentStep.value];
});

const isSectionValid = computed(() => {
  if (!currentSection.value) return false;
  if (!currentSection.value.required) return true;
  
  const data = sectionData.value[currentSection.value.id];
  if (currentSection.value.type === 'text') {
    return data && data.trim().length > 0;
  }
  if (currentSection.value.type === 'attendance') {
    return data && data.length > 0;
  }
  if (currentSection.value.type === 'list') {
    return data && data.length > 0;
  }
  return true;
});

const isDocumentValid = computed(() => {
  if (!template.value) return false;
  return template.value.sections.every((section, index) => {
    if (!section.required) return true;
    const data = sectionData.value[section.id];
    if (section.type === 'text') return data && data.trim().length > 0;
    if (section.type === 'attendance') return data && data.length > 0;
    if (section.type === 'list') return data && data.length > 0;
    return true;
  });
});

onMounted(() => {
  const typeParam = route.query.type as string;
  if (typeParam) {
    selectDocumentType(typeParam);
  }
  
  const docId = route.params.id as string;
  if (docId) {
    isEditing.value = true;
    // Load existing document data
  }
});

const selectDocumentType = (type: string) => {
  selectedType.value = type;
  template.value = mockDataStore.getDocumentTemplate(type as any);
  
  // Initialize section data
  template.value.sections.forEach(section => {
    if (section.type === 'list') {
      sectionData.value[section.id] = [];
    } else if (section.type === 'attendance') {
      sectionData.value[section.id] = [];
    } else {
      sectionData.value[section.id] = '';
    }
  });
};

const isAttendeeSelected = (memberId: string) => {
  const data = sectionData.value[currentSection.value!.id];
  return data && data.includes(memberId);
};

const toggleAttendee = (memberId: string) => {
  const sectionId = currentSection.value!.id;
  if (!sectionData.value[sectionId]) {
    sectionData.value[sectionId] = [];
  }
  const index = sectionData.value[sectionId].indexOf(memberId);
  if (index > -1) {
    sectionData.value[sectionId].splice(index, 1);
  } else {
    sectionData.value[sectionId].push(memberId);
  }
};

const getListItems = () => {
  const sectionId = currentSection.value!.id;
  if (!sectionData.value[sectionId]) {
    sectionData.value[sectionId] = [];
  }
  return sectionData.value[sectionId];
};

const addListItem = () => {
  const sectionId = currentSection.value!.id;
  if (!sectionData.value[sectionId]) {
    sectionData.value[sectionId] = [];
  }
  sectionData.value[sectionId].push('');
};

const removeListItem = (index: number) => {
  const sectionId = currentSection.value!.id;
  sectionData.value[sectionId].splice(index, 1);
};

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};

const nextStep = () => {
  if (currentStep.value < template.value!.sections.length - 1) {
    currentStep.value++;
  }
};

const finalizeDocument = () => {
  // Create document
  const newDoc = {
    id: `doc-${Date.now()}`,
    associationId: 'assoc-1',
    meetingId: route.query.meetingId as string,
    documentType: selectedType.value as any,
    title: `${documentTypes.find(t => t.value === selectedType.value)?.label} - ${new Date().toLocaleDateString('sv-SE')}`,
    content: sectionData.value,
    version: 1,
    status: 'draft' as const,
  };
  
  documents.value.push(newDoc);
  router.push('/documents');
};
</script>

<style scoped>
.create-document-view {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.wizard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.document-type-selection h2 {
  margin-bottom: 1.5rem;
}

.type-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.type-card {
  padding: 2rem;
  background: white;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: center;
}

.type-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
}

.type-card h3 {
  margin: 1rem 0 0.5rem 0;
}

.type-card p {
  color: var(--color-text-secondary);
  margin: 0;
}

.wizard-progress {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.progress-step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--color-background-secondary);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  white-space: nowrap;
}

.progress-step.active {
  background: var(--color-primary);
  color: white;
}

.progress-step.completed {
  background: var(--color-success-light);
}

.step-number {
  font-weight: var(--font-weight-semibold);
}

.required-indicator {
  color: var(--color-error);
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.section-content {
  margin-top: 1.5rem;
}

.section-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
}

.section-textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}

.section-description {
  margin-bottom: 1rem;
  color: var(--color-text-secondary);
}

.members-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.member-checkbox {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--color-background-secondary);
  border-radius: var(--radius-md);
  cursor: pointer;
}

.member-checkbox input {
  width: 1.25rem;
  height: 1.25rem;
}

.list-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.list-item {
  display: flex;
  gap: 0.5rem;
}

.list-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.wizard-navigation {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
}

.nav-spacer {
  flex: 1;
}

@media (max-width: 768px) {
  .wizard-progress {
    flex-direction: column;
  }

  .progress-step {
    width: 100%;
  }
}
</style>

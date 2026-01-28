<template>
  <MainLayout>
    <div class="premises-view">
      <div class="premises-header">
        <h1 class="text-3xl font-bold text-text-primary">Lokaler</h1>
        <BaseButton variant="outline" @click="showCreateModal = true">
          <Plus class="w-4 h-4" />
          Registrera lokal
        </BaseButton>
      </div>

      <div class="premises-grid">
        <PremisesCard
          v-for="premises in premisesList"
          :key="premises.id"
          :premises="premises"
          @view="viewPremises"
          @edit="editPremises"
          @delete="deletePremises"
          @toggle-public="togglePublic"
        />
        <div v-if="premisesList.length === 0" class="empty-state">
          <Building class="w-12 h-12 text-text-tertiary" />
          <p class="text-text-secondary">Inga lokaler registrerade</p>
        </div>
      </div>
    </div>

    <CreatePremisesModal
      v-model="showCreateModal"
      :premises="editingPremises"
      @premises-saved="handlePremisesSaved"
    />
  </MainLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { Plus, Building } from 'lucide-vue-next';
import MainLayout from '../../components/layout/MainLayout.vue';
import BaseButton from '../../components/common/BaseButton.vue';
import PremisesCard from '../../components/premises/PremisesCard.vue';
import CreatePremisesModal from '../../components/modals/CreatePremisesModal.vue';
import { useMockDataStore } from '../../stores/mockData';
import type { Premises } from '../../types';

const router = useRouter();
const mockDataStore = useMockDataStore();
const { premises: premisesList } = storeToRefs(mockDataStore);

const showCreateModal = ref(false);
const editingPremises = ref<Premises | null>(null);

const viewPremises = (premisesId: string) => {
  router.push(`/premises/${premisesId}`);
};

const editPremises = (premises: Premises) => {
  editingPremises.value = premises;
  showCreateModal.value = true;
};

const deletePremises = (premisesId: string) => {
  if (confirm('Är du säker på att du vill ta bort denna lokal?')) {
    const index = premisesList.value.findIndex(p => p.id === premisesId);
    if (index > -1) {
      premisesList.value.splice(index, 1);
    }
  }
};

const togglePublic = (premisesId: string) => {
  const premises = premisesList.value.find(p => p.id === premisesId);
  if (premises) {
    premises.isPublic = !premises.isPublic;
  }
};

const handlePremisesSaved = () => {
  showCreateModal.value = false;
  editingPremises.value = null;
};
</script>

<style scoped>
.premises-view {
  width: 100%;
}

.premises-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.premises-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
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

@media (max-width: 768px) {
  .premises-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .premises-grid {
    grid-template-columns: 1fr;
  }
}
</style>

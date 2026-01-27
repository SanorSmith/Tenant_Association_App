<template>
  <div class="public-search-view">
    <div class="public-header">
      <div class="container">
        <h1 class="text-4xl font-bold text-text-primary">Boka lokal</h1>
        <p class="text-lg text-text-secondary">Sök och boka tillgängliga lokaler i ditt område</p>
      </div>
    </div>

    <div class="container">
      <div class="search-section">
        <div class="search-filters">
          <BaseInput
            v-model="searchQuery"
            placeholder="Sök efter lokalnamn eller adress..."
            class="search-input"
          >
            <template #prefix>
              <Search class="w-5 h-5 text-text-tertiary" />
            </template>
          </BaseInput>

          <BaseSelect
            v-model="selectedType"
            :options="typeOptions"
            placeholder="Alla typer"
          />

          <BaseSelect
            v-model="selectedCapacity"
            :options="capacityOptions"
            placeholder="Kapacitet"
          />
        </div>

        <div class="results-info">
          <p class="text-text-secondary">
            Visar {{ filteredPremises.length }} av {{ publicPremises.length }} lokaler
          </p>
        </div>
      </div>

      <div class="premises-grid">
        <PublicPremisesCard
          v-for="premises in filteredPremises"
          :key="premises.id"
          :premises="premises"
          @book="handleBook"
        />
        <div v-if="filteredPremises.length === 0" class="empty-state">
          <Building class="w-16 h-16 text-text-tertiary" />
          <p class="text-xl text-text-secondary">Inga lokaler hittades</p>
          <p class="text-text-tertiary">Prova att ändra dina sökfilter</p>
        </div>
      </div>
    </div>

    <PublicBookingModal
      v-model="showBookingModal"
      :premises="selectedPremises"
      @booking-submitted="handleBookingSubmitted"
    />

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { Search, Building } from 'lucide-vue-next';
import BaseInput from '../../components/common/BaseInput.vue';
import BaseSelect from '../../components/common/BaseSelect.vue';
import PublicPremisesCard from '../../components/public/PublicPremisesCard.vue';
import PublicBookingModal from '../../components/modals/PublicBookingModal.vue';
import AppFooter from '../../components/layout/AppFooter.vue';
import { useMockDataStore } from '../../stores/mockData';
import type { Premises } from '../../types';

const mockDataStore = useMockDataStore();
const { premises } = storeToRefs(mockDataStore);

const searchQuery = ref('');
const selectedType = ref('');
const selectedCapacity = ref('');
const showBookingModal = ref(false);
const selectedPremises = ref<Premises | null>(null);

const typeOptions = [
  { value: '', label: 'Alla typer' },
  { value: 'Möteslokal', label: 'Möteslokal' },
  { value: 'Verkstad', label: 'Verkstad' },
  { value: 'Festlokal', label: 'Festlokal' },
  { value: 'Kontor', label: 'Kontor' },
  { value: 'Lager', label: 'Lager' },
  { value: 'Övrigt', label: 'Övrigt' },
];

const capacityOptions = [
  { value: '', label: 'Alla storlekar' },
  { value: '1-5', label: '1-5 personer' },
  { value: '6-10', label: '6-10 personer' },
  { value: '11-20', label: '11-20 personer' },
  { value: '21+', label: '21+ personer' },
];

const publicPremises = computed(() => {
  return premises.value.filter(p => p.isPublic);
});

const filteredPremises = computed(() => {
  let filtered = publicPremises.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.address.toLowerCase().includes(query)
    );
  }

  if (selectedType.value) {
    filtered = filtered.filter(p => p.spaceType === selectedType.value);
  }

  if (selectedCapacity.value) {
    const [min, max] = selectedCapacity.value.split('-').map(v => v.replace('+', ''));
    filtered = filtered.filter(p => {
      if (max) {
        return p.capacity >= parseInt(min) && p.capacity <= parseInt(max);
      } else {
        return p.capacity >= parseInt(min);
      }
    });
  }

  return filtered;
});

const handleBook = (premises: Premises) => {
  selectedPremises.value = premises;
  showBookingModal.value = true;
};

const handleBookingSubmitted = () => {
  showBookingModal.value = false;
  selectedPremises.value = null;
};
</script>

<style scoped>
.public-search-view {
  min-height: 100vh;
  background: var(--color-background);
}

.public-header {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  color: var(--color-text-inverse);
  padding: 4rem 0 3rem;
  margin-bottom: 3rem;
}

.public-header h1 {
  color: var(--color-text-inverse);
  margin-bottom: 0.5rem;
}

.public-header p {
  color: rgba(255, 255, 255, 0.9);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.search-section {
  margin-bottom: 2rem;
}

.search-filters {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.search-input {
  width: 100%;
}

.results-info {
  padding: 0.5rem 0;
}

.premises-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.empty-state {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem;
  gap: 1rem;
}

@media (max-width: 768px) {
  .public-header {
    padding: 3rem 0 2rem;
  }

  .public-header h1 {
    font-size: 2rem;
  }

  .search-filters {
    grid-template-columns: 1fr;
  }

  .premises-grid {
    grid-template-columns: 1fr;
  }
}
</style>
